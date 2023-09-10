import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useSession } from "next-auth/react";

const Draft: React.FC = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("to_read");
  const {data: session} = useSession();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, author, status, email: session?.user?.email };
      await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("Book created successfully!");
      await Router.push("/reading");
    } catch (error) {
      alert("Error creating book!")
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Book</h1>
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
          <select onChange={(e) => setStatus(e.target.value)} className="select">
            <option onSelect={(e) => setStatus("to_read")} value="to_read">To Read</option>
            <option onSelect={(e) => setStatus("reading")} value="reading">Reading</option>
            <option onSelect={(e) => setStatus("read")} value="read">Read</option>
          </select>

          <input disabled={!name || !author || !status} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            Cancel
          </a>
        </form>
      </div>
    </Layout>
  );
};

export default Draft;
