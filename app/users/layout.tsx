import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emprezaz Usuários",
  description: "Emprezaz Usuários",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  )
}