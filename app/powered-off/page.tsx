"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function PoweredOffPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [bootMessages, setBootMessages] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const CORRECT_PASSWORD = "lovergirl"

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Show hint after 5 seconds
    const timer = setTimeout(() => {
      setShowHint(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Handle the loading progress bar
  useEffect(() => {
    if (isLoading && loadingProgress < 100) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          // Random increments to make it feel more authentic
          const increment = Math.floor(Math.random() * 5) + 1
          return Math.min(prev + increment, 100)
        })
      }, 120)

      return () => clearInterval(interval)
    }
  }, [isLoading, loadingProgress])

  // Add boot messages as loading progresses
  useEffect(() => {
    if (isLoading) {
      const bootSequence = [
        { message: "Initializing system...", threshold: 5 },
        { message: "Powering up heart.exe...", threshold: 20 },
        { message: "Loading love letters...", threshold: 45 },
        { message: "Checking emotional bandwidth...", threshold: 60 },
        // { message: "Mounting drives...", threshold: 60 },
        { message: "Establishing network connection...", threshold: 80 },
        // { message: "Loading personal data...", threshold: 85 },
        { message: "System ready. Missed you, sweetie.", threshold: 95 },
      ]

      bootSequence.forEach(({ message, threshold }) => {
        if (loadingProgress >= threshold && !bootMessages.includes(message)) {
          setBootMessages((prev) => [...prev, message])
        }
      })

      // Redirect when loading is complete
      if (loadingProgress === 100) {
        let redirectPath = typeof window !== "undefined" ? localStorage.getItem("powerOffRedirect") || "/" : "/"

        // In production, ensure the path includes the base path
        const base = process.env.NODE_ENV === 'production' ? '/art_portfolio' : '';
        if (base && !redirectPath.startsWith(base)) {
          redirectPath = redirectPath === '/' ? base + '/' : base + redirectPath;
        }

        // Small delay after reaching 100% before redirecting
        setTimeout(() => {
          router.push(redirectPath)
        }, 1000)
      }
    }
  }, [isLoading, loadingProgress, bootMessages, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password.toLowerCase() === CORRECT_PASSWORD) {
      setIsLoading(true)
      // The redirect happens after loading completes
    } else {
      setError(true)
      setTimeout(() => setError(false), 1000)
      setPassword("")
    }
  }

  return (
    <div className="fixed inset-0 bg-black text-green-500 flex flex-col items-center justify-center z-50 text-lg">
      <div className="w-full max-w-md p-8 relative">
        {!isLoading ? (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-xl mb-4">SYSTEM POWERED OFF</h1>
              <p className="opacity-70 ">Enter password to restart</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className={`border-b-2 ${error ? "border-red-500" : "border-green-500"} w-full mb-6`}>
                <input
                  ref={inputRef}
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent w-full py-2 px-3 focus:outline-none text-center"
                  placeholder="password"
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                className="border-2 border-green-500 py-2 px-6 hover:bg-green-500 hover:text-black transition-colors"
              >
                POWER ON
              </button>
            </form>

            {/* Sticky note with password hint */}
            {showHint && (
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-yellow-200 text-black p-4 rotate-12 shadow-lg transform transition-all duration-500 ease-in-out">
                <div className="w-full h-full flex items-center justify-center flex-col">
                  <p className="text-sm font-handwritten">password:</p>
                  <p className="text-lg font-handwritten font-bold">lovergirl</p>
                  <p className="text-xs mt-4 font-handwritten">don&apos;t forget!</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full">
            <h2 className="text-xl mb-8 text-center">SYSTEM BOOTING</h2>

            {/* Retro loading bar */}
            <div className="w-full h-6 border-2 border-green-500 mb-8 relative overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${loadingProgress}%`, transition: "width 0.1s ease-in-out" }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-xs text-black font-bold">{loadingProgress}%</span>
              </div>
            </div>

            {/* Boot messages */}
            <div className="text-sm font-mono border border-green-900 p-2 bg-black">
              {bootMessages.map((message, index) => (
                <div key={index} className="mb-1">
                  <span className="text-green-300">&gt; </span>
                  <span>{message}</span>
                </div>
              ))}
              {/* Blinking cursor */}
              <div className="flex items-center">
                <span className="text-green-300">&gt; </span>
                <span className="w-2 h-4 bg-green-500 animate-pulse"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {!isLoading && (
        <div className="absolute bottom-4 left-4 text-xs opacity-50">
          <p>* Press any key to continue...</p>
        </div>
      )}
    </div>
  )
}
