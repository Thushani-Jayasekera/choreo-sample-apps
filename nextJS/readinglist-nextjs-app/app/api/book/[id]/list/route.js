import Book from "@models/book";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    const dbConnection = await connectToDB();
    const query = "SELECT * FROM books WHERE user_id=?";
    const values = [params.id];
    const [books] = await dbConnection.execute(query, values);
    dbConnection.end();
    return new Response(JSON.stringify(books, { status: 200 }));
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({message: "Failed to fetch all books"}, { status: 500 })
    );
  }
};
