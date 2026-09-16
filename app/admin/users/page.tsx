import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button>Add User</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <div className="p-4 bg-muted rounded-full">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">User management coming soon</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              This module will allow you to manage admin access, jury roles, and user permissions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
