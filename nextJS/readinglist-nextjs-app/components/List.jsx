"use client";

import { useEffect, useState } from "react";
import Book from "../components/Book";
import { useSession } from "next-auth/react";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

const List = () => {
  const { data } = useSession();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`/api/book/${data.user.id}/list`);
      const res = await response.json();
      setBooks(res);
    };
    fetchBooks();
  }, [data.user.id]);

  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="reading" title="Reading">
            <Card>
              <CardBody>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Author
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Edit
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Delete
                      </th>
                    </thead>
                    <tbody>
                      {Array.isArray(books) &&
                      books.filter((book) => book.status === "reading")
                        .length === 0 ? (
                        <tr>
                          <td className="text-xl pb-2 pt-2 text-center" colSpan="5">No records</td>
                        </tr>
                      ) : (
                        books
                          .filter((book) => book.status === "reading")
                          .map((book) => <Book key={book._id} book={book} />)
                      )}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="to_read" title="Want to read">
            <Card>
              <CardBody>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Author
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Edit
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Delete
                      </th>
                    </thead>
                    <tbody>
                    {Array.isArray(books) &&
                      books.filter((book) => book.status === "to_read")
                        .length == 0 ? (
                        <tr>
                          <td className="text-xl pb-2 pt-2 text-center" colSpan="5">No records</td>
                        </tr>
                      ) : (
                        books
                          .filter((book) => book.status === "to_read")
                          .map((book) => <Book key={book._id} book={book} />)
                      )}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="read" title="read">
            <Card>
              <CardBody>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Author
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Edit
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Delete
                      </th>
                    </thead>
                    <tbody>
                    {Array.isArray(books) &&
                      books.filter((book) => book.status === "read")
                        .length === 0 ? (
                        <tr>
                          <td className="text-xl pb-2 pt-2 text-center" colSpan="5">No records</td>
                        </tr>
                      ) : (
                        books
                          .filter((book) => book.status === "read")
                          .map((book) => <Book key={book._id} book={book} />)
                      )}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
export default List;
