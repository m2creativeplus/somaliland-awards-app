"use client"

import { useState, useMemo } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AssetCard } from "@/components/asset-card"
import { AssetFilters, type FilterState } from "@/components/asset-filters"
import { Button } from "@/components/ui/button"
import type { Asset } from "@/lib/types"
import { Grid, List } from "lucide-react"

// Mock data - in real app this would come from API/database
const mockAssets: Asset[] = [
  {
    id: "1",
    name_en: "Somaliland National Flag",
    name_so: "Calanka Qaranka Somaliland",
    type: "logo",
    owner: "Ministry of Information",
    date_created: "2024-01-15",
    colors: ["#1B5E20", "#FFFFFF", "#D32F2F"],
    palette_tokens: ["primary", "white", "red"],
    fonts: [],
    png_url: "/somaliland-flag-with-green-white-red-stripes-and-s.jpg",
    tags: ["flag", "national", "official", "government"],
    description_en:
      "Official flag of the Republic of Somaliland featuring green, white, and red horizontal stripes with the national emblem.",
    description_so: "Calanka rasmiga ah ee Jamhuuriyadda Somaliland oo leh midabada cagaar, caddaan, iyo cas.",
    source_links: [],
    iso_compliance: ["ISO-3166"],
    awards_history: [],
    license: "public",
    public_visibility: true,
    metrics: { views: 15420, likes: 892, downloads: 2341 },
    verification: { verified_by: "SNPA", verified_date: "2024-01-15" },
  },
  {
    id: "2",
    name_en: "Somaliland Coat of Arms",
    name_so: "Astaanta Qaranka Somaliland",
    type: "emblem",
    owner: "Office of the President",
    date_created: "2024-01-10",
    colors: ["#1B5E20", "#CFA93F", "#FFFFFF"],
    palette_tokens: ["primary", "accent", "white"],
    fonts: [],
    png_url: "/somaliland-coat-of-arms-with-eagle-and-shield.jpg",
    tags: ["emblem", "coat-of-arms", "official", "government", "eagle"],
    description_en: "The official coat of arms of Somaliland featuring an eagle, shield, and national motto.",
    description_so: "Astaanta rasmiga ah ee Somaliland oo ka kooban gorgor, gaashaan, iyo hal-ku-dhegga qaranka.",
    source_links: [],
    iso_compliance: [],
    awards_history: [],
    license: "public",
    public_visibility: true,
    metrics: { views: 8934, likes: 567, downloads: 1456 },
    verification: { verified_by: "SNPA", verified_date: "2024-01-10" },
  },
  {
    id: "3",
    name_en: "Ministry of Health Logo",
    name_so: "Astaanta Wasaaradda Caafimaadka",
    type: "logo",
    owner: "Ministry of Health",
    date_created: "2024-02-01",
    colors: ["#1B5E20", "#FFFFFF", "#2196F3"],
    palette_tokens: ["primary", "white", "blue"],
    fonts: ["Open Sans"],
    png_url: "/ministry-of-health-logo-with-medical-cross-and-gre.jpg",
    tags: ["ministry", "health", "medical", "government", "official"],
    description_en: "Official logo of the Ministry of Health of Somaliland, representing healthcare services.",
    description_so: "Astaanta rasmiga ah ee Wasaaradda Caafimaadka Somaliland.",
    source_links: [],
    iso_compliance: [],
    awards_history: [],
    license: "restricted",
    public_visibility: true,
    metrics: { views: 3421, likes: 234, downloads: 567 },
    verification: { verified_by: "Ministry of Health", verified_date: "2024-02-01" },
  },
  {
    id: "4",
    name_en: "Hargeisa City Map",
    name_so: "Khariidadda Magaalada Hargeysa",
    type: "map",
    owner: "Hargeisa Municipality",
    date_created: "2024-01-20",
    colors: ["#1B5E20", "#CFA93F", "#FFFFFF", "#E0E0E0"],
    palette_tokens: ["primary", "accent", "white", "gray"],
    fonts: ["Roboto"],
    png_url: "/hargeisa-city-map-with-streets-and-landmarks.jpg",
    tags: ["map", "hargeisa", "city", "municipality", "urban"],
    description_en: "Detailed map of Hargeisa, the capital city of Somaliland, showing major streets and landmarks.",
    description_so: "Khariidadda faahfaahsan ee Hargeysa, caasimadda Somaliland.",
    source_links: [],
    iso_compliance: [],
    awards_history: [],
    license: "public",
    public_visibility: true,
    metrics: { views: 12567, likes: 445, downloads: 1890 },
    verification: { verified_by: "Hargeisa Municipality", verified_date: "2024-01-20" },
  },
  {
    id: "5",
    name_en: "Independence Day Poster",
    name_so: "Boostarka Maalinta Madax-bannaanida",
    type: "poster",
    owner: "Ministry of Information",
    date_created: "2024-05-15",
    colors: ["#1B5E20", "#CFA93F", "#FFFFFF", "#D32F2F"],
    palette_tokens: ["primary", "accent", "white", "red"],
    fonts: ["Montserrat", "Open Sans"],
    png_url: "/independence-day-celebration-poster-with-somalilan.jpg",
    tags: ["independence", "celebration", "poster", "national", "holiday"],
    description_en: "Commemorative poster for Somaliland Independence Day celebrations.",
    description_so: "Boostarka xuska Maalinta Madax-bannaanida Somaliland.",
    source_links: [],
    iso_compliance: [],
    awards_history: [
      {
        id: "award1",
        title: "Best Poster Design 2024",
        category: "Graphic Design",
        year: 2024,
        winner_id: "5",
        description: "Winner of the national poster design competition",
      },
    ],
    license: "public",
    public_visibility: true,
    metrics: { views: 7823, likes: 678, downloads: 1234 },
    verification: { verified_by: "SNPA", verified_date: "2024-05-15" },
  },
  {
    id: "6",
    name_en: "Tourism Board Banner",
    name_so: "Bandhigga Hay'adda Dalxiiska",
    type: "banner",
    owner: "Tourism Development Board",
    date_created: "2024-03-10",
    colors: ["#1B5E20", "#CFA93F", "#2196F3", "#FFFFFF"],
    palette_tokens: ["primary", "accent", "blue", "white"],
    fonts: ["Playfair Display", "Open Sans"],
    png_url: "/tourism-banner-with-somaliland-landscapes-and-attr.jpg",
    tags: ["tourism", "travel", "banner", "promotion", "culture"],
    description_en: "Promotional banner showcasing Somaliland's tourism attractions and natural beauty.",
    description_so: "Bandhigga ku saabsan soo jiidashada dalxiisayaasha Somaliland.",
    source_links: [],
    iso_compliance: [],
    awards_history: [],
    license: "commercial",
    public_visibility: true,
    metrics: { views: 5432, likes: 321, downloads: 789 },
    verification: { verified_by: "Tourism Board", verified_date: "2024-03-10" },
  },
]

export default function LibraryPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    type: "all",
    license: "all",
    verified: null,
    tags: [],
    sortBy: "newest",
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredAssets = useMemo(() => {
    let filtered = [...mockAssets]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (asset) =>
          asset.name_en.toLowerCase().includes(searchLower) ||
          asset.name_so.toLowerCase().includes(searchLower) ||
          asset.description_en.toLowerCase().includes(searchLower) ||
          asset.description_so.toLowerCase().includes(searchLower) ||
          asset.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Type filter
    if (filters.type !== "all") {
      filtered = filtered.filter((asset) => asset.type === filters.type)
    }

    // License filter
    if (filters.license !== "all") {
      filtered = filtered.filter((asset) => asset.license === filters.license)
    }

    // Verification filter
    if (filters.verified !== null) {
      filtered = filtered.filter((asset) =>
        filters.verified ? asset.verification.verified_by : !asset.verification.verified_by,
      )
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter((asset) => filters.tags.some((tag) => asset.tags.includes(tag)))
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "newest":
          return new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
        case "popular":
          return b.metrics.likes - a.metrics.likes
        case "downloads":
          return b.metrics.downloads - a.metrics.downloads
        case "name":
          return a.name_en.localeCompare(b.name_en)
        default:
          return 0
      }
    })

    return filtered
  }, [filters])

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Asset Library</h1>
                  <p className="text-muted-foreground">Browse and download official Somaliland visual assets</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Showing {filteredAssets.length} of {mockAssets.length} assets
              </div>
            </div>

            {/* Filters */}
            <AssetFilters onFiltersChange={setFilters} />

            {/* Assets Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>

            {filteredAssets.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No assets found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() =>
                    setFilters({
                      search: "",
                      type: "all",
                      license: "all",
                      verified: null,
                      tags: [],
                      sortBy: "newest",
                    })
                  }
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
