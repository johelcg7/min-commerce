import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/providers";

export const metadata: Metadata = {
  title: "Min-Commerce",
  description: "Una tienda online minimalista",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className={`${GeistSans.className} antialiased h-full`}>
        <AuthProvider>
          <div className="min-h-full">
            <Navbar />
            <main className="min-h-screen">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
