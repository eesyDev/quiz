import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head />
      <body className="bg-white-bg text-textBlack dark:bg-black-text dark:text-white-bg">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
