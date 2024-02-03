import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SupabaseUserProvider } from "@/components/providers/user-provider";
import Background from "@/components/backgroud";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flow Forge",
  description: "Flow Forge is a visual programming tool for building life plans.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Background />
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          attribute="class"
          disableTransitionOnChange
        >
          <SupabaseUserProvider>
              {children}
          </SupabaseUserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
