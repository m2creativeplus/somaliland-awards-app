"use client"

import type { Asset } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Download, Eye, ExternalLink, BadgeCheck } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface AssetCardProps {
  asset: Asset
  language?: "en" | "so"
}

export function AssetCard({ asset, language = "en" }: AssetCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(asset.metrics.likes)
  const { toast } = useToast()

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))

    if (!isLiked) {
      toast({
        title: "Asset Liked",
        description: "You've added this asset to your favorites.",
      })
    }
  }

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: `Downloading ${language === "en" ? asset.name_en : asset.name_so}...`,
    })
  }

  const handleShare = () => {
    toast({
      title: "Link Copied",
      description: "Asset link copied to clipboard.",
    })
  }

  const getTypeColor = (type: Asset["type"]) => {
    const colors = {
      logo: "bg-blue-100 text-blue-800",
      map: "bg-green-100 text-green-800",
      emblem: "bg-purple-100 text-purple-800",
      poster: "bg-orange-100 text-orange-800",
      banner: "bg-pink-100 text-pink-800",
      icon: "bg-gray-100 text-gray-800",
    }
    return colors[type] || colors.icon
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="relative aspect-square bg-muted/30 overflow-hidden">
        {asset.png_url ? (
          <Image
            src={asset.png_url || "/placeholder.svg"}
            alt={language === "en" ? asset.name_en : asset.name_so}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="text-4xl font-bold text-primary/30">
              {(language === "en" ? asset.name_en : asset.name_so).charAt(0)}
            </div>
          </div>
        )}

        {asset.verification.verified_by && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
              <BadgeCheck className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}

        <div className="absolute top-2 left-2">
          <Badge className={getTypeColor(asset.type)}>{asset.type}</Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{language === "en" ? asset.name_en : asset.name_so}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {language === "en" ? asset.description_en : asset.description_so}
          </p>

          <div className="flex flex-wrap gap-1">
            {asset.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {asset.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{asset.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {asset.metrics.views}
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary" onClick={handleDownload}>
            <Download className="w-4 h-4" />
            {asset.metrics.downloads}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleLike} className={isLiked ? "text-red-500" : ""}>
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
