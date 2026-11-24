import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { initializeLiff } from "./lib/liff";
import liff from "@line/liff";

function App() {
  const [count, setCount] = useState("");
  const [liffStatus, setLiffStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    initializeLiff().then(
      () => {
        if (active) setLiffStatus("ready");
      },
      () => {
        if (active) setLiffStatus("error");
      },
    );
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section id="center">
        <p role="status" aria-live="polite">
          {liffStatus === "loading" && "กำลังเชื่อมต่อ LINE…"}
          {liffStatus === "ready" && "เชื่อมต่อ LINE สำเร็จ"}
          {liffStatus === "error" &&
            "เชื่อมต่อ LINE ไม่สำเร็จ กรุณาลองเปิดแอปอีกครั้ง"}
        </p>
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>สวัสดี</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => {
            liff
              .getProfile()
              .then((profile) => {
                const name = profile.displayName;
                setCount(name);
                console.log("name :>> ", name);
              })
              .catch((err) => {
                console.log("error", err);
              });
          }}
        >
          Count is
        </button>
      </section>
      {count}
      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use
              href={`${import.meta.env.BASE_URL}icons.svg#documentation-icon`}
            ></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use
              href={`${import.meta.env.BASE_URL}icons.svg#social-icon`}
            ></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use
                    href={`${import.meta.env.BASE_URL}icons.svg#github-icon`}
                  ></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use
                    href={`${import.meta.env.BASE_URL}icons.svg#discord-icon`}
                  ></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use
                    href={`${import.meta.env.BASE_URL}icons.svg#x-icon`}
                  ></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use
                    href={`${import.meta.env.BASE_URL}icons.svg#bluesky-icon`}
                  ></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
