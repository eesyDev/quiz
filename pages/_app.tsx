import "@/globals.css";
import "./styles/index.css"
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { appWithTranslation } from 'next-i18next';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SessionProvider } from 'next-auth/react';
import { Inter } from "next/font/google";
import store from "@/redux/store";


const inter = Inter({ subsets: ["latin",  "cyrillic"], variable: '--font-inter' });

const App = ({ Component, pageProps: {session, ...pageProps} }: AppProps) => {
  return (
    <SessionProvider session={session}>
        <Provider store={store}>
          <div className={`${inter.variable}`}>
            <Component {...pageProps} />
          </div>
        </Provider>
    </SessionProvider>
  );
}

export default appWithTranslation(App);
