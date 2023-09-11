"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const AddBook = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [book, setBook] = useState({
    name: "",
    author: "",
    status: "",
  });
  const { data, status } = useSession();
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    if (status === "unauthenticated") {
      push("/unauthorized");
    } else if (status === "authenticated") {
      setProfileData(data.user);
    }
  }, [status]);

  if (status !== "authenticated") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-xl pb-24">Loading...</p>
      </main>
    );
  }

  const addBook = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/book/new", {
        method: "POST",
        body: JSON.stringify({
          userId: profileData.id,
          name: book.name,
          author: book.author,
          status: book.status,
        }),
      });
      console.log("response add book", response, response.ok);
      if (response.ok) {
        alert("Book added successfully!");
        router.push("/");
      } else {
        alert(`Something went wrong!\n ${response.message}}`);
        setSubmitting(false);
      }
    } catch (e) {}
  };
  return (
    <Form
      type="Create"
      book={book}
      setBook={setBook}
      submitting={submitting}
      handleSubmit={addBook}
    />
  );
};

export default AddBook;
