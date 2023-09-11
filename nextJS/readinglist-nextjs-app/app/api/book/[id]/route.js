import Book from "@models/book";
import { connectToDB } from "@utils/database";

export const GET =async (req, {params}) => {
    try {
        const dbConnection = await connectToDB();
        dbConnection.connect();
        const query ="SELECT * FROM books where _id=?";
        const values = [params.id];
        const [books] = await dbConnection.query(query,values);
        dbConnection.end();
        if (!books) return new Response({message: "Book Not found"}, {status:404});
        return new Response(JSON.stringify(books[0], {status:200}))

    } catch (e) {
        console.log(e);
        return new Response({message:"Failed to fetch all books"}, {status:500})
    }
};

export const PATCH = async (request, { params }) => {
    const { name, author, status, userId } = await request.json();

    try {
        const dbConnection = await connectToDB();
        dbConnection.connect();
        const query ="SELECT * FROM books where _id=?";
        const values = [params.id];
        const [existingBook] = await dbConnection.query(query,values);

        if (!existingBook) {
            return new Response("Book not found", { status: 404 });
        }
        if (existingBook[0].user_id !== userId) {
            return new Response("Access Denied", { status: 404 });
        }
        const updateQuery = "UPDATE books SET name=?, author=?, status=? WHERE _id=?";
        const updateValues = [name, author, status, params.id];
        const [book] = await dbConnection.query(updateQuery,updateValues);
        dbConnection.end();
        return new Response({message: "Successfully updated"}, { status: 200 });
    } catch (error) {
        return new Response({message:"Error Updating"}, { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        const dbConnection = await connectToDB();
        dbConnection.connect();
        const query ="DELETE FROM books WHERE _id=?";
        const values = [params.id];
        const [book] = await dbConnection.query(query,values);
        dbConnection.end();
        return new Response(JSON.stringify({message: "Deleted successfully"}, { status: 200 }));
    } catch (error) {
        return new Response(JSON.stringify({message: "Error deleting"}, { status: 500 }));
    }
};