"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", submissions: 45, revenue: 2400 },
  { name: "Feb", submissions: 52, revenue: 1398 },
  { name: "Mar", submissions: 38, revenue: 9800 },
  { name: "Apr", submissions: 65, revenue: 3908 },
  { name: "May", submissions: 48, revenue: 4800 },
  { name: "Jun", submissions: 72, revenue: 3800 },
]

export function AnalyticsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{ background: "#1B5E20", color: "#fff", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
              />
              <Bar dataKey="revenue" fill="#1B5E20" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Submissions Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#1B5E20", color: "#fff", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
              />
              <Line type="monotone" dataKey="submissions" stroke="#CFA93F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
