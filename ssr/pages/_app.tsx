import "bootstrap/dist/css/bootstrap.min.css";

import { AppProps } from "next/dist/next-server/lib/router/router";
import { ErrorComponent } from "../components";
import React from "react";

const App: React.FC<AppProps> = ({ Component, pageProps }) =>
  pageProps.error ? (
    <ErrorComponent {...pageProps.error} />
  ) : (
    <Component {...pageProps} />
  );
export default App;
