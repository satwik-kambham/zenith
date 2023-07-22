# Zenith

## Setup Instructions (Local Development)
1. Copy contents of .env.example to .env
2. Fill in api keys in .env
3. Run docker container for postgres using the command:
```bash
docker run -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

or if using podman
```bash
podman run -e POSTGRES_PASSWORD=password -p 5432:5432 -d docker.io/library/postgres
```
4. Add database URL in the following format to .env
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```
5. Update schema using the following command:
```bash
npx prisma migrate dev --name init
```
6. Run using the following command:
```bash
npm run dev
```
7. Head to [http://localhost:3000](http://localhost:3000)
