import Glow from "@/components/glow-wrapper";
import { WaitlistForm } from "@/components/join-waitlist";
import NewRelease from "@/components/new-realease-button";
import { Button } from "@/components/ui/button";

const HomePage = () => {

  console.log("Home Page: ",process.env.SERVICE_ROLE_KEY)

  return (
    <section className="flex flex-col h-fit  bg-gradient-radial from-0% via-50% to-100% bg-no-repeat from-indigo-500/20 to-transparent">
      <div className="mx-auto flex w-full max-w-5xl flex-col px-4 py-16 sm:px-6 sm:py-28 lg:px-2 items-center">
        <div className="flex max-w-2xl  px-1 lg:px-0">
          <div className="flex flex-col mt-4 items-center">
            <h1 className="dark:text-slate-200 text-slate-800 font-title font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight sm:leading-[3rem] lg:leading-[4rem] pb-6 text-center">
              The only
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Life Planner
              </div>
              you need to be
              <div className="bg-gradient-to-r from-slate-600 to-stone-600  bg-clip-text text-transparent">
                Accountable
              </div>
            </h1>
          </div>
        </div>
        <div className="relative  flex justify-center items-center">
          <WaitlistForm />
        </div>
      </div>

      {/* <div className="h-screen flex items-center justify-center">
        <Glow>
          <NewRelease />
        </Glow>
      </div> */}

      {/* <div className="mb-8 flex">
        <a
          href="https://github.com/ibelick/background-snippets"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex"
        >
          <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]" />
            <div className="inline-flex h-full w-full cursor-pointer justify-center rounded-full bg-white px-3 py-1 text-xs font-medium leading-5 text-slate-600 backdrop-blur-xl dark:bg-black dark:text-slate-200">
              New snippets ⚡️
              <span className="inline-flex items-center pl-2 text-black dark:text-white">
                Read more{" "}
              </span>
            </div>
          </span>
        </a>
      </div> */}

    </section>
  );
};

export default HomePage;
