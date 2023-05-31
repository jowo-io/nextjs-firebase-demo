import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login / Signup",
  description: "Login / Signup to access cool stuff!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
