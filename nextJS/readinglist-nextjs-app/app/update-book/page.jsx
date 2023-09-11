"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { useSession } from "next-auth/react";

const EditBook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("id");
  const [ready, setReady] = useState(false);
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [book, setBook] = useState({
    name: "",
    author: "",
    status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (status === "unauthenticated") {
        router.push("/unauthorized");
      } else if (status === "authenticated") {
        setProfileData(session.user);
      }

      if (bookId) {
        try{
          const response = await fetch(`/api/book/${bookId}`);
          if (!response.ok) {
            alert(`Something went wrong!\n ${response.message}}`);
            router.push("/");
          }
          const data = await response.json();
          setBook({
            name: data.name,
            author: data.author,
            status: data.status,
          });
          setReady(true);
        } catch (e) {
          alert(`Something went wrong!`);
          router.push("/");
        }
      }
    };
    fetchData();
  }, [status, session, bookId]);

  if (status !== "authenticated") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-xl pb-24">Loading...</p>
      </main>
    );
  }

  const editBook = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/book/${bookId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: book.name,
          author: book.author,
          status: book.status,
          userId: profileData.id,
        }),
      });
      if (response.ok) {
        alert("Book updated successfully!");
        router.push("/");
      } else {
        alert(`Something went wrong!" \n ${response.message}}`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (!ready) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-xl pb-24">loading...</p>
      </main>
    );
  }

  return (
    <Form
      type="Update"
      book={book}
      setBook={setBook}
      submitting={submitting}
      handleSubmit={editBook}
    />
  );
};

export default EditBook;
