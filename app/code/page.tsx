export default function Code() {
  const projects = [
    {
      name: "formosa-xmss",
      description: "Formally verified implementation of XMSS",
      url: "https://github.com/formosa-crypto/formosa-xmss/",
    },
    {
      name: "formosa-slh-dsa",
      description:
        "Jasmin implementation of the Stateless Hash-Based Digital Signature Standard (FIPS 205)",
      url: "https://github.com/formosa-crypto/formosa-slh-dsa/",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-8">Code</h1>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.name}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-gray-100 hover:underline font-medium"
            >
              {project.name}
            </a>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
