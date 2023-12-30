# Expense tracker

## Todo

- PWA stuff

### later

- pick date
- delete entry
  - uid for expense (for detail view?)
- load more in timeline
- shallow routing stuff
- Statistics
- desktop version: move plus next to heading
- admin area manage categories
- self manage categories
- email verification
- password reset

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
```

## Deployment

```
# create new deployment
git push dokku main
```

## Misc

```
# update dependencies
pnpm update --interactive --latest
```
