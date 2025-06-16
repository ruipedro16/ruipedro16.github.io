// @ts-ignore
import Scene from "../components/Scene";

import Layout from "../Layout";

const Homepage = () => {
  return (
    <Layout>
      <p>
        Cryptography Engineer at the{" "}
        {/* TODO: Make sure the link is not broken */}
        <a
          href="https://www.mpi-sp.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Max-Planck Institute for Security and Privacy
        </a>{" "}
        working on formally verified post-quantum cryptographic implementations
        as part of the {/* TODO: Make sure the link is not broken */}
        <a
          href="https://formosa-crypto.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Formosa Crypto
        </a>{" "}
        project.
      </p>

      <ul>
        <li>
          <a href="CV.pdf" target="_blank" rel="noopener noreferrer">
            CV
          </a>
        </li>
      </ul>
      <br />
      <br />
      <br />
      <br />
      <Scene />
    </Layout>
  );
};

export default Homepage;
