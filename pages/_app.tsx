import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import AuthProvider from "../contexts/auth";

import '../utils/global.css'

const App = ({ 
  Component, 
  pageProps: { session, ...pageProps }, 
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  );
};

export default App;
