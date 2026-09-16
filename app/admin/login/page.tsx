"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setAdminAuth } from "@/lib/store"
import { Award, Lock, Eye, EyeOff } from "lucide-react"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate auth delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (password === "admin2026") {
      setAdminAuth(true)
      router.push("/admin")
    } else {
      setError("Incorrect password. Try: admin2026")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1B5E20]/5 via-background to-[#CFA93F]/5 p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-up">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex items-center justify-center mx-auto shadow-lg">
            <Award className="h-7 w-7 text-white" />
          </div>
          <h1 className="font-heading text-2xl">Somaliland Brand Awards</h1>
          <p className="text-muted-foreground text-sm">Admin Portal — Restricted Access</p>
        </div>

        <Card className="border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              Admin Sign In
            </CardTitle>
            <CardDescription>Enter your administrator password to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Admin Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-[#1B5E20] hover:bg-[#2E7D32] text-white"
                disabled={loading || !password}
              >
                {loading ? "Verifying..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Republic of Somaliland — Official Government Platform
        </p>
      </div>
    </div>
  )
}
