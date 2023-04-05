import { LayoutProps } from "../types";
import { Navbar } from "./Navbar";

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
