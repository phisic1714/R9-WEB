# R9 LIFF web app

## Docker + Nginx (CMS/ERP structure)

The Dockerfile builds with Node and serves dist using Nginx. Compose uses the app service, port 3000:80 and restart: unless-stopped, matching CMS/ERP. The container uses nginx.conf; deploy/ contains snippets for manual hosting outside Docker.

Keep VITE_BASE_PATH=/ for the current root Endpoint. For a CMS/ERP-style path, set VITE_BASE_PATH=/r9/web/ in .env and set the LINE Endpoint to https://your-domain/r9/web/. Nginx supports these two paths; other paths require matching configuration.

Start Docker Desktop in Linux containers mode, then run from this project:

```powershell
docker compose up -d --build
docker compose exec app nginx -t
docker compose logs -f app
```

Open http://localhost:3000/ for a root build, or http://localhost:3000/r9/web/ for a subpath build. Changing VITE_LIFF_ID or VITE_BASE_PATH requires rebuilding with docker compose up -d --build. Compose passes public build settings from .env; the .env file is excluded from the Docker build context.

If CMS/ERP already uses port 3000, add R9_WEB_PORT=3001 to .env and use port 3001. To test Docker through LINE, start a tunnel targeting http://127.0.0.1:3000 (or your configured port); the existing tunnel still targets the Vite preview on port 4173. Production HTTPS is handled by an external reverse proxy.

Stop this Compose project:

```powershell
docker compose down
```

Direct image build without Compose:

```powershell
docker build --build-arg VITE_LIFF_ID=YOUR_LIFF_ID --build-arg VITE_BASE_PATH=/r9/web/ -t r9-web .
```

## Local development

```powershell
npm.cmd install
npm.cmd run dev
```

The checked-in `.env` contains public settings only. Never put a channel secret in `VITE_` variables because they are included in browser JavaScript. Set `VITE_LIFF_ID` to the LIFF ID for the intended LINE MINI App environment.

## Deployment at the domain root

For an Endpoint URL such as `https://your-domain/`:

1. Keep `VITE_BASE_PATH=/` in `.env`.
2. Run `npm.cmd run build`.
3. Copy the contents of `dist/` to `/var/www/r9/dist/` on the server.
4. Merge `deploy/nginx-root.conf` into the existing HTTPS `server` block for that domain. Change the filesystem path if necessary and replace conflicting `root`, `index`, or `location /` directives rather than duplicating them. Keep existing API locations and TLS settings.
5. Run `sudo nginx -t`, then `sudo systemctl reload nginx` if validation succeeds.
6. Set the Endpoint URL in LINE Developers to the actual HTTPS root URL.

## Deployment at /r9/

For an Endpoint URL such as `https://your-domain/r9/`:

1. Change `.env` to `VITE_BASE_PATH=/r9/`.
2. Run `npm.cmd run build` again; the base path is a build-time setting.
3. Copy the contents of `dist/` to `/var/www/r9/` on the server, so `/var/www/r9/index.html` exists.
4. Merge `deploy/nginx-r9.conf` into the existing HTTPS `server` block. Change filesystem paths to match the actual deployment. Replace any conflicting `/r9` locations.
5. Run `sudo nginx -t`, then `sudo systemctl reload nginx` if validation succeeds.
6. Set the Endpoint URL in LINE Developers to the actual HTTPS URL ending in `/r9/`.

These files are location snippets, not complete Nginx/TLS configurations. Use only the snippet matching your deployment. No domain, TLS certificate, or live server configuration is supplied in this project.

## Verify the deployment

- Open the Endpoint URL directly: it must display React rather than an Nginx 404 page.
- Check the JavaScript and CSS URLs in browser Network: they must return the actual assets, not HTML.
- Open a nested URL under the app path, including a query string: Nginx must serve the app's `index.html`.
- Open `https://liff.line.me/2011943189-Ke3BtWAo` if using the default LIFF ID. If you change the ID, use its corresponding LIFF URL.
- Successful SDK initialization displays the LINE connection status. Initialization alone does not imply that an external-browser user has logged in.
- Do not remove LINE query parameters or rewrite the browser URL before `liff.init()` resolves.

## References

- https://developers.line.biz/en/docs/liff/developing-liff-apps/
- https://vite.dev/guide/build.html#public-base-path
- https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/

## LINE testing from this local Windows machine

Cloudflared is installed at `%LOCALAPPDATA%\r9-tools\cloudflared.exe`. A temporary HTTPS tunnel was started for the built app on `127.0.0.1:4173`. Current URL and process IDs are in `%LOCALAPPDATA%\r9-tools\endpoint-url.txt`, `preview.pid`, and `tunnel.pid`; logs are in the same directory.

Set the **Developing** Endpoint URL under LINE MINI App > Web app settings to that HTTPS URL, including the trailing `/`. Confirm that the Developing LIFF ID matches `VITE_LIFF_ID`. Then open the Developing MINI App URL from LINE.

To restart manually, stop the previous preview and tunnel first, then use two PowerShell terminals. These manual commands remain in the foreground; Ctrl+C stops each process.

Terminal 1, in the project directory:

```powershell
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Terminal 2:

```powershell
& "$env:LOCALAPPDATA\r9-tools\cloudflared.exe" tunnel --url http://127.0.0.1:4173 --http-host-header localhost --protocol http2 --no-autoupdate
```

Copy the new `https://...trycloudflare.com/` URL shown by cloudflared to the Developing Endpoint URL each time the tunnel is restarted. Keep the computer and both processes running during testing. The URL is publicly accessible while the tunnel runs. This preview uses the build output: after editing source files, run `npm.cmd run build` again.

The application HTTP routes and assets have been verified through the tunnel. LINE SDK initialization still needs an end-to-end check in LINE after saving the Endpoint URL; this was not changed in the LINE console automatically.
