import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input id="site-name" defaultValue="Somaliland Visual Assets Library" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input id="contact-email" defaultValue="info@somalilandassets.gov.sl" />
            </div>
            <Button className="mt-4">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
