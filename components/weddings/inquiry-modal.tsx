"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { WeddingStore } from "@/lib/weddings/store"
import { Provider, ProviderPackage } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { CheckCircle2, Send, Clock, Calendar, Users, DollarSign } from "lucide-react"

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
  provider: Provider
  packageItem?: ProviderPackage
  lang?: "so" | "en"
}

export function InquiryModal({ isOpen, onClose, provider, packageItem, lang = "so" }: InquiryModalProps) {
  const t = TRANSLATIONS[lang]

  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [guestCount, setGuestCount] = useState(packageItem?.guestCapacityLimit ? String(packageItem.guestCapacityLimit) : "400")
  const [customNotes, setCustomNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const created = WeddingStore.createInquiry({
        providerId: provider.id,
        providerName: lang === "so" ? provider.businessNameSo : provider.businessNameEn,
        customerName,
        customerEmail,
        customerPhone,
        eventType: "wedding",
        eventDate: eventDate || "2026-12-25",
        eventLocation: provider.city + " (" + provider.district + ")",
        estimatedGuestCount: parseInt(guestCount) || 400,
        packageId: packageItem?.id,
        packageName: packageItem ? (lang === "so" ? packageItem.titleSo : packageItem.titleEn) : "Custom Package Inquiry",
        customNotes,
        quotedPriceUsd: packageItem ? packageItem.priceUsd : undefined,
      })

      setIsSubmitting(false)
      setSubmittedInquiryId(created.id)
    }, 600)
  }

  const handleReset = () => {
    setSubmittedInquiryId(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <DialogContent className="sm:max-w-lg">
        {submittedInquiryId ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center">
                {t.formSuccessTitle}
              </DialogTitle>
              <DialogDescription className="text-center text-sm">
                {t.formSuccessDesc}
              </DialogDescription>
            </DialogHeader>

            <div className="p-4 rounded-lg bg-muted text-left text-xs space-y-2 border">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Inquiry ID:</span>
                <span className="font-mono font-bold">{submittedInquiryId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Provider:</span>
                <span className="font-semibold">{lang === "so" ? provider.businessNameSo : provider.businessNameEn}</span>
              </div>
              {packageItem && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Selected Package:</span>
                  <span>{lang === "so" ? packageItem.titleSo : packageItem.titleEn} (${packageItem.priceUsd})</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-amber-600 font-semibold uppercase">Inquiry Submitted</span>
              </div>
            </div>

            <Button onClick={handleReset} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
              {lang === "so" ? "Xir / Dib ugu noqo" : "Done / Return to Directory"}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                {t.inquiryModalTitle}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {t.inquiryModalDesc}
              </DialogDescription>
            </DialogHeader>

            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
              <div className="font-semibold">
                {lang === "so" ? provider.businessNameSo : provider.businessNameEn}
              </div>
              {packageItem && (
                <div className="mt-0.5 text-muted-foreground">
                  {lang === "so" ? packageItem.titleSo : packageItem.titleEn} — <span className="font-bold text-foreground">${packageItem.priceUsd} USD</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="custName" className="text-xs">{t.formName} *</Label>
                <Input
                  id="custName"
                  required
                  placeholder="e.g. Sahra Ismail"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="custPhone" className="text-xs">{t.formPhone} *</Label>
                <Input
                  id="custPhone"
                  required
                  placeholder="+252 63 ..."
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="custEmail" className="text-xs">{t.formEmail} *</Label>
                <Input
                  id="custEmail"
                  type="email"
                  required
                  placeholder="sahra@example.sl"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="eventDate" className="text-xs">{t.formEventDate} *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="guestCount" className="text-xs">{t.formGuests}</Label>
              <Input
                id="guestCount"
                type="number"
                placeholder="400"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes" className="text-xs">{t.formNotes}</Label>
              <Textarea
                id="notes"
                rows={3}
                placeholder="Waxyaabo gaar ah oo aad doonayso in shirkaddu xisaabta ku darsato..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose} className="text-xs">
                {lang === "so" ? "Ka noqo" : "Cancel"}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white gap-1.5 text-xs font-semibold"
              >
                <Send className="h-3.5 w-3.5" />
                {isSubmitting ? (lang === "so" ? "Waa la dirayaa..." : "Sending...") : t.formSubmitBtn}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
