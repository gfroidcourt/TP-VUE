import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';

const router = Router();
export const prisma = new PrismaClient();

/**
 * Returns all the movies from the db
 */
router.get('/movies', async (req: Request, res: Response) => {
  const movies = await prisma.movies.findMany({
    include: {
      producer: true,
    }
  });
  res.json(movies);
});

/**
 * Returns a movie from the db
 */
router.get('/movies/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = await prisma.movies.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      producer: true,
    }
  });
  res.json(movie);
});

/**
 * Returns all the producers from the db
 */
router.get('/producers', async (req: Request, res: Response) => {
  const producers = await prisma.producers.findMany();
  res.json(producers);
});

/**
 * Returns a producer from the db
 */
router.get('/producers/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const producer = await prisma.producers.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(producer);
});


router.post('/movies', async (req: Request, res: Response) => {
  const { title, synopsis, releaseDate, genre, producer } = req.body;
  // Format string to date
  const movie = await prisma.movies.create({
    data: {
      title,
      synopsis,
      releaseDate,
      genre,
      producer,
    },
  });
  res.json(movie);
});

router.post('/producers', async (req: Request, res: Response) => {
  const { firstName, lastName, nationality, birthDate, Movies } = req.body;
  const producer = await prisma.producers.create({
    data: {
      firstName,
      lastName,
      nationality,
      birthDate,
      Movies,
    },
  });
  res.json(producer);
});

router.put('/movies/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, synopsis, releaseDate, genre, producerId } = req.body;
  const movie = await prisma.movies.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      releaseDate,
      synopsis,
      genre,
      producerId
    },
  });
  res.json(movie);
});

router.put('/producers/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, nationality, birthDate, Movies } = req.body;
  const producer = await prisma.producers.update({
    where: {
      id: Number(id),
    },
    data: {
      firstName,
      lastName,
      nationality,
      birthDate,
      Movies,
    },
  });
  res.json(producer);
});

router.delete('/movies/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = await prisma.movies.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(movie);
});

router.delete('/producers/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const producer = await prisma.producers.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(producer);
});




export default router;