"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import LoginForm from "@/components/login-form"
import TodoApp from "@/components/todo-app"

export default function Home() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated in local storage
    const storedAuth = localStorage.getItem("isAuthenticated")
    if (storedAuth === "true" && !isAuthenticated) {
      router.refresh()
    }
  }, [isAuthenticated, router])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto">{isAuthenticated ? <TodoApp /> : <LoginForm />}</div>
    </main>
  )
}

