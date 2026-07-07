"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ComicsRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace("/comic") }, [router])
  return null
}
