"use client"

import { useState, useEffect } from "react"
import { WeddingStore } from "@/lib/weddings/store"
import { WeddingEventPlan, EventTask, EventExpense } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  DollarSign,
  CheckCircle2,
  ListTodo,
  Clock,
  Download,
  Plus,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"

interface EventPlannerProps {
  lang?: "so" | "en"
}

export function EventPlannerWorkspace({ lang = "so" }: EventPlannerProps) {
  const t = TRANSLATIONS[lang]
  const [plan, setPlan] = useState<WeddingEventPlan>(WeddingStore.getEventPlan())
  const [newTaskTitle, setNewTaskTitle] = useState("")

  useEffect(() => {
    setPlan(WeddingStore.getEventPlan())
  }, [])

  const handleToggleTask = (taskId: string) => {
    const updated = WeddingStore.toggleTask(taskId)
    setPlan(updated)
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newTask: EventTask = {
      id: `task-${Date.now()}`,
      titleEn: newTaskTitle,
      titleSo: newTaskTitle,
      category: "logistics",
      dueDate: "2026-12-10",
      assignedTo: "Couple",
      isCompleted: false,
    }

    const updatedPlan: WeddingEventPlan = {
      ...plan,
      tasks: [...plan.tasks, newTask],
    }
    setPlan(updatedPlan)
    if (typeof window !== "undefined") {
      localStorage.setItem("m2_sl_weddings_plan_v1", JSON.stringify(updatedPlan))
    }
    setNewTaskTitle("")
  }

  const completedCount = plan.tasks.filter((t) => t.isCompleted).length
  const progressPercent = Math.round((completedCount / plan.tasks.length) * 100) || 0

  const totalActualSpend = plan.expenses.reduce((acc, curr) => acc + curr.actualUsd, 0)
  const remainingBudget = plan.totalBudgetUsd - totalActualSpend

  const exportPlanData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(plan, null, 2))
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `somaliland-wedding-plan-${plan.id}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return (
    <div className="space-y-8">
      {/* Header Overview Card */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold">
              <Sparkles className="h-3 w-3" />
              <span>{lang === "so" ? "Qorshaha Arooska ee Hargeysa" : "Hargeisa Wedding Plan"}</span>
            </div>
            <h2 className="text-xl font-bold font-heading">{plan.coupleNames}</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-amber-600" />
                {plan.eventDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-amber-600" />
                {plan.guestCount} {lang === "so" ? "Marti ah" : "Guests"}
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                ${plan.totalBudgetUsd.toLocaleString()} USD Budget
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportPlanData}
              className="text-xs h-9 gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{lang === "so" ? "Degso Qorshaha (JSON)" : "Export Plan"}</span>
            </Button>
          </div>
        </div>

        {/* Progress tracker */}
        <div className="mt-6 pt-6 border-t space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span>
              {completedCount} / {plan.tasks.length} {t.completedTasks}
            </span>
            <span className="font-bold text-amber-600">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2 bg-muted" />
        </div>
      </div>

      {/* Tabs navigation */}
      <Tabs defaultValue="budget" className="space-y-6">
        <TabsList className="grid grid-cols-3 max-w-md h-9 text-xs">
          <TabsTrigger value="budget" className="text-xs">
            {t.tabBudget}
          </TabsTrigger>
          <TabsTrigger value="tasks" className="text-xs">
            {t.tabTasks}
          </TabsTrigger>
          <TabsTrigger value="runsheet" className="text-xs">
            {t.tabRunSheet}
          </TabsTrigger>
        </TabsList>

        {/* Budget Tab */}
        <TabsContent value="budget" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
              <div className="text-xs text-muted-foreground">{t.totalBudget}</div>
              <div className="text-2xl font-bold font-heading mt-1">${plan.totalBudgetUsd.toLocaleString()}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">~{(plan.totalBudgetUsd * 8500).toLocaleString()} SL Sh</div>
            </div>

            <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
              <div className="text-xs text-muted-foreground">{t.actualSpent}</div>
              <div className="text-2xl font-bold font-heading mt-1 text-amber-600">${totalActualSpend.toLocaleString()}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{Math.round((totalActualSpend / plan.totalBudgetUsd) * 100)}% of total budget</div>
            </div>

            <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
              <div className="text-xs text-muted-foreground">{t.remainingBudget}</div>
              <div className="text-2xl font-bold font-heading mt-1 text-emerald-600">${remainingBudget.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-0.5">On budget track</div>
            </div>
          </div>

          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <div className="p-4 border-b font-semibold text-sm">
              {lang === "so" ? "Qaybaha Miisaaniyadda & Shirkadaha" : "Expense Breakdown & Vendors"}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted text-muted-foreground border-b font-semibold">
                  <tr>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Allocated (USD)</th>
                    <th className="p-3.5">Actual Spend</th>
                    <th className="p-3.5">Vendor</th>
                    <th className="p-3.5 text-right">Payment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {plan.expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-muted/40 transition-colors">
                      <td className="p-3.5 font-medium">
                        {lang === "so" ? exp.categorySo : exp.categoryEn}
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        ${exp.allocatedUsd.toLocaleString()}
                      </td>
                      <td className="p-3.5 font-bold">
                        ${exp.actualUsd.toLocaleString()}
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        {exp.vendorName || "—"}
                      </td>
                      <td className="p-3.5 text-right">
                        <Badge
                          variant={exp.isPaid ? "default" : "outline"}
                          className={`text-[10px] ${
                            exp.isPaid
                              ? "bg-emerald-600 text-white hover:bg-emerald-700"
                              : "text-amber-700 dark:text-amber-400 border-amber-600/30"
                          }`}
                        >
                          {exp.isPaid ? (lang === "so" ? "WAA LA BIXIYAY" : "PAID") : (lang === "so" ? "QARASH SUGAYA" : "PENDING")}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <form onSubmit={handleAddTask} className="flex gap-2">
            <Input
              placeholder={lang === "so" ? "Ku qor hawl cusub (tusaale: 'Xaqiiji keega arooska')..." : "Add new wedding checklist item..."}
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="text-xs h-9"
            />
            <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs h-9 shrink-0 gap-1">
              <Plus className="h-4 w-4" />
              <span>{t.addTask}</span>
            </Button>
          </form>

          <div className="rounded-xl border bg-card shadow-sm divide-y">
            {plan.tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => handleToggleTask(task.id)}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={task.isCompleted}
                    onCheckedChange={() => handleToggleTask(task.id)}
                    className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                  />
                  <div>
                    <div
                      className={`text-xs font-medium ${
                        task.isCompleted ? "line-through text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {lang === "so" ? task.titleSo : task.titleEn}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {lang === "so" ? "Mas'uul:" : "Assigned:"} {task.assignedTo} · {task.dueDate}
                    </div>
                  </div>
                </div>

                <Badge variant="outline" className="text-[10px] uppercase">
                  {task.category}
                </Badge>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Run Sheet Tab */}
        <TabsContent value="runsheet" className="space-y-4">
          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <div className="p-4 border-b font-semibold text-sm flex items-center justify-between">
              <span>{lang === "so" ? "Jadwalka Saacadaha ee Maalinta Arooska" : "Minute-by-Minute Wedding Day Schedule"}</span>
              <span className="text-xs text-muted-foreground">Coordinator Run Sheet</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted text-muted-foreground border-b font-semibold">
                  <tr>
                    <th className="p-3.5 w-32">Time (EAT)</th>
                    <th className="p-3.5">Activity & Protocol</th>
                    <th className="p-3.5 text-right w-40">Responsible Lead</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {plan.runSheet.map((item, idx) => (
                    <tr key={idx} className="hover:bg-muted/40 transition-colors">
                      <td className="p-3.5 font-mono font-semibold text-amber-700 dark:text-amber-400">
                        {item.time}
                      </td>
                      <td className="p-3.5 font-medium text-foreground">
                        {lang === "so" ? item.activitySo : item.activityEn}
                      </td>
                      <td className="p-3.5 text-right text-muted-foreground">
                        {item.responsible}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
