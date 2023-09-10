import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Book, { BookProps } from '../components/Book';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { reads: [] } };
  }

  const reads = await prisma.books.findMany({
    where: {
      user_writer: { email: session?.user.email },
      status: 'read',
    },
    include: {
      user_writer: {
        select: { name: true },
      },
    },
  });
  return {
    props: { reads },
    revalidate: 10
  };
};

type Props = {
  reads: BookProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Reads</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Reads</h1>
        <main>
          {props.reads.length === 0 && <p>No books added read yet.</p>}
          {props.reads.map((book) => (
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