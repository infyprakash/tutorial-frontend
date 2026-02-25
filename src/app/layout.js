import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from 'next/font/google';
import Footer from "./ui/footer";
import { FaTwitter, FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

import AdSense from "./components/adsense";
import GoogleAnalytics from "./components/googleanalytics";

import "./globals.css";
import Navbar from "./ui/navbar";
import { SidebarProvider } from "./contexts/SidebarContext";
import { NecSidebarProvider } from "./contexts/NecSidebarContext";
import { getSession } from "./auth/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Added '500' for medium emphasis in UI elements
  style: ['normal', 'italic'],   // Included italics for code comments/emphasis
  display: 'swap',
  variable: '--font-poppins',
  fallback: ['system-ui', 'sans-serif'], // Explicit fallbacks reduce layout shift
});


export const metadata = {
  title: {
    default: "EzExplanation - Easy Tutorials for Engineering & Technology Students",
    template: "%s | EzExplanation"
  },
  description:
    "EzExplanation provides easy-to-understand tutorials, notes, MCQs, and exam preparation materials for Engineering, Computer Science, and Technology students. Learn faster with structured courses and clear explanations.",

  keywords: [
    "engineering tutorials",
    "computer science notes",
    "technology tutorials",
    "MCQ practice",
    "exam preparation",
    "programming tutorials",
    "data science tutorials",
    "Nepal engineering study materials"
  ],

  metadataBase: new URL("https://ezexplanation.com"),

  openGraph: {
    title: "EzExplanation - Engineering & Technology Tutorials Made Simple",
    description:
      "Structured tutorials, solved MCQs, and exam-focused learning resources for Engineering and Computer Science students.",
    url: "https://ezexplanation.com",
    siteName: "EzExplanation",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "EzExplanation - Learn Engineering the Smart Way",
    description:
      "Explore high-quality tutorials, notes, and MCQs for Computer Science and Engineering students.",
  },

  robots: {
    index: true,
    follow: true,
  },

  authors: [{ name: "EzExplanation Team" }],
};

export default async function RootLayout({ children }) {
  const session = await getSession()
  const isLoggedIn = !!session?.token

  const footerColumns = [
    // {
    //   title: 'Product',
    //   links: [
    //     { label: 'Features', href: '/features' },
    //     { label: 'Pricing', href: '/pricing' },
    //     { label: 'FAQ', href: '/faq' },
    //   ],
    // },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        // { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    // {
    //   title: 'Legal',
    //   links: [
    //     { label: 'Privacy', href: '/privacy' },
    //     { label: 'Terms', href: '/terms' },
    //   ],
    // },
  ];

  const socialLinks = [
    // { platform: 'Twitter', href: 'https://twitter.com/yourcompany', icon: <FaTwitter /> },
    { platform: 'Facebook', href: 'https://www.facebook.com/easyexplanation26', icon: <FaFacebook /> },
    { platform: 'LinkedIn', href: 'https://www.linkedin.com/company/ezexplanation/', icon: <FaLinkedin /> },
  ];

  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <NecSidebarProvider>
          <SidebarProvider>
            <Navbar isLoggedIn={isLoggedIn} />
            <GoogleAnalytics />

            {children}

            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2413501485945953"
              crossorigin="anonymous"></script>
            <div className="max-w-7xl mx-auto px-4 py-8">
              <AdSense />
            </div>

            <Footer
              logo="/ezexplanation_logo.png"   // Use your actual logo path
              columns={footerColumns}
              socialLinks={socialLinks}
              copyright={`© ${new Date().getFullYear()} Infography Technologies. All rights reserved.`}
            />
          </SidebarProvider>
        </NecSidebarProvider>
      </body>
    </html>
  );
}
