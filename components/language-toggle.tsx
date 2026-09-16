"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const [language, setLanguage] = useState<"en" | "so">("en")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "so" : "en"))
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center gap-2">
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{language === "en" ? "SO" : "EN"}</span>
    </Button>
  )
}
