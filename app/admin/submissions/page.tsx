import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockSubmissions } from "@/lib/mock-data"
import { MoreHorizontal, Check, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminSubmissionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Submissions</h2>
        <p className="text-muted-foreground">Manage and review award submissions.</p>
      </div>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Entrant</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.id}</TableCell>
                <TableCell>{submission.metadata.title}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{submission.entrant.name}</span>
                    <span className="text-xs text-muted-foreground">{submission.entrant.organization}</span>
                  </div>
                </TableCell>
                <TableCell>{submission.category}</TableCell>
                <TableCell>{submission.scorecard.total_score}/100</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      submission.status === "approved"
                        ? "default"
                        : submission.status === "rejected"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {submission.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>View files</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-green-600">
                        <Check className="mr-2 h-4 w-4" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <X className="mr-2 h-4 w-4" />
                        Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
