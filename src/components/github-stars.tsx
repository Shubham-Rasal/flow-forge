import React from "react";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

const url = process.env.NEXT_PUBLIC_GITHUB_URL;

function formatNumber(number: any) {
  const absNumber = Math.abs(number);

  if (absNumber >= 1e6) {
    return (number / 1e6).toFixed(1) + "M";
  } else if (absNumber >= 1e3) {
    return (number / 1e3).toFixed(1) + "k";
  } else {
    return number.toString();
  }
}

async function getStars() {
  const res = await fetch(
    `https://api.github.com/repos/${url}`
  );
  const json = await res.json();
  return formatNumber(json.stargazers_count);
}

const GithubStars = async () => {
  //get the number of stars from github api
  const stars = await getStars();

  return (
    <a
      href={`https://github.com/${url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-2 p-2 hover:bg-slate-850 rounded-md transition-colors"
    >
        <Github
          className="h-6 w-6 text-neutral-800 transition-colors hover:text-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-400"
          strokeWidth={1.5}
        />
        <span className=" text-neutral-800 dark:text-neutral-200">
          {stars}
        </span>
    </a>
  );
};

export default GithubStars;
