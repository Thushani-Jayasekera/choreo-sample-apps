import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Script from "next/script";

export const metadata = {
  title: "ReadingList",
  description: "Manage your books",
};

const RootLayout = ({ children }) => (
  <html lang="en" data-theme="light">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
