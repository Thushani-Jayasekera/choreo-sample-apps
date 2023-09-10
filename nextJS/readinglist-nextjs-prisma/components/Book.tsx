import React from "react";
import Router from "next/router";
import { FcFullTrash,  FcEditImage} from "react-icons/fc";

export type BookProps = {
  id: string;
  name: string;
  author: string;
  status: string;
  user_writer: {
    name: string;
    email: string;
  }
};

async function deleteBook(id: string): Promise<void> {
    await fetch(`/api/book/${id}`, {
      method: "DELETE",
    });
    alert("Book is deleted successfully");
    Router.push("/");
  }

const Book: React.FC<{ book: BookProps }> = ({ book }) => {
  const authorName = book.author? book.author : "Unknown author";
  return (
    <div className="book-card">
    <div className="book-div">
      <h2>{book.name}</h2>
      <small><i>Written By <b>{authorName}</b></i></small>
    </div>
    <div className="book-buttons">
        <FcEditImage size={30} onClick={() => Router.push(`/p/${book.id}`)} />
        <FcFullTrash size={30} onClick={() => deleteBook(book.id)} />
      </div>
    </div>
  );
};

export default Book;
