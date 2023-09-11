"use client";
import List from "@components/List";
import { useSession } from "next-auth/react";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import LoginButton from "@components/LoginButton";
import Head from "next/head";

const Home = () => {
  const { data, status } = useSession();
  if (status === "loading") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-xl pb-24">Loading...</p>
      </main>
    );
  }
  return (
    <NextUIProvider>
      <Head>
        <title>Reading List App</title>
        <meta name="description" content="Sample reading list app" />
        <link rel="icon" href="/next.svg" />
      </Head>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Reading List
          <br className="max-md:hidden" />
        </h1>
        <p className="desc text-center">Manage your books here!</p>
        {status === "authenticated" ? (
          <>
            <div className="w-[50rem]">
              <List />
            </div>
          </>
        ) : (
          <div className="row mt-5 d-flex justify-content-center">
            <LoginButton />
          </div>
        )}
      </section>
    </NextUIProvider>
  );
};
export default Home;
