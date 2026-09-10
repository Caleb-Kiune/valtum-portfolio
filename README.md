# Kiune Technologies | Caleb Kiune

**High-performance digital infrastructure for modern businesses.**

This repository contains the source code for the personal portfolio and business website of **Caleb Kiune**. It serves as a bridge between operational discipline and software engineering, showcasing a suite of production-ready applications built for the FinTech and Insurance sectors.

Designed for speed, accessibility, and visual impact.

**Live Deployment:** [calebkiune.vercel.app](https://calebkiune.vercel.app)

---

## Tech Stack

A production-grade stack optimized for performance (Core Web Vitals) and developer experience.

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Core** | [React 19](https://react.dev/) & TypeScript |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & CSS Modules |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) & React Icons |
| **Validation** | [Zod](https://zod.dev/) & React Hook Form |
| **Deployment** | Vercel Edge Network |

---

## Key Features

*   **Progressive Web App (PWA)**: Installable as a standalone app on mobile and desktop devices (Manifest V3).
*   **Performance First**: Sub-100ms interaction latency and consistent 60fps animations.
*   **Scroll-Linked Animations**: Custom scroll reveal effects and parallax headers using Framer Motion.
*   **Responsive Design**: Mobile-first architecture that scales seamlessly to 4K displays.
*   **Contact Integration**: Direct API integration with [Web3Forms](https://web3forms.com/) for serverless form handling.
*   **SEO Optimized**: Semantic HTML5 structure, dynamic metadata, and OpenGraph integration.

---

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

*   Node.js 18+
*   npm or pnpm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Caleb-Kiune/caleb-kiune-portfolio.git
    cd caleb-kiune-portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables**
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Project Structure

```text
src/
├── app/                  # Next.js App Router root
│   ├── globals.css       # Global Tailwind directives
│   ├── layout.tsx        # Root layout & font configuration
│   └── page.tsx          # Homepage composition
├── components/
│   ├── layout/           # Header, Footer, and Wrappers
│   ├── sections/         # Feature components (Hero, About, Projects)
│   └── ui/               # Reusable primitives (Buttons, Badges)
├── lib/
│   ├── constants/        # Static data files
│   └── utils.ts          # Helper functions (cn, formatters)
└── assets/               # Static images and icons
```

---

## Contact

**Caleb Kiune**
*   **Email:** [calebkiune@gmail.com](mailto:calebkiune@gmail.com)
*   **WhatsApp:** [+254 705 774 171](https://wa.me/254705774171)
*   **LinkedIn:** [Caleb Kiune](https://www.linkedin.com/in/caleb-kiune-b356a6327/)

---

© 2026 Kiune Technologies. All Rights Reserved.
