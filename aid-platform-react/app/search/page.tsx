'use client'

import { useState } from 'react'

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('service')
  const [results, setResults] = useState<string[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your API to perform the search
    console.log('Searching:', { searchTerm, searchType })
    // Simulate search results
    setResults(['Result 1', 'Result 2', 'Result 3'])
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="px-3 py-2 border rounded mr-2"
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="px-3 py-2 border rounded mr-2"
        >
          <option value="service">Service</option>
          <option value="aidCenter">Aid Center</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
      <div>
        <h2 className="text-xl font-bold mb-2">Results:</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

