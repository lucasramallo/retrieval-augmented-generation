
import "@/app/globals.css"
import { cookies } from "next/headers"
import Header from "../components/Header";
import { PrimeReactProvider } from 'primereact/api';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()

  return (
    <html lang="en" className="bodyContainer dark">
      <body>
      <PrimeReactProvider>
        <Header />
          <main className="ml-[var(--sidebar-width)] transition-all">
            {children}
          </main>
        </PrimeReactProvider>
      </body>
    </html>
  )
}
