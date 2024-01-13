# package.json cache
FROM node:20.10.0-bullseye-slim as deps

WORKDIR /tmp

COPY package.json ./

# Install deps
FROM node:20.10.0-bullseye-slim AS tmp

WORKDIR /app/tmp

# Copy and install dependencies separately from the app's code
# to leverage Docker's cache when no dependency has changed
COPY --from=deps /tmp ./
COPY pnpm-lock.yaml  ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . /app/tmp

ARG PUBLIC_APP_URL

RUN pnpm svelte-kit sync && pnpm prisma generate && pnpm run build

RUN rm -rf src

RUN pnpm prune --prod

# Final image
FROM node:20.10.0-bullseye-slim as web

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*

ENV PORT=3000
ENV NODE_ENV=production

USER node

WORKDIR /app

COPY --from=tmp --chown=node:node /app/tmp/package.json /app
COPY --from=tmp --chown=node:node /app/tmp/node_modules /app/node_modules
COPY --from=tmp --chown=node:node /app/tmp/build /app/build
# needed for migration task
COPY --from=tmp --chown=node:node /app/tmp/prisma /app/prisma

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "build/index.js"]
