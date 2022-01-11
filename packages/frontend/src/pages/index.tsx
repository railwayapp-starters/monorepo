import type { NextPage } from "next";
import React from "react";
import { Page } from "../layouts/Page";
import "twin.macro";

const Home: NextPage = () => {
  return (
    <Page tw="p-8">
      <div tw="max-w-4xl w-full mx-auto">
        <header tw="mt-12 mb-12">
          <h1 tw="font-bold text-5xl">monorepo.</h1>
        </header>
      </div>
    </Page>
  );
};

export default Home;
