import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
      </Head>
      <body className="bg-white-bg text-textBlack dark:bg-black-text dark:text-white-bg">
        <Main />
        <NextScript />
        <df-messenger
          intent="WELCOME"
          chat-title="Test_agent"
          agent-id="236880ec-4bca-4d00-a7fd-05f10948e6c3"
          language-code="ru"
        ></df-messenger>
      </body>
    </Html>
  );
}
