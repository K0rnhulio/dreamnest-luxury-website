import Image from "next/image";
import Link from "next/link";
import Posts from "./components/Posts";
import StrapiConnectionTest from "./components/StrapiConnectionTest";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full flex flex-col items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Next.js + Strapi CMS</h1>
        <p className="text-gray-600">A simple example of integrating Next.js with Strapi CMS</p>
        
        <nav className="mt-4">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link href="/landing" className="text-blue-600 hover:text-blue-800 font-medium">
                Landing Page
              </Link>
            </li>
            <li>
              <Link href="/dreamnest" className="text-blue-600 hover:text-blue-800 font-medium">
                DreamNest
              </Link>
            </li>
            <li>
              <a href="http://localhost:1337/admin" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                Strapi Admin
              </a>
            </li>
          </ul>
        </nav>
      </header>
      
      <main className="w-full max-w-7xl mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Strapi Connection Status</h2>
          <StrapiConnectionTest />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Latest Posts from Strapi</h2>
          <Posts />
        </section>
        
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Getting Started</h2>
          <ol className="list-inside list-decimal text-sm/6 space-y-2">
            <li className="tracking-[-.01em]">
              Edit content in Strapi at{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                http://localhost:1337/admin
              </code>
            </li>
            <li className="tracking-[-.01em]">
              Create content types in Strapi (Posts, Hero, Services, etc.)
            </li>
            <li className="tracking-[-.01em]">
              Add content in Strapi and it will appear on your website
            </li>
            <li className="tracking-[-.01em]">
              Visit the <Link href="/landing" className="text-blue-600 hover:underline">Landing Page</Link> to see how content from Strapi is displayed
            </li>
            <li className="tracking-[-.01em]">
              Check out the <Link href="/dreamnest" className="text-blue-600 hover:underline">DreamNest</Link> project with luxury minimalist design
            </li>
          </ol>
        </section>
      </main>
      
      <footer className="w-full flex gap-[24px] flex-wrap items-center justify-center mt-8">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js Docs
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://docs.strapi.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Strapi Docs
        </a>
      </footer>
    </div>
  );
}
