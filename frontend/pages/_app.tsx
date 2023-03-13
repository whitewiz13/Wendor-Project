import '@/styles/globals.css'
import "tailwindcss/tailwind.css";
import type { AppProps } from 'next/app';
import { UserProvider } from '../app-context/index';

export default function App({ Component, pageProps }: AppProps) {
  return <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
}
