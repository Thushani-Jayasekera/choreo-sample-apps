import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import Layout from "../../components/Layout";
import { BookProps } from "../../components/Book";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const book = await prisma.books.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      user_writer: {
        select: {  name:true, email: true },
      },
    },
  });
  return {
    props: book,
  };
};

const Book: React.FC<BookProps> = (props) => {
  const { data: session, status } = useSession();

  const id = props.id;
  const [name, setName] = React.useState(props.name);
  const [author, setAuthor] = React.useState(props.author);
  const [readStatus, setReadStatus] = React.useState(props.status);

  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  const updateBook = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, author, status: readStatus };
      await fetch(`/api/book/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("Book updated!");
      await Router.push("/reading");
    } catch (error) {
      alert("Error updating book!");
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={updateBook}>
          <h1>Update Book</h1>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Title"
            type="text"
            value={name}
          />
          <input
            autoFocus
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            type="text"
            value={author}
          />
          <select onChange={(e) => setReadStatus(e.target.value)} defaultValue={readStatus} className="select">
            <option onSelect={(e) => setReadStatus("to_read")} value="to_read">To Read</option>
            <option onSelect={(e) => setReadStatus("reading")} value="reading">Reading</option>
            <option onSelect={(e) => setReadStatus("read")} value="read">Read</option>
          </select>

          <input disabled={!name || !author || !readStatus} type="submit" value="Update" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            Cancel
          </a>
        </form>
      </div>
    </Layout>
  );
};

export default Book;
