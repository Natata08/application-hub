# Application Hub Project

It consists of two packages:

- `api` which is a NodeJS project using Express for the API
- `frontend` which is Next.js project for building the web application

### Using Two VS Code Windows for `api/` and `frontend`

Open `api/` and `frontend/` in separate VS Code windows to ensure extensions like ESLint work correctly, as our monorepo setup has individual `package.json` files for each folder.

### Setting Up Custom Git Hooks

To ensure that the custom Git hooks are used in this repository, you need to configure your Git client to point to the `.githooks` directory for hooks. Follow these steps:

1. **Clone the Repository (if you haven't already):**

   ```bash
   git clone git@github.com:FurkannOzbek/application-hub.git
   ```

2. **Configure Git to Use the Custom Hook Directory:**
   After cloning the repository or pulling the latest changes, run the following command to configure Git to use the `.githooks` directory for Git hooks:

   ```bash
   git config core.hooksPath .githooks
   ```

   This command sets the `core.hooksPath` configuration to the `.githooks` folder, so Git will automatically use the custom hooks, including the pre-commit hook defined in `.githooks/pre-commit`.

3. **Verify the Configuration (Optional):**
   To verify that the hooks directory is set correctly, you can run:

   ```bash
   git config --get core.hooksPath
   ```

   This should return `.githooks`.

4. **Running the Pre-Commit Hook:**
   Now, whenever you make a commit, the `pre-commit` hook stored in the `.githooks` directory will be executed automatically. If any issues are found (such as linting errors or code formatting issues), the commit will be aborted, and you’ll be prompted to fix the issues.

#### Important Notes:

- If you're setting up this repository on a new machine, don't forget to run the `git config core.hooksPath .githooks` command after cloning the repository.

## Prerequisites

This project assumes that there is a database already set up with tables and data.

1. Pull the PostgreSQL Docker Image:
   Open your terminal and run the following command to pull the latest PostgreSQL image:

   ```bash
   docker pull postgres:latest
   ```

2. Run the PostgreSQL Container
   You can start a PostgreSQL instance using Docker with the below commands:

   ```bash
   docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 -v pgdata:/var/lib/postgresql/data postgres:latest
   ```

3. Create the Database:
   Connect to the running PostgreSQL container:

   ```bash
   docker exec -it my-postgres psql -U postgres -d postgres
   ```

   In the psql shell, create the app_hub_db_local database:

   `CREATE DATABASE app_hub_db_local;`

   Exit the psql shell:

   ```bash
   \q
   ```

4. Apply the Schema:
   Copy your schema.sql file into the running container:

   ▪ Unix-based systems:

   ```bash
   docker cp /path/to/your/schema.sql my-postgres:/schema.sql
   ```

   ▪ Windows:

   ```bash
   docker cp "/path/to/your/schema.sql" my-postgres:\schema.sql
   ```

   Replace /path/to/your/schema.sql with the actual path to your schema.sql file. For example: "C:/Users/yourname/Desktop/schema.sql"

   Execute the SQL script to set up the database schema:

   ▪ Unix-based systems:

   ```bash
   docker exec -it my-postgres psql -U postgres -d app_hub_db_local -f /schema.sql
   ```

   ▪ Windows:

   ```bash
   docker exec -it my-postgres psql -U postgres -d app_hub_db_local -f \schema.sql
   ```

5. Verify the Setup:
   Connect to your PostgreSQL database to verify the setup:

   ```bash
   docker exec -it my-postgres psql -U postgres -d app_hub_db_local
   ```

   Once connected, you can run SQL queries to check the contents of your tables:

   ```bash
   \dt -- List all tables
   ```

6. Configure Backend Environment Variables:
   Create a .env file in the api/ directory with the following content:

   ```
   DB_CLIENT=pg
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=mysecretpassword
   DB_DATABASE_NAME=app_hub_db_local
   DB_USE_SSL=false
   DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/app_hub_db_local?sslmode=disable
   ```

7. Configure Frontend Environment Variables:
   Create a .env.local file in the frontend/ directory with the following content:

   `NEXT_PUBLIC_API_URL=http://localhost:3001/api`

8. Run Application:
   Start an application and verify that you can register a new user and add a new application job.

## Getting started

> Before you start, make sure no other projects are running, in order to have the ports free.

To get started you'll need two terminals.

In the first terminal run the following commands:

```
cd api
cp .env-example .env
npm install
npm run dev
```

You can then test the API using [Postman](https://www.postman.com/) at [http://localhost:3001/api](http://localhost:3001/api).
![Testing the API with Postman](./images/api_test.png)

In the second terminal run the following commands:

```
cd app
npm install
npm run dev
```

You can then open the web app at [http://localhost:3000](http://localhost:3000).
![Testing the app with a browser](./images/app_test.png)

```

```
