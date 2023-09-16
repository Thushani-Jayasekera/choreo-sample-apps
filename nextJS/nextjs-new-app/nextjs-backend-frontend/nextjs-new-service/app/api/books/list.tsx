import prisma from '../../../lib/prisma';

export default async function handle(req: { query: { id: any; }; method: string; body: { title: any; author: any; status: any; email:any }; }, res: { json: (arg0: { id: string; title: string; author: string; status: string; user_writer_id: string; }[]) => void; } ) {
    const bookId = req.query.id;
     if (req.method === 'GET') {
        const reads = await prisma.book.findMany({
            where: {
              user_writer_id: req.body.email,
            },
          });
        res.json(reads);
    } else {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`,
      );
    }
  }