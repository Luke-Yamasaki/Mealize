# PoC: run the Next.js app in `web/`. Build with real Clerk keys for production.
# docker build -t mealize-web .
# docker run -p 3000:3000 -e DATABASE_URL=... -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=... -e CLERK_SECRET_KEY=... mealize-web

FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY web/package.json web/package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY web/ .
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_build_placeholder
ARG CLERK_SECRET_KEY=sk_test_build_placeholder
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
RUN npx prisma generate && npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.ts ./
EXPOSE 3000
CMD ["npm", "run", "start"]
