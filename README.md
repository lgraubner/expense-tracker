# Expense tracker

## Todo

- disable browser input validation
- add offline page

### later

- Statistics
- view transitions
- self manage categories
  - put icons in svg sprite
- email verification
- password reset
- expense detail view
  - add vaul
  - delete entry
    - uid for expense (for detail view?)
- pick date
- load more in timeline
- shallow routing stuff

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

# run seeds
pnpm prisma db seed
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
