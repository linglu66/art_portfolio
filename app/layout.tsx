'use client'

import type React from "react"
import { ArrowRight } from "lucide-react"

import PowerButton from "@/components/power-button"
import Link from "next/link"
import "./globals.css"
import FrameAnimation from "@/components/frame-animation"
import Marquee from "react-fast-marquee"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-mono text-lg overflow-hidden">
    <div className="flex flex-col min-h-screen font-mono  ">
       {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-3 border-b border-gray-200 bg-white z-10">
        <div>ling.OS</div>
        <div>
          {new Date()
            .toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
            .replace(/^./, c => c.toLowerCase())}
        </div>
        <div className="flex items-center gap-4">
              <div className="w-6 h-4 border border-gray-800 rounded-sm relative">
                <div className="absolute right-0.5 top-0.5 bottom-0.5 w-3/4 bg-gray-800"></div>
              </div>
              <PowerButton />
            </div>
      </header>
      <div className="fixed top-[48px] w-full bg-black text-white overflow-hidden whitespace-nowrap z-20">
          <Marquee gradient={false} speed={50} >
            <span className="white">i dont know what i am &nbsp;&nbsp;&nbsp; but i am here, and so are you &nbsp;&nbsp;&nbsp;</span>
          </Marquee>
      </div>


      <div className="flex flex-1 pt-16">
        {/* Fixed Sidebar */}
        <aside className="fixed pt-1 top-16 left-0 bottom-0 w-[210px] border-r border-gray-200 bg-white z-10 overflow-y-auto flex flex-col justify-between">
          <nav className="p-4 space-y-4">
            <div className="py-2">
              <Link href="/" className="hover:underline"> home </Link>
            </div>
            
            <div className="py-2">
              <Link href="/shop" className="hover:underline"> shop </Link>
            </div>

            <div className="py-2">
              <Link href="/about" className="hover:underline"> ??? </Link>
            </div>

            {/* <div className="border border-gray-300 rounded-md p-4 relative mt-8">
              <p className="pr-8">
               ???
              </p>
              shifty arrow
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Link
                href="/about"
                className="inline-flex items-center transition-transform hover:translate-x-2"
              >
                <ArrowRight size={18} />
              </Link>
                
              </div>
            </div> */}

{/* TODO: leave a note */}
            {/* <div className="border border-gray-300 rounded-md p-4 relative flex items-center">
              <div className="w-12 h-12 mr-2">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  width={48}
                  height={48}
                  alt="Notebook icon"
                  className="opacity-80"
                />
              </div>
              <p>leave a note</p>
              <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                <div className="flex">
                  {Array.from({ length: 80 }).map((_, i) => (
                    <div key={i} className="w-0.5 h-0.5 bg-gray-800 mx-0.5"></div>
                  ))}
                </div>
              </div>
            </div> */}
          </nav>

          <a href="/about" className="block pb-4">
              <FrameAnimation
                image1="/images/anim/me1.png"
                image2="/images/anim/me2.png" 
                image3="/images/anim/me3.png" 
              />
          </a>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-[210px] overflow-y-auto h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
    </body>
    </html>
  )
}