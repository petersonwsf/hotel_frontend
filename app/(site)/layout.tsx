import { Metadata } from "next";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata : Metadata = {
  title: "Lúmen Hotel",
  description: "O melhor hotel boutique para sua estadia inesquecível.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="min-h-[80vh]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
