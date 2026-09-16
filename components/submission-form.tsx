"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { FileUpload, type UploadedFile } from "@/components/file-upload"
import type { Submission } from "@/lib/types"
import { Award, DollarSign, Info } from "lucide-react"

interface SubmissionFormProps {
  onSubmit: (submission: Partial<Submission>) => void
}

const categories = [
  {
    id: "logo-design",
    name: "Logo Design",
    description: "Corporate and institutional logos",
    fee: 25,
    requirements: ["Vector format required", "Multiple color variations", "Usage guidelines"],
  },
  {
    id: "brand-identity",
    name: "Brand Identity",
    description: "Complete brand identity systems",
    fee: 50,
    requirements: ["Logo variations", "Color palette", "Typography", "Brand guidelines"],
  },
  {
    id: "poster-design",
    name: "Poster Design",
    description: "Event and promotional posters",
    fee: 20,
    requirements: ["High resolution", "Print-ready format", "Cultural relevance"],
  },
  {
    id: "digital-graphics",
    name: "Digital Graphics",
    description: "Web and social media graphics",
    fee: 15,
    requirements: ["Multiple sizes", "Web-optimized", "Responsive design"],
  },
  {
    id: "government-assets",
    name: "Government Assets",
    description: "Official government visual materials",
    fee: 0,
    requirements: ["Official approval", "Compliance standards", "Accessibility"],
  },
]

export function SubmissionForm({ onSubmit }: SubmissionFormProps) {
  const [formData, setFormData] = useState({
    // Entrant information
    name: "",
    email: "",
    organization: "",
    country: "Somaliland",
    phone: "",

    // Submission details
    category: "",
    title: "",
    description: "",
    inspiration: "",
    tools_used: [] as string[],

    // Legal
    terms_accepted: false,
    copyright_confirmed: false,
    original_work: false,

    // Files
    files: [] as UploadedFile[],
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const selectedCategory = categories.find((cat) => cat.id === formData.category)
  const isGovernmentSubmission = formData.category === "government-assets"

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleToolToggle = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      tools_used: prev.tools_used.includes(tool)
        ? prev.tools_used.filter((t) => t !== tool)
        : [...prev.tools_used, tool],
    }))
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.country
      case 2:
        return formData.category && formData.title && formData.description
      case 3:
        return formData.files.length > 0 && formData.files.every((f) => f.status === "completed")
      case 4:
        return formData.terms_accepted && formData.copyright_confirmed && formData.original_work
      default:
        return false
    }
  }

  const handleSubmit = () => {
    const submission: Partial<Submission> = {
      entrant: {
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
        country: formData.country,
      },
      category: formData.category,
      entry_fee_paid: selectedCategory?.fee === 0 || false, // Auto-paid for free categories
      metadata: {
        title: formData.title,
        description: formData.description,
        inspiration: formData.inspiration,
        tools_used: formData.tools_used,
      },
      status: "pending",
      submitted_at: new Date().toISOString(),
    }

    onSubmit(submission)
  }

  const commonTools = [
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Figma",
    "Sketch",
    "Canva",
    "InDesign",
    "CorelDRAW",
    "Procreate",
    "Blender",
    "After Effects",
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Submit Your Design</h2>
            <Badge variant="outline">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className={`flex-1 h-2 rounded ${i + 1 <= currentStep ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </div>
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => handleInputChange("organization", e.target.value)}
                  placeholder="Company, agency, or institution"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Somaliland">Somaliland</SelectItem>
                    <SelectItem value="Somalia">Somalia</SelectItem>
                    <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                    <SelectItem value="Djibouti">Djibouti</SelectItem>
                    <SelectItem value="Kenya">Kenya</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+252 XX XXX XXXX"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Category & Project Details */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </div>
                Category & Project Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Select Category *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <Card
                      key={category.id}
                      className={`cursor-pointer transition-all ${
                        formData.category === category.id ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"
                      }`}
                      onClick={() => handleInputChange("category", category.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{category.name}</h4>
                          <div className="flex items-center gap-1">
                            {category.fee > 0 ? (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />${category.fee}
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Free</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                        <div className="space-y-1">
                          <p className="text-xs font-medium">Requirements:</p>
                          {category.requirements.map((req, index) => (
                            <p key={index} className="text-xs text-muted-foreground">
                              • {req}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {selectedCategory && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Give your design a compelling title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe your design concept, goals, and key features..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inspiration">Inspiration & Context</Label>
                    <Textarea
                      id="inspiration"
                      value={formData.inspiration}
                      onChange={(e) => handleInputChange("inspiration", e.target.value)}
                      placeholder="What inspired this design? How does it relate to Somaliland culture or values?"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tools Used</Label>
                    <div className="flex flex-wrap gap-2">
                      {commonTools.map((tool) => (
                        <Badge
                          key={tool}
                          variant={formData.tools_used.includes(tool) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleToolToggle(tool)}
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedCategory && selectedCategory.fee > 0 && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Entry Fee Required</h4>
                    <p className="text-sm text-amber-700">
                      This category requires an entry fee of ${selectedCategory.fee}. Payment will be processed in the
                      final step.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Step 3: File Upload */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                3
              </div>
              Upload Design Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload onFilesChange={(files) => handleInputChange("files", files)} maxFiles={5} maxSize={10} />
            {selectedCategory && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Category Requirements:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {selectedCategory.requirements.map((req, index) => (
                    <li key={index}>• {req}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 4: Terms & Submission */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                4
              </div>
              Terms & Submission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.terms_accepted}
                  onCheckedChange={(checked) => handleInputChange("terms_accepted", checked)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I accept the{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms and Conditions
                  </a>{" "}
                  and
                  <a href="/privacy" className="text-primary hover:underline ml-1">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="copyright"
                  checked={formData.copyright_confirmed}
                  onCheckedChange={(checked) => handleInputChange("copyright_confirmed", checked)}
                />
                <Label htmlFor="copyright" className="text-sm leading-relaxed">
                  I confirm that I own all rights to this design or have proper authorization to submit it
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="original"
                  checked={formData.original_work}
                  onCheckedChange={(checked) => handleInputChange("original_work", checked)}
                />
                <Label htmlFor="original" className="text-sm leading-relaxed">
                  This is original work and does not infringe on any existing copyrights or trademarks
                </Label>
              </div>
            </div>

            {selectedCategory && selectedCategory.fee > 0 && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Entry Fee</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedCategory.name} - ${selectedCategory.fee}
                      </p>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />${selectedCategory.fee}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Submission Summary</h4>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Category:</strong> {selectedCategory?.name}
                </p>
                <p>
                  <strong>Title:</strong> {formData.title}
                </p>
                <p>
                  <strong>Files:</strong> {formData.files.length} uploaded
                </p>
                <p>
                  <strong>Entry Fee:</strong> {selectedCategory?.fee === 0 ? "Free" : `$${selectedCategory?.fee}`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        {currentStep < totalSteps ? (
          <Button onClick={() => setCurrentStep((prev) => prev + 1)} disabled={!canProceedToNext()}>
            Next Step
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!canProceedToNext()} className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Submit Entry
          </Button>
        )}
      </div>
    </div>
  )
}
