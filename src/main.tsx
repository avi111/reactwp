import React from 'react'
import {createRoot, hydrateRoot} from 'react-dom/client'
import App from './App.tsx'
import object from "./dev.ts";
import {LanguageProvider} from './Language/LanguageContext.tsx';

if (import.meta.env.DEV) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.object = object;
}
createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <LanguageProvider>
            <App/>
        </LanguageProvider>
    </React.StrictMode>,
)

if(document.getElementById('header-placeholder')) {
    hydrateRoot(document.getElementById('header-placeholder')!, <div/>);
}

