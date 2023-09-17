import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';


export default async function handle(req: { body: { name: any; author: any; status: any; email:any }; }, res: { json: (arg0: { id: string; name: string; status: string; author: string; user_writer__id: string; }) => void; }) {
  const { name, author, status, email } = req.body;

  const session = await getSession();
  const result = await prisma.books.create({
    data: {
      name: name,
      author: author,
      status: status,
      user_writer: { connect: { email: email } },
    },
  });
  res.json(result);
}