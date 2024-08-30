import { Sidebar } from "../components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en">
      <div>
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
