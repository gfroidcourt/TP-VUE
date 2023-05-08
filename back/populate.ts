const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    if (await prisma.producers.count() === 0) {
        const firstproducer = await prisma.producers.create({
            data: {
                firstName: 'Tim',
                lastName: 'Burton',
                nationality: 'américain',
                birthDate: '1958-08-25',
            }
        });

        const secondproducer = await prisma.producers.create({
            data: {
                firstName: 'Christopher',
                lastName: 'Nolan',
                nationality: 'britannique',
                birthDate: '1970-07-30',
            }
        });
    }

    if (await prisma.movies.count() === 0) {
        const movie = await prisma.movies.create({
            data: {
                title: "L'étrange noël de M. Jack",
                releaseDate: "1994",
                genre: "animation",
                synopsis:
                    "Jack Skellington, un épouvantail squelettique surnommé « le Roi des citrouilles » (Pumpkin King en version originale), vit dans la ville d'Halloween. En tant que maître de l'épouvante, Jack occupe ses journées à préparer la prochaine fête d'Halloween.",
                producerId: 1,
            },
        });

        const secondMovie = await prisma.movies.create({
            data: {
                title: "Interstellar",
                releaseDate: "2014",
                genre: "science-fiction",
                synopsis:
                    "Dans un futur proche, face à une Terre exsangue, un groupe d'explorateurs utilise un vaisseau interstellaire pour franchir un trou de ver permettant de parcourir des distances jusque-là infranchissables.",
                producerId: 2,
            },
        });
    }
}

main()
    .catch(async (e) => console.error(e))
    .finally(async () => await prisma.$disconnect());