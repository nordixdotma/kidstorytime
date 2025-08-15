"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, ChevronDown, DollarSign, Calendar, ArrowUpDown } from "lucide-react"

interface FilterOptions {
  brands: string[]
  priceRange: {
    min: number
    max: number
  }
  ageRange: string
  sortBy: string
}

interface ProductFilterWithAgeProps {
  onFilterChange: (filters: FilterOptions) => void
  onSearchChange: (search: string) => void
  brands: string[]
  totalProducts: number
  filteredCount: number
}

type FilterType = "price" | "age" | "sort"

interface FilterState {
  price: string
  age: string
  sort: string
}

interface DropdownState {
  price: boolean
  age: boolean
  sort: boolean
}

export default function ProductFilterWithAge({
  onFilterChange,
  onSearchChange,
  brands,
  totalProducts,
  filteredCount,
}: ProductFilterWithAgeProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    price: "Tous les prix",
    age: "Tous les âges",
    sort: "Plus récent",
  })

  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
    price: false,
    age: false,
    sort: false,
  })

  const dropdownRefs = {
    price: useRef<HTMLDivElement>(null),
    age: useRef<HTMLDivElement>(null),
    sort: useRef<HTMLDivElement>(null),
  }

  // Check if any filter is applied
  const hasActiveFilters = filters.price !== "Tous les prix" || filters.age !== "Tous les âges"

  // Get age ranges
  const getAgeRanges = () => ["Tous les âges", "0-2 ans", "3-5 ans", "6-8 ans", "9-12 ans", "13+ ans"]

  // Get price ranges
  const getPriceRanges = () => [
    "Tous les prix",
    "Moins de 50 DH",
    "50 - 100 DH",
    "100 - 200 DH",
    "200 - 300 DH",
    "300 - 500 DH",
    "Plus de 500 DH",
  ]

  // Get sort options
  const getSortOptions = () => ["Plus récent", "Prix: croissant", "Prix: décroissant", "Nom A-Z", "Marque"]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    const handleClickOutside = (event: any) => {
      Object.keys(dropdownRefs).forEach((key) => {
        const ref = dropdownRefs[key as FilterType]
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdownOpen((prev) => ({ ...prev, [key]: false }))
        }
      })
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Update filters when they change
  useEffect(() => {
    const filterOptions: FilterOptions = {
      brands: [],
      priceRange: getPriceRangeFromString(filters.price),
      ageRange: filters.age,
      sortBy: getSortValueFromString(filters.sort),
    }
    onFilterChange(filterOptions)
  }, [filters, onFilterChange])

  const getPriceRangeFromString = (priceString: string) => {
    switch (priceString) {
      case "Moins de 50 DH":
        return { min: 0, max: 50 }
      case "50 - 100 DH":
        return { min: 50, max: 100 }
      case "100 - 200 DH":
        return { min: 100, max: 200 }
      case "200 - 300 DH":
        return { min: 200, max: 300 }
      case "300 - 500 DH":
        return { min: 300, max: 500 }
      case "Plus de 500 DH":
        return { min: 500, max: 10000 }
      default:
        return { min: 0, max: 10000 }
    }
  }

  const getSortValueFromString = (sortString: string) => {
    switch (sortString) {
      case "Prix: croissant":
        return "price-low"
      case "Prix: décroissant":
        return "price-high"
      case "Nom A-Z":
        return "name"
      case "Marque":
        return "brand"
      default:
        return "newest"
    }
  }

  const toggleDropdown = (dropdown: FilterType) => {
    setDropdownOpen((prev) => {
      const newState = { ...prev }
      Object.keys(newState).forEach((key) => {
        newState[key as FilterType] = key === dropdown ? !prev[key as FilterType] : false
      })
      return newState
    })
  }

  const setFilter = (type: FilterType, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }))
    setDropdownOpen((prev) => ({ ...prev, [type]: false }))
  }

  const resetFilters = () => {
    setFilters({
      price: "Tous les prix",
      age: "Tous les âges",
      sort: "Plus récent",
    })
  }

  const resetFilter = (type: FilterType) => {
    const defaultValues = {
      price: "Tous les prix",
      age: "Tous les âges",
      sort: "Plus récent",
    }
    setFilters((prev) => ({ ...prev, [type]: defaultValues[type] }))
  }

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-3 md:p-4 mb-4 md:mb-6 transition-all duration-700 transform relative z-30 ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      {/* Search and Reset Filters */}
      <div className="flex gap-2 mb-4 transition-all duration-300 ease-in-out">
        <div className={`relative transition-all duration-500 ease-in-out ${hasActiveFilters ? "w-10/12" : "w-full"}`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher des histoires..."
            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d88200] focus:border-transparent font-normal transition-all duration-200 hover:border-gray-300 text-sm"
            onChange={(e) => onSearchChange(e.target.value)}
            defaultValue=""
          />
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="bg-red-500 text-white hover:bg-red-600 font-bold text-xs px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center w-2/12 transform hover:scale-105"
          >
            <X className="w-3 h-3 mr-1" />
            <span className="hidden md:inline">Effacer</span>
            <span className="md:hidden">Reset</span>
          </button>
        )}
      </div>

      {/* Filters Grid - 3 columns for desktop, 1 for mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Price Filter */}
        <div className="relative" ref={dropdownRefs.price}>
          <button
            onClick={() => toggleDropdown("price")}
            className={`w-full flex items-center justify-between px-3 py-2 border-2 rounded-lg transition-all duration-200 ${
              filters.price !== "Tous les prix"
                ? "border-[#d88200] bg-[#d88200]/10"
                : "border-gray-200 hover:border-[#d88200]/30"
            } text-xs focus:outline-none focus:ring-2 focus:ring-[#d88200] focus:border-transparent font-medium`}
          >
            <div className="flex items-center">
              <DollarSign className="w-3 h-3 mr-1 text-[#d88200]" />
              <span className="truncate text-xs">{filters.price}</span>
            </div>
            <div className="flex items-center">
              {filters.price !== "Tous les prix" && (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    resetFilter("price")
                  }}
                  className="mr-1 text-[#d88200] hover:text-[#c07600] cursor-pointer p-1 rounded-full hover:bg-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </div>
              )}
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen.price ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {dropdownOpen.price && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
              {getPriceRanges().map((price) => (
                <button
                  key={price}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 font-medium transition-colors duration-150 ${
                    filters.price === price ? "bg-[#d88200]/10 text-[#d88200] font-bold" : "text-gray-700"
                  }`}
                  onClick={() => setFilter("price", price)}
                >
                  {price}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Age Filter */}
        <div className="relative" ref={dropdownRefs.age}>
          <button
            onClick={() => toggleDropdown("age")}
            className={`w-full flex items-center justify-between px-3 py-2 border-2 rounded-lg transition-all duration-200 ${
              filters.age !== "Tous les âges"
                ? "border-[#d88200] bg-[#d88200]/10"
                : "border-gray-200 hover:border-[#d88200]/30"
            } text-xs focus:outline-none focus:ring-2 focus:ring-[#d88200] focus:border-transparent font-medium`}
          >
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1 text-[#d88200]" />
              <span className="truncate text-xs">{filters.age}</span>
            </div>
            <div className="flex items-center">
              {filters.age !== "Tous les âges" && (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    resetFilter("age")
                  }}
                  className="mr-1 text-[#d88200] hover:text-[#c07600] cursor-pointer p-1 rounded-full hover:bg-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </div>
              )}
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen.age ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {dropdownOpen.age && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
              {getAgeRanges().map((age) => (
                <button
                  key={age}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 font-medium transition-colors duration-150 ${
                    filters.age === age ? "bg-[#d88200]/10 text-[#d88200] font-bold" : "text-gray-700"
                  }`}
                  onClick={() => setFilter("age", age)}
                >
                  {age}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort Filter */}
        <div className="relative" ref={dropdownRefs.sort}>
          <button
            onClick={() => toggleDropdown("sort")}
            className={`w-full flex items-center justify-between px-3 py-2 border-2 rounded-lg transition-all duration-200 ${
              filters.sort !== "Plus récent"
                ? "border-[#d88200] bg-[#d88200]/10"
                : "border-gray-200 hover:border-[#d88200]/30"
            } text-xs focus:outline-none focus:ring-2 focus:ring-[#d88200] focus:border-transparent font-medium`}
          >
            <div className="flex items-center">
              <ArrowUpDown className="w-3 h-3 mr-1 text-[#d88200]" />
              <span className="truncate text-xs">{filters.sort}</span>
            </div>
            <div className="flex items-center">
              {filters.sort !== "Plus récent" && (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    resetFilter("sort")
                  }}
                  className="mr-1 text-[#d88200] hover:text-[#c07600] cursor-pointer p-1 rounded-full hover:bg-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </div>
              )}
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen.sort ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {dropdownOpen.sort && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
              {getSortOptions().map((sort) => (
                <button
                  key={sort}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 font-medium transition-colors duration-150 ${
                    filters.sort === sort ? "bg-[#d88200]/10 text-[#d88200] font-bold" : "text-gray-700"
                  }`}
                  onClick={() => setFilter("sort", sort)}
                >
                  {sort}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
