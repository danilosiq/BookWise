'use client'
import AuthProvider from "@/core/providers/auth-provider";
import "@/core/styles/globals.css";
import "@/core/styles/tailwind-config.css";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient()
  return (
    <html lang="en">
      <body className={` antialiased bg-gray-700`}>
      <Toaster />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
