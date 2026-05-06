import prisma from '../lib/prisma';

async function main() {
  const product1 = await prisma.product.create({
    data: {
      name: 'T-shirt Next.js',
      description: 'T-shirt 100% coton',
      price: 19.99,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Mug TypeScript',
      description: 'Mug en céramique 350ml',
      price: 14.5,
    },
  });

  const cart = await prisma.cart.create({
    data: {
      userId: 'demo-user-id',
      items: {
        create: [
          { productId: product1.id, quantity: 2 },
          { productId: product2.id, quantity: 1 },
        ],
      },
    },
  });

  console.log('Panier créé avec id :', cart.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });