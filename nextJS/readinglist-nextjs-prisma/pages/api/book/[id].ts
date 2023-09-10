import prisma from '../../../lib/prisma';

export default async function handle(req: { query: { id: any; }; method: string; body: { name: any; author: any; status: any; }; }, res: { json: (arg0: { id: string; name: string; status: string; author: string; user_writer__id: string; }) => void; }) {
  const bookId = req.query.id;
  if (req.method === 'DELETE') {
    const post = await prisma.books.delete({
      where: { id: bookId },
    });
    res.json(post);
  } if (req.method === 'PUT') {
    const { name, author, status } = req.body;
    const bookId = req.query.id;
    const post = await prisma.books.update({
      where: { id: bookId },
      data: { name: name, author: author, status: status },
    });
    res.json(post);
  }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}