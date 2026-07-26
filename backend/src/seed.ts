import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear existing data (adjust order based on foreign key constraints)
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  // Add other model clears as needed

  // Generate Users
  const users = [];
  const userCount = 15;
  for (let i = 0; i < userCount; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email({ firstName: user.name.split(' ')[0], lastName: user.name.split(' ')[1] }),
        password: faker.internet.password({ length: 10 }),
        role: faker.helpers.arrayElement(['ADMIN', 'USER', 'MODERATOR']),
        createdAt: faker.date.past({ years: 2 }),
        updatedAt: faker.date.recent({ days: 7 }),
      },
    });
    users.push(user);
  }
  console.log(`Created ${users.length} users`);

  // Generate Posts
  const posts = [];
  const postCount = 50;
  for (let i = 0; i < postCount; i++) {
    const author = faker.helpers.arrayElement(users);
    const post = await prisma.post.create({
      data: {
        title: faker.lorem.sentence({ min: 5, max: 10 }),
        content: faker.lorem.paragraphs({ min: 3, max: 6 }),
        published: faker.datatype.bool({ probability: 0.8 }),
        authorId: author.id,
        createdAt: faker.date.past({ years: 1 }),
        updatedAt: faker.date.recent({ days: 3 }),
      },
    });
    posts.push(post);
  }
  console.log(`Created ${posts.length} posts`);

  // Generate Comments
  const commentCount = 200;
  for (let i = 0; i < commentCount; i++) {
    await prisma.comment.create({
      data: {
        content: faker.lorem.sentences({ min: 1, max: 3 }),
        postId: faker.helpers.arrayElement(posts).id,
        authorId: faker.helpers.arrayElement(users).id,
        createdAt: faker.date.recent({ days: 5 }),
      },
    });
  }
  console.log(`Created ${commentCount} comments`);

  // Example: Generate Categories (if applicable)
  // const categories = [];
  // const categoryNames = ['Technology', 'Science', 'Health', 'Sports', 'Arts'];
  // for (const name of categoryNames) {
  //   const cat = await prisma.category.create({ data: { name } });
  //   categories.push(cat);
  // }
  // console.log(`Created ${categories.length} categories`);

  // Example: Add post-category relations (if applicable)
  // for (const post of posts) {
  //   const postCategories = faker.helpers.arrayElements(categories, faker.number.int({ min: 1, max: 3 }));
  //   for (const cat of postCategories) {
  //     await prisma.postCategory.create({
  //       data: { postId: post.id, categoryId: cat.id },
  //     });
  //   }
  // }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });