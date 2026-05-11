-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "federalId" VARCHAR(11) NOT NULL,
    "isNonprofit" BOOLEAN NOT NULL,
    "logoUrl" VARCHAR(2048) NOT NULL,
    "imageUrl" VARCHAR(2048) NOT NULL,
    "open" VARCHAR(20) NOT NULL,
    "close" VARCHAR(20) NOT NULL,
    "timeslot" VARCHAR(35) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "zip" VARCHAR(18) NOT NULL,
    "city" VARCHAR(17) NOT NULL,
    "state" VARCHAR(12) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "isNonprofit" BOOLEAN NOT NULL,
    "isManager" BOOLEAN NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "dob" DATE NOT NULL,
    "deaf" BOOLEAN,
    "wheelchair" BOOLEAN,
    "learningDisabled" BOOLEAN,
    "lgbtq" BOOLEAN,
    "profileImageUrl" VARCHAR(2048) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendars" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "open" TIMESTAMP(3) NOT NULL,
    "close" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calendars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isClosed" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "imageUrl" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_boards" (
    "id" SERIAL NOT NULL,
    "user_one" INTEGER NOT NULL,
    "user_two" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_boards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "isItem" BOOLEAN NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "description" VARCHAR(120) NOT NULL,
    "quantity" VARCHAR(12) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "imageUrl" VARCHAR(2048) NOT NULL,
    "expDate" DATE NOT NULL,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watchlists" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER,
    "userId" INTEGER,
    "ip" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watchlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveries" (
    "id" SERIAL NOT NULL,
    "isDropoff" BOOLEAN NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "businessId" INTEGER NOT NULL,
    "nonprofitId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "time" TEXT NOT NULL,
    "completed" INTEGER NOT NULL,
    "cancellationReason" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "boardId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "postId" INTEGER,
    "content" VARCHAR(500) NOT NULL,
    "imageUrl" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_phone_key" ON "organizations"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkId_key" ON "users"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendars" ADD CONSTRAINT "calendars_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_boards" ADD CONSTRAINT "message_boards_user_one_fkey" FOREIGN KEY ("user_one") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_boards" ADD CONSTRAINT "message_boards_user_two_fkey" FOREIGN KEY ("user_two") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlists" ADD CONSTRAINT "watchlists_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlists" ADD CONSTRAINT "watchlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_nonprofitId_fkey" FOREIGN KEY ("nonprofitId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "message_boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
