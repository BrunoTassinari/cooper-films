until nc -z -v -w30 db 5432
do
  echo "Waiting for database connection..."
  sleep 1
done

echo "Running migrations..."
npx prisma migrate dev --name init

echo "Seeding database..."
npx prisma db seed 

echo "Starting server..."
npm run dev
