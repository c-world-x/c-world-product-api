import { faker } from "@faker-js/faker";
import { Prisma, Product } from "@prisma/client";

export function createRandomProduct(index: number): Prisma.ProductUncheckedCreateInput {
  return {
    id: index,
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 100, max: 1000 }),
    slug: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    quantity: faker.number.int({ min: 100, max: 1000 }),

    coverImage: faker.image.avatar(),
  };
}

const NUMBER_OF_PRODUCTS = 10;
const PRODUCT_SEEDS: Prisma.ProductUncheckedCreateInput[] = [];

for (let i = 1; i <= NUMBER_OF_PRODUCTS; i++) {
  PRODUCT_SEEDS.push(createRandomProduct(i));
}

export default PRODUCT_SEEDS;

export async function seedProducts(prisma) {
  for (const product of PRODUCT_SEEDS) {
    await prisma.product.upsert({
      where: {
        id: product.id || undefined,
      },
      update: product as Product,
      create: product as Product,
    });
  }
}
