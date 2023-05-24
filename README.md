To run the app:

1. Install the dependencies:

```bash
cd front/
npm install
```

2. Run the frontend:

```bash
npm run dev
```

3. Populate the database:

```bash
   cd back/
   npm i
   node populate.ts
```

# Using Docker

4. Add an API_PORT variable to the .env file to the back folder:

```bash
cd back/
echo "API_PORT=PORT" >> .env
```

5. Change the API_BASE_URL in the Api.js in the front folder:

```bash
cd front/
const API_BASE_URL = "http://localhost:PORT";
```

6. Run the backend:

```bash
cd back/
npm i
docker compose build
docker compose up
```

# Without Docker

4. Run the backend:

```bash
cd back/
npm run start
```