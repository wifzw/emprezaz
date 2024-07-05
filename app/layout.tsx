import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/molecules/AppBar/AppBar";
import NavigationDrawer from "@/components/molecules/NavigationDrawer/NavigationDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emprezaz Dashboard",
  description: "Dashboard Emprezaz",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <NavigationDrawer />

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <AppBar />
          {children}
        </div>
      </body>
    </html>
  );
}
