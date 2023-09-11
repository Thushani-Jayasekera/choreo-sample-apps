import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, name, author, status } = await req.json();

  try {
    const dbConnection = await connectToDB();
    dbConnection.connect();
    const query =
      "INSERT INTO books (name, author, status, user_id) VALUES (?,?,?,?)";
    const values = [name, author, status, userId];
    const newBook = await dbConnection.query(query, values);
    dbConnection.end();
    return new Response(JSON.stringify(newBook), { status: 201 });
  } catch (e) {
    return new Response({message: "Failed creating record"}, { status: 500 });
  }
};
