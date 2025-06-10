import Social from "./Social";

interface Props {
  site_title?: string;
  site_author?: string;
  site_description: string;
  email?: string;
}

const Footer = ({
  site_title,
  site_author,
  site_description,
  email,
}: Props) => {
  return (
    <footer className="site-footer h-card">
      <data className="u-url" value="/"></data>

      <div className="wrapper">
        <h2 className="footer-heading">{site_title}</h2>

        <div className="footer-col-wrapper">
          <div className="footer-col footer-col-1">
            <ul className="contact-list">
              <li className="p-name">{site_author || site_title || ""}</li>
              {email && (
                <li>
                  <a className="u-email" href={`mailto:${email}`}>
                    {email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="footer-col footer-col-2">
            <Social
              github_username="ruipedro16"
              linkedin_username="ruipedro16"
            />
          </div>

          <div className="footer-col footer-col-3">
            <p>{site_description}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
