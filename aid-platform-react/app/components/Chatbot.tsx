'use client'

import { useState } from 'react'

export default function Chatbot() {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([])
  const [input, setInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { text: input, sender: 'user' as const }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Here you would typically send a request to your API to get the chatbot's response
    // For this example, we'll just echo the user's message
    setTimeout(() => {
      const botMessage = { text: `You said: ${input}`, sender: 'bot' as const }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 w-64 bg-white border rounded shadow-lg">
      <div className="bg-blue-500 text-white p-2 rounded-t">
        <h2 className="text-lg font-bold">Chatbot</h2>
      </div>
      <div className="h-64 overflow-y-auto p-2">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-2 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-2 py-1 border rounded"
        />
      </form>
    </div>
  )
}

