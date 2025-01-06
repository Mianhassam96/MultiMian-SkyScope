'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBoxProps {
  onSearch: (city: string) => void
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setQuery('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Enter a city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow bg-white/20 text-white placeholder-white/70 border-white/30"
      />
      <Button type="submit" variant="secondary" size="icon">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}

