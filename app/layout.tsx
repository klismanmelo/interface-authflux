import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AuthFlux",
  description: "Autenticação pronta em minutos, não meses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full`}
      style={
        {
          "--font-display": `var(--font-space-grotesk), system-ui, sans-serif`,
          "--font-ui": `var(--font-plus-jakarta), system-ui, sans-serif`,
          "--font-mono": `var(--font-jetbrains-mono), ui-monospace, monospace`,
        } as React.CSSProperties
      }
    >
      <body className="h-full" style={{ fontFamily: "var(--font-ui)" }}>
        {children}
      </body>
    </html>
  );
}
