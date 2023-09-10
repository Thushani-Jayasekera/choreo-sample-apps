import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Book, { BookProps } from "../components/Book"
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.books.findMany({
    where: { status: 'reading' },
    },
  );
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: BookProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>What our Readers are Reading</h1>
        <main>
        {props.feed.length === 0 && <p>No books added yet.</p>}
          {props.feed.map((book) => (
            <div key={book.id} className="book">
              <Book book={book} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Blog
