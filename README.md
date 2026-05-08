# 🎓 Skill Bridge — Frontend

> A modern tutoring marketplace where students book learning sessions, tutors manage their schedules and earnings, and knowledge flows seamlessly — from booking to payment.

---

## 🎯 Problem Statement

Students struggle to **find qualified tutors and book sessions easily**, while tutors lack a platform to **showcase their expertise, set availability, and get paid reliably**. Traditional tutoring lacks transparency, flexibility, and a smooth digital experience.

---

## 💡 Solution Overview

**Skill Bridge** is a full-featured tutoring platform that enables:
- Students to browse, book, and pay for tutoring sessions
- Tutors to create profiles, set availability, and manage bookings
- Admins to oversee the entire platform ecosystem
- A clear session lifecycle: **Book → Learn → Complete → Pay**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI Components | shadcn/ui |
| Styling | Tailwind CSS |
| Animation / UI Polish | Sera UI |
| Runtime | Bun |
| Auth | JWT (via backend API) |
| State / Data Fetching | React Query / fetch |

---

## ✨ Key Features

- 🔐 **Three-Role System** — Separate dashboards for Admin, Tutor, and Student
- 📅 **Session Booking** — Students browse tutors and book available time slots
- ✅ **Session Lifecycle** — Track session status: Pending → Confirmed → Completed
- 💳 **Payment After Completion** — Students pay only after a session is completed
- 👨‍🏫 **Tutor Profiles** — Tutors build profiles with subjects, bio, and hourly rate
- 🗓️ **Availability Management** — Tutors set and update their weekly availability
- 📊 **Role Dashboards** — Dedicated management panels per user role
- 🌐 **Responsive Design** — Optimized for desktop and mobile

---

## 🖥️ Screenshots

> Add screenshots or GIFs here after deployment.

```
/screenshots
  ├── homepage.png
  ├── tutor-listing.png
  ├── booking-flow.png
  ├── student-dashboard.png
  ├── tutor-dashboard.png
  └── admin-dashboard.png
```

---

## 🚀 Live Demo

🔗 **Live URL:** [https://skill-bridge-front-end.vercel.app](https://skill-bridge-front-end.vercel.app)

### Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@skill-bridge.com | 12345678 |
| Tutor | tutor@skill-bridge.com | 12345678 |
| Student | student@skill-bridge.com | 12345678 |

---

## ⚙️ Setup Instructions

### Prerequisites

- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`)
- Node.js 18+ (optional fallback)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/skill-bridge-frontend.git
cd skill-bridge-frontend

# Install dependencies
bun install

# Start development server
bun dev
```

The app will run at `http://localhost:3000`

### Build for Production

```bash
bun run build
bun start
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
BACKEND_URL=https://your-backend-api.com
```

> ⚠️ Never commit `.env.local` to version control.

---

## 🗂️ Project Structure

```
skill-bridge-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── admin/
│   │   ├── tutor/
│   │   │   ├── profile/
│   │   │   ├── availability/
│   │   │   └── sessions/
│   │   └── student/
│   │       ├── bookings/
│   │       └── payments/
│   ├── tutors/
│   │   ├── [id]/
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── shared/          # Reusable components
│   ├── booking/         # Booking flow components
│   └── dashboard/       # Role-specific dashboard components
├── lib/
│   ├── api.ts           # API helper functions
│   └── auth.ts          # Auth utilities
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

---

## 🔗 Related Repository

- **Backend API:** [skill-bridge-backend](https://github.com/your-username/skill-bridge-backend)

---

## 📄 License

This project is licensed under the MIT License.
