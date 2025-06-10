import type { ReactNode } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";

interface Props {
  page_title?: string;
  children?: ReactNode;
}

const Layout = (props: Props) => {
  return (
    <>
      <Header
        site_title="Rui Fernandes"
        /* header_pages={[
          {
            title: "Code",
            path: "/code",
          },
        ]} */
      />

      <main className="page-content" aria-label="Content">
        <div className="wrapper">
          <div className="post-content">
            {props.page_title && <h3>{props.page_title}</h3>}
            <div>{props.children}</div>
          </div>
        </div>
      </main>

      <Footer
        site_author="Rui Fernandes"
        site_description="Cryptography Engineer at the Max Planck Institute for Security and Privacy."
        email="ruipedro16@protonmail.com"
      />
    </>
  );
};

export default Layout;
