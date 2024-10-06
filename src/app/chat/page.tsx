"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        <header className="bg-blue-600 text-white py-4">
          <h1 className="text-2xl font-bold text-center">AI Chat Assistant</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message: any) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-3 max-w-[70%] ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </main>

        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-gray-200 bg-white"
        >
          <div className="flex space-x-4 max-w-3xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
