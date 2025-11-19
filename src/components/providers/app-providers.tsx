"use client";

import { Toaster } from "sonner";

type Props = {
  children: React.ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <>
      {children}
      <Toaster richColors position="top-right" />
    </>
  );
}
