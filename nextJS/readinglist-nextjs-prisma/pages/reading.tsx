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
    return { props: { readings: [] } };
  }

  const readings = await prisma.books.findMany({
    where: {
      user_writer: { email: session.user.email },
      status: "reading",
    },
    include: {
      user_writer: {
        select: { email: true },
      },
    },
  });
  return {
    props: { readings },
    revalidate: 10
  };
};

type Props = {
  readings: BookProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Current Readings</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Current Readings</h1>
        <main>
          {props.readings.length === 0 && <p>No books added as reading yet.</p>}
          {props.readings.map((book) => (
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
