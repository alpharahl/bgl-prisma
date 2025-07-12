The app is a NextJS 15 application..
Since it's nextjs 15 all params and search params must be promises.

We use async server applications whenever possible.

We use server actions whenever we need to use calls from the client side apps.

We use the app router.

The app uses prisma, and the schema file is in the prisma folder /prisma/schema.prisma. Load this in as context if dealing with the database.

We also use typescript and tailwindcss everywhere.

We use next auth beta of v5 for authentication
You can access the user object server side with `const session = await auth();` and `import {auth} from "@/auth";`

The <main> section must have a min-h-screen class to ensure it's tall enough to fill the viewport.

We componentize aggressively, and we keep files in their app folder. For instance a client form would exist alongside the server rendered page.tsx file.

We have a way to determine if someone is an admin with the isAdmin file in the lib folder.

We use formik and yup for forms and validation.