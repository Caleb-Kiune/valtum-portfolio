import { ProjectCaseStudy } from "@/lib/types/project";
import ecoPlains from "@/assets/projects/eco-plains-safaris.png";
import kentab from "@/assets/projects/kentab-insurance-agency.png";
import happyFeet from "@/assets/projects/happy-happy-feet.png";

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "eco-plains",
    slug: "eco-plains-safaris",
    title: "Eco Plains Safaris",
    tag: "Conservation Tourism",
    subtitle: "Luxury Eco-Tourism Platform",
    heroImage: ecoPlains,
    client: "Eco Plains Safaris Ltd.",
    role: "Frontend Developer",
    timeline: "2026",
    stack: ["React 19", "React Router 7", "Framer Motion", "Lenis", "Cloudinary"],
    challenge: [
      "In the crowded market of East African tourism, Eco Plains Safaris needed to bridge the gap between luxury travel and sustainable conservation. Existing digital platforms were often generic, failing to convey the premium, emotive experience of an eco-conscious safari adventure.",
      "The primary technical hurdle was balancing visual richness with performance. High-end tourism relies on stunning, high-resolution imagery to sell the dream, but traditional heavy assets would compromise the sub-second load times required for mobile-first travelers.",
      "Furthermore, trust is the currency of luxury booking. The platform needed to transition visitors from passive admiration to active inquiry seamlessly, removing the friction between 'dreaming' and 'booking' without feeling like a hard sales push."
    ],
    solution: [
      "I engineered a custom React 19 application centered around `immersive motion`. By leveraging Framer Motion and Lenis, I created a 'weighty', cinematic scroll experience that feels less like a website and more like an interactive documentary, guiding the user through the narrative.",
      "To solve the performance paradox, I integrated a Cloudinary optimization pipeline. This dynamic media layer automatically serves next-gen formats (AVIF/WebP) tailored to the user's bandwidth, ensuring that 4K wildlife photography loads instantly even on safari-lodge Wi-Fi.",
      "Finally, I dismantled the traditional booking form barrier by integrating a context-aware WhatsApp booking engine. This 'Direct-to-Agent' flow empowers high-intent leads to start a conversation instantly, increasing conversion rates by simplifying the path to purchase."
    ],


    liveUrl: "https://eco-plains-safaris.vercel.app",
    repoUrl: "https://github.com/Caleb-Kiune/eco-plains-safaris",
    technicalHighlights: [
      "Orchestrated a cinematic scroll experience using Lenis and Framer Motion, treating the DOM like a fluid canvas to guide user attention.",
      "Implemented an automated Cloudinary pipeline that serves format-optimized (AVIF/WebP) assets based on client bandwidth for sub-second load times.",
      "Engineered a context-aware 'Direct-to-Agent' booking bridge that bypasses traditional forms to convert high-intent traffic directly via WhatsApp."
    ]
  },
  {
    id: "kentab",
    slug: "kentab-insurance",
    title: "Kentab Insurance Agency",
    tag: "FinTech / InsurTech",
    subtitle: "FinTech / InsurTech Solution",
    heroImage: kentab,
    client: "Kentab Insurance",
    role: "Full-Stack Developer",
    timeline: "2025",
    stack: ["Next.js 14", "TypeScript", "Zod", "Nodemailer"],
    challenge: [
      "Traditionally, getting an insurance quote in Kenya involves endless phone calls and manual paperwork. Kentab Insurance Agency needed to digitize this friction-filled process, but faced a cultural hurdle: trust. Users were skeptical of online forms for financial products.",
      "The technical challenge was building a 'Smart Quote Engine' that could handle complex underwriting logic in real-time. I needed to validate multi-step inputs instantly without overwhelming the user with a massive single-page form.",
      "Speed was also non-negotiable. In a mobile-first market where data bundles are precious, the application needed to load and function with sub-second latency, ensuring that a user could get a quote before they lost interest."
    ],
    solution: [
      "I built a mobile-first Next.js 14 application that prioritizes speed. By utilizing Server-Side Rendering (SSR), I ensured that landing pages load instantly, maximizing SEO visibility and user retention.",
      "To solve trust issues, I implemented a Zod-powered multi-step form. This architecture validates data schema-by-schema, providing instant feedback while strictly sanitizing inputs.",
      "Instead of opaque email chains, I engineered a Logic Engine that instantly synthesizes a structured summary. The moment a quote is calculated, the user sees an actionable breakdown decision-making tool, reducing the 'Time-to-Clarity' from hours to seconds."
    ],


    liveUrl: "https://kentab-six.vercel.app",
    repoUrl: "https://github.com/Caleb-Kiune/kentab",
    technicalHighlights: [
      "Architected a schema-first validation layer using Zod to sanitize complex underwriting inputs in real-time, preventing invalid data submission.",
      "Leveraged Next.js Server-Side Rendering (SSR) to achieve sub-800ms Time-to-Interactive (TTI), critical for the bandwidth-constrained local market.",
      "Built a client-side Logic Engine that instantly synthesizes multi-variable quote data into an actionable summary, removing the need for server round-trips."
    ]
  },
  {
    id: "happy-feet",
    slug: "happy-happy-feet",
    title: "Happy Happy Feet",
    tag: "E-Commerce",
    subtitle: "Modern E-Commerce Experience",
    heroImage: happyFeet,
    client: "Happy Happy Feet",
    role: "Full-Stack Developer",
    timeline: "2025",
    stack: ["Next.js 15", "Supabase", "Tailwind v4", "Framer Motion"],
    challenge: [
      "Happy Happy Feet required a modern e-commerce experience that didn't feel like a generic template. The goal was to combine the visual polish of a high-end fashion brand with the gritty, practical reality of 'WhatsApp-first' commerce in the region.",
      "A major friction point was the checkout process. Traditional payment gateways often lead to cart abandonment in this specific market. The client needed a flow that bridged the gap between a digital cart and a personal conversation.",
      "Performance was also critical. With a visually rich catalog of footwear, I risked slow load times. I needed a way to display high-fidelity product grids that felt instant and fluid, mirroring the responsiveness of a native app."
    ],
    solution: [
      "I engineered a 'Hybrid Commerce' model using Next.js 15 and Supabase. I leveraged Supabase's real-time capabilities to manage inventory state, ensuring that when a customer browses a limited-stock item, the availability is accurate to the millisecond.",
      "To tackle the checkout friction, I developed a 'WhatsApp Bridge'. Instead of a complex payment form, the cart compiles the order into a structured WhatsApp message. This one-click action transfers the context to a human agent, boasting a significantly higher closing rate.",
      "For the frontend, I adopted Tailwind CSS v4 and Framer Motion. This allowed me to create a 'textural' UI with subtle micro-interactions—like floating buttons and smooth page transitions—that elevate the perceived value of the brand."
    ],


    liveUrl: "https://happy-happy-feet.vercel.app",
    repoUrl: "https://github.com/Caleb-Kiune/Happy-Happy-Feet",
    technicalHighlights: [
      "Established a real-time inventory sync using Supabase Subscriptions to prevent overselling high-demand items during active browsing sessions.",
      "Developed a 'Hybrid Commerce' checkout flow that compiles complex cart state into structured metadata for seamless off-platform completion.",
      "Utilized Tailwind CSS v4 and layout preservation strategies to create native-app-like transitions between product grids and detail views."
    ]
  }
];
