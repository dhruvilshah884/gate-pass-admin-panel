import Cors from 'nextjs-cors';

export default async function handler(req:any, res:any) {
  await Cors(req, res, {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  res.json({ message: 'CORS enabled on Vercel API using nextjs-cors' });
}
