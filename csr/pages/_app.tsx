import "bootstrap/dist/css/bootstrap.min.css";

import { AppProps } from "next/dist/next-server/lib/router/router";
import React from "react";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);
export default App;
