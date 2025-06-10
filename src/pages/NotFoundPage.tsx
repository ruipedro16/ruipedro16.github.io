import "./NotFoundPage.css";
import Layout from "../Layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="container">
        <h1>404</h1>

        <p>
          <strong>Page not found :( </strong>
        </p>
        <p>The requested page could not be found.</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
