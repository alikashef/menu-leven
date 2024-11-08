"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" className="h-full">
        <body className={`antialiased overflow-hidden h-full`}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}