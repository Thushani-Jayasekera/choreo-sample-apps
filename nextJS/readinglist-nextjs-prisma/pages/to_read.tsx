import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Book, { BookProps } from "../components/Book";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { to_reads: [] } };
  }

  const to_reads = await prisma.books.findMany({
    where: {
      user_writer: { email: session.user.email },
      status: "to_read",
    },
    include: {
      user_writer: {
        select: { email: true },
      },
    },
  });
  return {
    props: { to_reads },
  };
};

type Props = {
  to_reads: BookProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>Books to Read</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>Books to Read</h1>
        <main>
          {props.to_reads.length === 0 && <p>No books added to read yet.</p>}
          {props.to_reads.map((book) => (
            <div key={book.id} className="book">
              <Book book={book} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
