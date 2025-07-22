import { useState } from "react";
import Layout from "../Layout";

import "./TextCounterPage.css";

interface Props {
  text?: string;
}

const TextCounterPage = ({ text = "Count words" }: Props) => {
  const [value, setValue] = useState(text);

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const wordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
  const alphanumericCount = (value.match(/[a-zA-Z0-9]/g) || []).length;
  const nonAlphanumericCount = (value.match(/[^a-zA-Z0-9]/g) || []).length;

  return (
    <Layout>
      <textarea value={value} onChange={onTextChange} />
      <br />
      <br />
      <p>Words: {wordCount}</p>
      <p>Alphanumeric Characters: {alphanumericCount}</p>
      <p>Non-Alphanumeric Characters: {nonAlphanumericCount}</p>
    </Layout>
  );
};

export default TextCounterPage;
