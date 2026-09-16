"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, type File, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFilesChange: (files: UploadedFile[]) => void
  maxFiles?: number
  acceptedTypes?: string[]
  maxSize?: number // in MB
}

export interface UploadedFile {
  id: string
  file: File
  preview?: string
  status: "uploading" | "completed" | "error"
  progress: number
  error?: string
}

export function FileUpload({
  onFilesChange,
  maxFiles = 5,
  acceptedTypes = ["image/*", ".svg", ".ai", ".eps", ".pdf"],
  maxSize = 10,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        status: "uploading",
        progress: 0,
      }))

      // Simulate upload progress
      newFiles.forEach((uploadedFile) => {
        const interval = setInterval(() => {
          setFiles((prev) =>
            prev.map((f) => {
              if (f.id === uploadedFile.id) {
                const newProgress = Math.min(f.progress + Math.random() * 30, 100)
                const isComplete = newProgress >= 100
                return {
                  ...f,
                  progress: newProgress,
                  status: isComplete ? "completed" : "uploading",
                }
              }
              return f
            }),
          )
        }, 200)

        setTimeout(() => {
          clearInterval(interval)
          setFiles((prev) =>
            prev.map((f) => (f.id === uploadedFile.id ? { ...f, progress: 100, status: "completed" } : f)),
          )
        }, 2000)
      })

      const updatedFiles = [...files, ...newFiles]
      setFiles(updatedFiles)
      onFilesChange(updatedFiles)
    },
    [files, onFilesChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSize * 1024 * 1024,
    maxFiles: maxFiles - files.length,
    disabled: files.length >= maxFiles,
  })

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((f) => f.id !== id)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return "🖼️"
    if (file.type === "application/pdf") return "📄"
    if (file.name.endsWith(".ai")) return "🎨"
    if (file.name.endsWith(".eps")) return "📐"
    return "📁"
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {files.length < maxFiles && (
        <Card>
          <CardContent className="p-6">
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
              )}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium">{isDragActive ? "Drop files here" : "Upload your design files"}</p>
                <p className="text-sm text-muted-foreground">Drag and drop files or click to browse</p>
                <p className="text-xs text-muted-foreground">
                  Supports: Images, SVG, AI, EPS, PDF (max {maxSize}MB each)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">
            Uploaded Files ({files.length}/{maxFiles})
          </h4>
          {files.map((uploadedFile) => (
            <Card key={uploadedFile.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview || "/placeholder.svg"}
                      alt={uploadedFile.file.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-2xl">
                      {getFileIcon(uploadedFile.file)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium truncate">{uploadedFile.file.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(1)}MB
                      </Badge>
                    </div>

                    {uploadedFile.status === "uploading" && (
                      <div className="space-y-1">
                        <Progress value={uploadedFile.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Uploading... {Math.round(uploadedFile.progress)}%
                        </p>
                      </div>
                    )}

                    {uploadedFile.status === "completed" && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs">Upload complete</span>
                      </div>
                    )}

                    {uploadedFile.status === "error" && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs">{uploadedFile.error || "Upload failed"}</span>
                      </div>
                    )}
                  </div>

                  <Button variant="ghost" size="sm" onClick={() => removeFile(uploadedFile.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
