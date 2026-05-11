import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categoryNames = ["Dairy", "Vegetables", "Fruits", "Grains", "Protein"];
  for (const name of categoryNames) {
    const existing = await prisma.category.findFirst({ where: { category: name } });
    if (!existing) {
      await prisma.category.create({ data: { category: name } });
    }
  }

  await prisma.organization.upsert({
    where: { phone: "7201111111" },
    create: {
      federalId: "77-7777777",
      isNonprofit: true,
      logoUrl: "https://mealizeaa.s3.amazonaws.com/mealize-l.png",
      imageUrl: "https://mealizeaa.s3.amazonaws.com/mealize-b.png",
      hoursOpen: "5:00",
      hoursClose: "22:30",
      timeslot: "Morning",
      name: "Mealize",
      description:
        "A nonprofit organization that aims to connect food businesses to nonprofits like food banks!",
      street: "1225 17th St",
      zip: "80202",
      city: "Denver",
      state: "Colorado",
      phone: "7201111111",
      email: "help_desk@mealize.us",
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
