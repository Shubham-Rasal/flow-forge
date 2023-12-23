import Background from "@/components/backgroud";
import GithubStars from "@/components/github-stars";
import { Navbar } from "@/components/navbar";
import { ModeToggle } from "@/components/theme-toggler";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Background />
      <header className="fixed top-0 z-50 h-[60px] w-full items-center border-b">
        <nav className="mx-auto flex h-full  items-center justify-between px-5 sm:pl-4 sm:pr-3 md:max-w-7xl lg:px-4">
          <Navbar />

          <div className="flex justify-around items-center gap-2">
            <GithubStars />
            <ModeToggle />
          </div>
        </nav>
      </header>
      <div className="mt-16">{children}</div>
    </main>
  );
}
