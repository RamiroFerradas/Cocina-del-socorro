import { Sidebar } from "../components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en">
      <div className="flex">
        <Sidebar />
        <div className="p-4">{children}</div>
      </div>
    </main>
  );
}
