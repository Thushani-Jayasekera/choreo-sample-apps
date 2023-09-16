import { GetServerSideProps } from "next";
import { useSession, signOut, getSession } from "next-auth/react";
import { Tab } from "@headlessui/react";
import { HiArrowUp } from "react-icons/hi";
import { useEffect, useState } from "react";
import Router from "next/router";
import { Dictionary } from "lodash";
import groupBy from "lodash/groupBy";
import { Book } from "@/types/book";
import AddItem from "@/components/add-book";
import Header from "@/components/header";
import { access } from "fs";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  const { data: session, status } = useSession();
  const [readingList, setReadingList] = useState<Dictionary<Book[]> | null>(
    null
  );
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  if (status === "loading") {
    return <div>Authenticating...</div>;
  }

  const accessToken = session?.user?.accessToken;

  async function getBooks() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const grouped = groupBy(await response.json(), "status");
      setReadingList(grouped);
      Router.push("/");
    } else {
      alert(`Something went wrong!"`);
    }
  }
  async function deleteBook(id: string): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_SERVICE_URL}?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    alert("Book is deleted successfully");
    Router.push("/");
  }

  useEffect(() => {
    if (accessToken) {
      getBooks();
    }
  }, [accessToken]);

  return (
    <div className="py-3 md:py-6">
      <div className="container px-4 mx-auto flex justify-center">
        <div className="w-full max-w-lg px-2 py-16 sm:px-0 mb-20">
          {session?.user ? (
            <>
              <div className="flex justify-between">
                <p className="text-4xl text-white mb-3 font-bold">
                  Reading List
                </p>
                <p>Hello {session?.user.email ? session.user.email : ""}</p>
                <div className="container w-auto">
                  <button
                    className="float-right bg-black bg-opacity-20 p-2 rounded-md text-sm my-3 font-medium text-white h-10"
                    onClick={() => setIsAddItemOpen(true)}
                  >
                    + Add New
                  </button>
                  <button
                    className="float-right bg-black bg-opacity-20 p-2 rounded-md text-sm my-3 font-medium text-white w-10 h-10 mr-1"
                    onClick={() => Router.push("/")}
                  >
                    <HiArrowUp onclick={() => Router.reload()} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      signOut({ callbackUrl: "/" });
                    }}
                    style={{ marginTop: "30px", marginBottom: "40px" }}
                  >
                    Logout
                  </button>
                </div>
              </div>
              {readingList && (
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {Object.keys(readingList).map((val) => (
                      <Tab
                        key={val}
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                            selected
                              ? "bg-white shadow"
                              : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                          )
                        }
                      >
                        {val}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    {Object.values(readingList).map((books: Book[], idx) => (
                      <Tab.Panel key={idx}>
                        <ul>
                          {books.map((book) => (
                            <div className="flex justify-between" key={book.id}>
                              <li className="relative rounded-md p-3">
                                <h3 className="text-sm font-medium leading-5">
                                  {book.title}
                                </h3>

                                <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                  <li>{book.author}</li>
                                  <li>&middot;</li>
                                </ul>
                              </li>
                              <button
                                className="float-right bg-red-500 text-white rounded-md self-center text-xs p-2 mr-2"
                                onClick={() => deleteBook(book.id || "")}
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </ul>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              )}
              <AddItem isOpen={isAddItemOpen} setIsOpen={setIsAddItemOpen} />
            </>
          ) : (
            <>
              <Header />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default Home;
