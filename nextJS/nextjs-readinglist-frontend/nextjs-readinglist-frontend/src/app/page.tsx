"use client"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { Book } from "./types/book";
import groupBy from "lodash/groupBy";
import { Dictionary } from "lodash";

export default function Home() {
//const { data: session } = useSession();
const [readList, setReadList] = useState<Dictionary<Book[]> | null>(null);
const [isAddItemOpen, setIsAddItemOpen] = useState(false);
const [isLoading, setIsLoading] = useState(false);

async function getReadingList() {
  // if signed in handle list
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav className="bg-white py-2 md:py-2">
        <div className="container px-4 mx-auto md:flex md:items-center">
          <div className="flex justify-between items-center">

            <button
              className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
              id="navbar-toggle"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div
            className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
            id="navbar-collapse"
          >
            <button
              className="float-right bg-[#5b86e5] p-2 rounded-md text-sm my-3 font-medium text-white"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="py-3 md:py-6">
        <div className="container px-4 mx-auto flex justify-center">
          <div className="w-full max-w-lg px-2 py-16 sm:px-0 mb-20">
          <div className="container w-auto">
                <button
                  className="float-right bg-black bg-opacity-20 p-2 rounded-md text-sm my-3 font-medium text-white h-10"
                  onClick={() => setIsAddItemOpen(true)}
                >
                  + Add New
                </button>
                <button
                  className="float-right bg-black bg-opacity-20 p-2 rounded-md text-sm my-3 font-medium text-white w-10 h-10 mr-1"
                  onClick={() => getReadingList()}
                >
                  <HiArrowPathRoundedSquare />
                </button>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}
