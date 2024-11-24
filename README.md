# Introduction
This project is a technical test based on [this repository](https://github.com/starred-com/starred-case).

You can access a live version here [starred-test.vercel.app](https://starred-test.vercel.app/).

# Installation

## Requirements
- Node >= 18.18.0
- npm >= 9.3.0
- PostGreSQL database
- SMTP server 
- valid email

1. Create `.env` file from `.env.example`
2. Install dependencies: `npm install`
3. Run project: `npm run dev`
4. Project runs on `localhost:3000` 

# Features
The project is a basic listing of jobs from a provided API.

Main features include:
- Authentication with magic link
- Listing jobs
- Filter jobs from their title
- Navigate among jobs with pagination
- View job details
- Add/remove a job from favorites
- Logout

## API endpoints
- `GET` `/api/jobs` list all jobs
- `PATCH` `/api/jobs/fav/:jobId` add/remove job to favorites

# Tech used

- **TypeScript** for type-safe environment
- **Next.JS** for easy app deployment and hosting on Vercel.
- **Vercel** + **Supabase** for hosting
- **Prisma** for database ORM
- **TailwindCSS** + **shadcn** for styling

# Next steps
- Handle filter by favorite jobs
- Responsive design for mobile
- Error management (frontend & backend)
- Data validation (using Zod for instance)
- Frontend cache management (using React Query for example)
- Go to first/last page
- Unit testing
- Custom magic link email
- Custom home + signin pages
- Branding
- Dockerization to locally launch the project easily
- Linter + formatter
