import { SessionProvider } from "next-auth/react"

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'

import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
