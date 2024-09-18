// app/ClientProviders.tsx
"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "@/redux/store";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}>
      <Provider store={store}>
        {children}
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default ClientProviders;
