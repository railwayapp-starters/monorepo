import type { NextPage } from "next";
import React from "react";
import { Page } from "../layouts/Page";
import "twin.macro";
import { Orb } from "../components/Orb";

const Home: NextPage = () => {
  return (
    <Page tw="p-8">
      <div tw="max-w-4xl w-full mx-auto">
        <header tw="mt-12 mb-12">
          <h1 tw="font-bold text-5xl">monorepo.</h1>
        </header>

        <code>
          <pre tw="bg-accent p-4 rounded-md font-mono max-w-max">
            Branch: {process.env.RAILWAY_GIT_BRANCH ?? "no branch"} <br />
            Commit: {process.env.RAILWAY_GIT_BRANCH ?? "no commit"} <br />
            Static URL: {process.env.RAILWAY_GIT_BRANCH ?? "no static url"}
          </pre>
        </code>

        <div tw="flex flex-col w-full h-[600px]">
          <Orb />
        </div>
      </div>
    </Page>
  );
};

export default Home;
