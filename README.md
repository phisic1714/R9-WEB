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

## TanStack Router (code-based)

All paths and shared layout metadata are declared in src/router.js using createRoute. Page components live in src/pages and are loaded with lazyRouteComponent. To add a page, create its component in src/pages and add a createRoute entry to rootRoute.addChildren in src/router.js. There is no file-route generator or Vite router plugin.

The router preserves VITE_BASE_PATH, the shared RootLayout/PageLayout, 404 handling and browser history. LIFF initialization still completes before the router is created.

## Prototype screens and responsive layouts

- /: home, LINE profile when available, and appointment entry points.
- /login: Thai ID / Health ID UI preview; neither identity service is integrated.
- /register: four-step registration with required-field validation and consent.
- /profile: patient overview and an editable name/phone/email example.
- /appointments, /appointments/new, /appointments/history: example appointment flow.
- /service: check-in, waiting queue, billing, and pharmacy previews.
- /feedback: rating, multiple topics, optional comment, and anonymous mode preview.
- /help: FAQ and navigation.

Mobile keeps the reference's stacked cards. At 900px and above the header becomes desktop navigation, home uses two columns, service has a step sidebar, and profile/feedback use balanced columns. Layout width is bounded rather than stretching phone cards across the desktop.

UI sample state lives only in the root route's React context (src/lib/demo-context.js). It resets on reload; no patient forms are saved to localStorage or transmitted to an API. Hospital data, queues, payments, QR, prescriptions, and authentication are demonstrations, not live services. Only the existing LINE profile lookup is live when authorized. A real hospital API, identity integration, approved branding assets, map and ticket QR are still needed before production use.

Shared components are intentionally small: AppHeader, PageLayout, Card, PrimaryButton, FormField, ServiceSteps and AppointmentTicket. Page components and logic are in src/pages. All application CSS lives in src/styles. Responsive breakpoints are defined with Tailwind utilities in TSX.

Page components live in src/pages; route declarations live in src/router.js.

## Tailwind CSS

Tailwind CSS v4 is integrated with @tailwindcss/vite. Write utility classes directly in route/component TSX, with shared colors defined in the @theme block of src/styles/index.css (bg-primary, text-navy, text-muted, border-outline). The desktop breakpoint is 900px (desktop:). Prettier automatically sorts Tailwind classes.

Layouts, cards, buttons, common field wrappers and reusable UI use literal Tailwind utilities. Tailwind Preflight supplies the component baseline; app base styles retain Thai typography. src/styles/App.css and src/styles/responsive.css retain reference-specific backgrounds and descendant styles; semantic class names are kept as hooks for these rules.

## Shared layout and shadcn/ui

RootLayout renders AppHeader and PageLayout around Outlet once. Route components return only their page content; they do not import PageLayout. Set staticData.title and (when needed) staticData.pageClassName in src/router.js to select the page heading and layout styles.

MobileSidebar uses the shadcn Sheet component from the left edge. Notifications and hospital selection use the shared Modal component built on shadcn Dialog. Radix handles focus trapping, Escape, and outside-click dismissal. The sidebar also closes after navigation and when resizing to desktop.

```jsx
import { useState } from 'react'
import Modal from '../components/Modal'

function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal open={open} onOpenChange={setOpen} title="Title" description="Optional description">
        <p>Modal content</p>
      </Modal>
    </>
  )
}
```

Optional Modal props: footer (React content) and className (Tailwind overrides). Shadcn source components live in src/components/ui and share the existing cn package. Add more using `npx shadcn add COMPONENT`. The @ alias points at src in Vite and tsconfig.json.

Nginx style-src permits inline styles required by Radix scroll locking/focus guards; script-src remains unchanged. Browser checks cover Escape, backdrop dismissal, focus restoration, navigation, one shared main/header per route, and responsive sizing.

## shadcn components throughout the app

Buttons and button-like links use ui/button (asChild for TanStack Link). Text and date inputs use ui/input; dropdowns use ui/native-select for mobile-friendly browser behavior. Textarea, Label, Checkbox, RadioGroup (time slots and star ratings), Accordion (FAQ), Progress (pharmacy), Badge and Avatar are shadcn components. Card and PrimaryButton remain small compatibility wrappers around shadcn components; FormField pairs shadcn Label with the child's id.

All page logic remains in src/pages. Native semantic containers such as forms, navigation and headings remain standard HTML. shadcn source lives in src/components/ui and uses the existing Tailwind theme and cn. Tailwind Preflight is enabled for consistent baseline styles.

## TanStack Form

RegisterPage, ProfilePage, NewAppointmentPage and FeedbackPage use @tanstack/react-form. Each page keeps its own defaultValues, validators, onSubmit and form.Field bindings directly in the page component. Shadcn controls use field.state.value, field.handleChange and field.handleBlur; FormField displays shadcn FieldError and accessible invalid/error attributes.

Registration validates the current step and retains values when moving back. Profile edits remain a draft until save. Appointment validation checks department, future/current date and time. Feedback validates the rating and comment length. Native form validation is disabled in these forms so TanStack owns validation and submission.

## Responsive Tailwind variants

All responsive breakpoints are expressed in JSX utility classes. desktop: uses the 900px custom breakpoint; min-[480px]: enables two-column fields; max-[370px]: adjusts compact phones. Shared page grids live in PageLayout and individual component adjustments live beside their markup. Reduced motion uses motion-reduce: on Sheet/Dialog. The CSS source has no hand-written media queries.

Responsive overrides use Tailwind v4's trailing important modifier where they replace existing unlayered legacy base styles. Base colors, backgrounds, and design details remain in CSS; no JavaScript viewport-dependent rendering is used for page layouts. The existing matchMedia listener only closes an open mobile sidebar on desktop resize.

### TypeScript components and styles

Page components, shared components and shadcn UI use .tsx. All application CSS is in src/styles, including index.css (Tailwind entry), App.css, responsive.css and AppHeader.css. shadcn and Prettier reference src/styles/index.css. Run npm run typecheck for strict TypeScript validation; npm run build includes this check. Routes remain code-based in src/router.js.
