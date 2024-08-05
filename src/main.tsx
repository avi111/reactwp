import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import object from "./dummyData/dev.ts";
import { LanguageProvider } from "./Language/LanguageContext.tsx";

if (import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.object = object;
}

const {
  object: { content, post, query, site, translations, menus },
} = window;

const injectedProps = { content, post, query, site, translations, menus };

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App {...injectedProps} />
    </LanguageProvider>
  </React.StrictMode>,
);

if (document.getElementById("header-placeholder")) {
  hydrateRoot(document.getElementById("header-placeholder")!, <div />);
}
