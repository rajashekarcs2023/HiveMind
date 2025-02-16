// app/hive-intelligence/page.tsx
'use client';

import React from 'react';
import { Send, TrendingUp, Filter, Calendar } from 'lucide-react';

export default function HiveIntelligence() {
  return (
    <div className="flex gap-6 p-6">
      {/* Main Content - 70% */}
      <div className="flex-grow">
        {/* Thought Input */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Share Your Thoughts</h2>
          <textarea 
            className="w-full p-4 rounded-lg border min-h-[120px] mb-2"
            placeholder="What's on your mind? Share your ideas, questions, or experiences..."
          />
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Send size={16} />
            Share
          </button>
        </div>

        {/* Similar Discussions with Scroll */}
        <div className="h-[calc(100vh-280px)] overflow-y-auto pr-4">
          <h3 className="text-xl font-semibold mb-4">Similar Discussions</h3>
          
          {/* Discussion Cards */}
          <div className="space-y-4">
            {/* Example cards - will be mapped from real data */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium">Alice Chen</span>
                  <p className="text-gray-600 mt-1">
                    "I'm thinking of using vector search for a hackathon project to help with study group matching..."
                  </p>
                </div>
                <span className="text-sm text-purple-600">95% similar</span>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Posted in Advanced Data Structures • 2 days ago
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium">Bob Smith</span>
                  <p className="text-gray-600 mt-1">
                    "Just finished a project using embeddings to analyze study patterns. Found some interesting insights..."
                  </p>
                </div>
                <span className="text-sm text-purple-600">82% similar</span>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Posted in AI Applications • 1 week ago
              </div>
            </div>
            
            {/* Add more discussion cards */}
          </div>
        </div>
      </div>

      {/* Right Sidebar - 30% */}
      <div className="w-80 space-y-6">
        {/* Trending Topics */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={20} />
            Trending Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              Hackathons
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              Vector Search
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              Study Groups
            </span>
          </div>
        </div>

        {/* Knowledge Pulse */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Knowledge Pulse</h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600 mb-1">Most Active Course</div>
              <div className="font-medium">Data Structures</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Hot Discussion</div>
              <div className="font-medium">Vector Embeddings in Search</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Upcoming Event</div>
              <div className="font-medium flex items-center gap-2">
                <Calendar size={16} />
                Stanford Hackathon
              </div>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Filter size={20} />
            Quick Filters
          </h3>
          <div className="space-y-2">
            <select className="w-full p-2 rounded border">
              <option>All Courses</option>
              <option>Data Structures</option>
              <option>AI Applications</option>
            </select>
            <select className="w-full p-2 rounded border">
              <option>All Time</option>
              <option>Past 24 Hours</option>
              <option>Past Week</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}