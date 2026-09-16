"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { isAdminAuthed } from "@/lib/store"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Allow access to the login page without auth
    if (pathname === "/admin/login") {
      setChecking(false)
      return
    }

    if (!isAdminAuthed()) {
      router.replace("/admin/login")
    } else {
      setChecking(false)
    }
  }, [pathname, router])

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Verifying access...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/10 lg:flex-row">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>
      <div className="flex-1 overflow-auto p-4 lg:p-8">{children}</div>
    </div>
  )
}
