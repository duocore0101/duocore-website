# NexSys Portfolio & Billing Platform

A modern, scalable SaaS-style platform featuring a futuristic dark AI theme, built for software consulting firms. It includes a public-facing portfolio and a secure backend administration dashboard for managing clients, quotations, and invoices.

## Technologies Used
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui, Framer Motion
- **Database/Auth:** Supabase (PostgreSQL)
- **PDF Generation:** jsPDF + jspdf-autotable
- **Charts:** Recharts

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase Environment Variables
Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase Project Settings > API.

### 3. Database Migration
In the root directory, you will find `supabase_schema.sql`.
1. Go to your Supabase Dashboard.
2. Navigate to the SQL Editor.
3. Paste the contents of `supabase_schema.sql` and click **Run**.
This will set up all required tables (clients, quotations, invoices, items) and Row Level Security policies.

### 4. Running the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to see the public website.
Navigate to `http://localhost:3000/admin/login` to access the Admin Dashboard.

## Features

**Public Website**
- Animated Hero, Services Overview, Project Showcase, Testimonials, Contact.
- Dynamic responsive grids and glassmorphism UI.

**Admin Dashboard**
- Protected route middleware using Supabase Auth.
- **Client Management:** Comprehensive list and modal forms for adding clients.
- **Quotation System:** Dynamic quote maker with instant calculations, line items, and PDF download in a customized dark theme.
- **Billing System:** Invoice generation, import from quotes, mark as paid/unpaid, and PDF exports.
- **Analytics:** Visual overview using Recharts for revenue tracking.

## Deployment on Vercel
1. Push your code to GitHub.
2. Import the project in Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` inside Vercel Environment Variables.
4. Click Deploy. Next.js will automatically optimize standard build components.
