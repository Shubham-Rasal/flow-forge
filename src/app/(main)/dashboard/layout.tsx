import { WorkspaceProvider } from "@/components/providers/workspace-provider";

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
