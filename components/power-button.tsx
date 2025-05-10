"use client"

import { Power } from "lucide-react"
import { useRouter } from "next/navigation"

const PowerButton = () => {
  const router = useRouter()

  const handlePowerOff = () => {
    // Store the current URL to return to after powering back on
    if (typeof window !== "undefined") {
      localStorage.setItem("powerOffRedirect", window.location.pathname)
    }
    router.push("/powered-off")
  }

  return (
    <button
      onClick={handlePowerOff}
      className="text-gray-800 hover:text-red-600 transition-colors duration-300"
      aria-label="Power off"
    >
      <Power size={20} />
    </button>
  )
}

export default PowerButton
