"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import type { Asset } from "@/lib/types"

interface AssetFiltersProps {
  onFiltersChange: (filters: FilterState) => void
}

export interface FilterState {
  search: string
  type: Asset["type"] | "all"
  license: Asset["license"] | "all"
  verified: boolean | null
  tags: string[]
  sortBy: "newest" | "popular" | "downloads" | "name"
}

export function AssetFilters({ onFiltersChange }: AssetFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    type: "all",
    license: "all",
    verified: null,
    tags: [],
    sortBy: "newest",
  })

  const [showFilters, setShowFilters] = useState(false)

  const assetTypes = [
    { value: "all", label: "All Types" },
    { value: "logo", label: "Logos" },
    { value: "map", label: "Maps" },
    { value: "emblem", label: "Emblems" },
    { value: "poster", label: "Posters" },
    { value: "banner", label: "Banners" },
    { value: "icon", label: "Icons" },
  ]

  const licenses = [
    { value: "all", label: "All Licenses" },
    { value: "public", label: "Public Domain" },
    { value: "restricted", label: "Restricted Use" },
    { value: "commercial", label: "Commercial" },
  ]

  const popularTags = [
    "government",
    "official",
    "national",
    "heritage",
    "modern",
    "traditional",
    "flag",
    "coat-of-arms",
    "ministry",
    "agency",
  ]

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const clearFilters = () => {
    const cleared: FilterState = {
      search: "",
      type: "all",
      license: "all",
      verified: null,
      tags: [],
      sortBy: "newest",
    }
    setFilters(cleared)
    onFiltersChange(cleared)
  }

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag]
    updateFilters({ tags: newTags })
  }

  const hasActiveFilters =
    filters.search ||
    filters.type !== "all" ||
    filters.license !== "all" ||
    filters.verified !== null ||
    filters.tags.length > 0

  return (
    <div className="space-y-4">
      {/* Search and Toggle */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets by name, description, or tags..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1">
              {
                [
                  filters.type !== "all",
                  filters.license !== "all",
                  filters.verified !== null,
                  filters.tags.length > 0,
                ].filter(Boolean).length
              }
            </Badge>
          )}
        </Button>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.type !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Type: {filters.type}
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ type: "all" })} />
            </Badge>
          )}
          {filters.license !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              License: {filters.license}
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ license: "all" })} />
            </Badge>
          )}
          {filters.verified !== null && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.verified ? "Verified" : "Unverified"}
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ verified: null })} />
            </Badge>
          )}
          {filters.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTag(tag)} />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Expanded Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Assets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Asset Type</Label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => updateFilters({ type: value as Asset["type"] | "all" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {assetTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>License</Label>
                <Select
                  value={filters.license}
                  onValueChange={(value) => updateFilters({ license: value as Asset["license"] | "all" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {licenses.map((license) => (
                      <SelectItem key={license.value} value={license.value}>
                        {license.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => updateFilters({ sortBy: value as FilterState["sortBy"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="downloads">Most Downloaded</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Verification Status</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={filters.verified === true}
                    onCheckedChange={(checked) => updateFilters({ verified: checked ? true : null })}
                  />
                  <Label htmlFor="verified">Verified Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="unverified"
                    checked={filters.verified === false}
                    onCheckedChange={(checked) => updateFilters({ verified: checked ? false : null })}
                  />
                  <Label htmlFor="unverified">Unverified Only</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Popular Tags</Label>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={filters.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
