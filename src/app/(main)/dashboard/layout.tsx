import { WorkspaceProvider } from "@/components/workspace-provider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <WorkspaceProvider>
      {children}
      </WorkspaceProvider>
    </main>
  );
}
