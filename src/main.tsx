import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import "./styles/minima.scss";

import NotFoundPage from "./pages/NotFoundPage.tsx";
import Homepage from "./pages/Homepage.tsx";
import CodePage from "./pages/CodePage.tsx";

const router = createHashRouter([
  { path: "/", element: <Homepage /> },
  {
    path: "/code",
    element: (
      <CodePage
        code_links={[
          {
            title: "formosa-xmss",
            url: "https://github.com/formosa-crypto/formosa-xmss",
            description: "Formally verified implementation of XMSS",
          },
          {
            title: "formosa-slh-dsa",
            url: "https://github.com/formosa-crypto/formosa-slh-dsa",
            description:
              "Jasmin implementation of the Stateless Hash-Based Digital Signature Standard (FIPS 205) ",
          },
        ]}
      />
    ),
  },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
