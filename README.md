# 🏥 Anthropic Healthcare — Frontend

> A modern healthcare marketplace where patients book doctor appointments, doctors manage their schedules and earnings, and healthcare flows seamlessly — from booking to payment.

---

## 🎯 Problem Statement

Patients struggle to **find qualified doctors and book appointments easily**, while doctors lack a platform to **showcase their expertise, set availability, and get paid reliably**. Traditional healthcare booking lacks transparency, flexibility, and a smooth digital experience.

---

## 💡 Solution Overview

**Anthropic Healthcare** is a full-featured healthcare platform that enables:
- Patients to browse, book, and pay for doctor appointments
- Doctors to create profiles, set availability, and manage bookings
- Admins to oversee the entire platform ecosystem
- A clear appointment lifecycle: **Book → Consult → Complete → Pay**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI Components | shadcn/ui |
| Styling | Tailwind CSS |
| Animation / UI Polish | Sera UI |
| Runtime | Bun |
| Auth | BetterAuth (via backend API) |
| State / Data Fetching | React Query / fetch |

---

## ✨ Key Features

- 🔐 **Three-Role System** — Separate dashboards for Admin, Doctor, and Patient
- 📅 **Appointment Booking** — Patients browse doctors and book available time slots
- ✅ **Appointment Lifecycle** — Track appointment status: Pending → Confirmed → Completed
- 💳 **Payment After Completion** — Patients pay only after an appointment is completed
- 👨‍⚕️ **Doctor Profiles** — Doctors build profiles with specialties, bio, and consultation fee
- 🗓️ **Availability Management** — Doctors set and update their weekly availability
- 📊 **Role Dashboards** — Dedicated management panels per user role
- 🌐 **Responsive Design** — Optimized for desktop and mobile

---

## 🖥️ Screenshots

> Add screenshots or GIFs here after deployment.

```
/screenshots
  ├── homepage.png
  ├── doctor-listing.png
  ├── booking-flow.png
  ├── patient-dashboard.png
  ├── doctor-dashboard.png
  └── admin-dashboard.png
```

---

## 🚀 Live Demo

🔗 **Live URL:** [https://anthropic-healthcare.vercel.app](https://anthropic-healthcare.vercel.app)

### Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@anthropic.com | 12345678 |
| Doctor | doctor@anthropic.com | 12345678 |
| Patient | patient@anthropic.com | 12345678 |

---

## ⚙️ Setup Instructions

### Prerequisites

- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`)
- Node.js 18+ (optional fallback)

### Installation

```bash
# Clone the repository
git clone https://github.com/mahmud-reza-rafsun/anthropic-healthcare-frontend.git
cd anthropic-healthcare-frontend

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
anthropic-healthcare-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── admin/
│   │   ├── doctor/
│   │   │   ├── profile/
│   │   │   ├── availability/
│   │   │   └── bookings/
│   │   └── patient/
│   │       ├── bookings/
│   │       └── payments/
│   ├── doctors/
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

- **Backend API:** [anthropic-healthcare-backend](https://github.com/mahmud-reza-rafsun/anthropic-healthcare-backend)

---

## 📄 License

This project is licensed under the MIT License.
