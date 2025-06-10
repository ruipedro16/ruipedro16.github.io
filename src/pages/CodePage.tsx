import Layout from "../Layout";

interface Info {
  title: string;
  url: string;
  description: string;
}

interface Props {
  code_links: Info[];
}

const CodePage = ({ code_links }: Props) => {
  return (
    <Layout page_title="Code">
      <div className="post-content">
        <ul>
          {code_links.map((item, index) => (
            <li key={index}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              : {item.description}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default CodePage;
