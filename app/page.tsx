import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Rui Fernandes</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          {/* Cryptography Engineer */}
        </p>
        <div className="flex gap-4 text-sm">
          <a
            href="https://github.com/ruipedro16"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:ruipedro16@protonmail.com"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Email
          </a>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p>
          <s>
            Currently, I&apos;m a Cryptography Engineer at the{" "}
            <a
              href="https://www.mpi-sp.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Max-Planck Institute for Security and Privacy
            </a>{" "}
            working on formally verified post-quantum cryptographic
            implementations as part of the{" "}
            <a
              href="https://formosa-crypto.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Formosa Crypto
            </a>{" "}
            project.
          </s>
        </p>

<br/>

        <p>
          Before that, I did my BSc in Software Engineering at the{" "}
          <a
            href="https://www.uminho.pt/EN"
            target="_blank"
            rel="noopener noreferrer"
          >
            University of Minho
          </a>{" "}
          and my MSc in Information Security at the{" "}
          <a
            href="https://www.up.pt/fcup/en/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Faculty of Sciences of the University of Porto
          </a>{" "}
          where I wrote my Master&apos;s thesis on{" "}
          <a
            href="https://repositorio-aberto.up.pt/bitstream/10216/152745/2/641114.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <em>Speculative Execution Resilient Cryptography</em>
          </a>
          .
        </p>

<br/>

        <p>
          <Link href="/cv.pdf" target="_blank">
            CV
          </Link>{" "}
          (last updated on Oct 6, 2025)
        </p>
      </div>
    </div>
  );
}
