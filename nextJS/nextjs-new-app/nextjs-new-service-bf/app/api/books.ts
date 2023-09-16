import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import jwt_decode from 'jwt-decode';

interface DecodedToken {
  email: any;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const accessToken = req.headers.authorization;

      if (typeof accessToken !== 'string') {
        throw new Error('Access token is missing or invalid');
      }

      const decodedToken = jwt_decode(accessToken) as DecodedToken;

      const newBook = await prisma.book.create({
        data: {
          title: req.body.title,
          author: req.body.author,
          status: req.body.status,
          user_writer_id: decodedToken.email,
        },
      });

      res.json(newBook);
    } else if (req.method === 'DELETE') {
      const bookId = req.query.id;

      if (typeof bookId !== 'string') {
        throw new Error('Invalid book ID');
      }

      const deletedBook = await prisma.book.delete({
        where: { id: bookId },
      });

      res.json(deletedBook);
      
    } else if (req.method === 'GET') {
      const accessToken = req.headers.authorization;

      if (typeof accessToken !== 'string') {
        throw new Error('Access token is missing or invalid');
      }

      const decodedToken = jwt_decode(accessToken) as DecodedToken;

      console.log(decodedToken.email);

      const reads = await prisma.book.findMany({
          where: {
            user_writer_id: decodedToken.email,
          },
        });
        res.status(200).json({ name: 'John Doe' })
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
  } catch (error) {
    console.error('Error occurred', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
}
