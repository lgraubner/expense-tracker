# Expense tracker

## Development

```
# make sure to start docker container
docker compose up -d

# start dev server
pnpm run dev
```

## Database handling

```
# sync schema and client
pnpm prisma generate

# sync database schema locally
pnpm prisma db push

# create migration
pnpm prisma migrate dev --name migration_name

# run migrations locally
pnpm prisma migrate dev

# reset local database
pnpm prisma migrate reset

# access local databsae
docker compose exec db mariadb -uroot -ppassword db

# access remote db (on server)
dokku mariadb:connect expense-tracker-db

# run seeds
pnpm prisma db seed
```

## Environment variables

### Static

To add a new environment variable which injected on build do this:

```
# on dokku server
dokku docker-options:add expense-tracker-web build '--build-arg PUBLIC_APP_URL'
dokku config:set expense-tracker-web PUBLIC_APP_URL="https://et.larsgraubner.de"
```

Additionally it has to be added the the `Dockefile` file with `ARG
PUBLIC_APP_URL`.

You might need to add this to Github to ensure Github Actions run through.

### Dynamic (runtime)

```
# on dokku server

# add variable
dokku config:set expense-tracker-web MY_SECRET=secret

# remove variable
dokku config:unset expense-tracker-web MY_SECRET
```

## Deployment

```
# create new deployment
git push dokku main

# run checks and deploy
pnpm run deploy
```

## Misc

```
# update dependencies
pnpm update --interactive --latest
```
