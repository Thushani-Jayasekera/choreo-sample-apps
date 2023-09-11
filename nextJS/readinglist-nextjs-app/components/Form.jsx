"use client";

import Link from "next/link";

const Form = ({ type, book, setBook, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="form_text_blue">{type} Book</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7"
      >
        <label>
          <span className="text-base text-gray-700">Book Name</span>
          <input
            value={book.name}
            onChange={(e) => setBook({ ...book, name: e.target.value })}
            placeholder="Book Name"
            required
            className="form_input max-w-xl"
          />
        </label>

        <label>
          <span className="text-base text-gray-700">Book Author</span>
          <input
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            placeholder="Book Author"
            required
            className="form_input max-w-xl"
          />
        </label>

        <label>
          <select
            isRequired
            onChange={(e) => setBook({ ...book, status: e.target.value })}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer max-w-xl"
            value={book.status}
            label="status"
            placeholder="Select reading status"
          >
            <option
              hidden
            >
              Choose your reading status...
            </option>

            <option
              value="to_read"
            >
              Want to Read
            </option>
            <option
              value="reading"
            >
              Reading
            </option>
            <option
              value="read"
            >
              Read
            </option>
          </select>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-gray"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
