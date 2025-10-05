import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  MoreVertical,
  Check
} from 'lucide-react';

export const SearchResults: React.FC = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const searchQuery = urlParams.get('q') || '';
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedTag, setSelectedTag] = useState('Design');
  const [selectedDate, setSelectedDate] = useState('Nov 2022');

  const searchResults = {
    tasks: [
      {
        id: '1',
        title: 'Complete all pages in mobile app design based on Super OS Components',
        date: '25 Aug 2022 - 11:30 AM',
        tag: 'IUIDesig',
        completed: false
      },
      {
        id: '2',
        title: 'Meet with front end developers to discuss about new features',
        date: '25 Aug 2022 - 11:30 AM',
        tag: 'Development',
        completed: false
      },
      {
        id: '3',
        title: 'Complete User testing with at least 5 users',
        date: '25 Aug 2022 - 11:30 AM',
        tag: 'UX Testing',
        completed: false
      }
    ],
    announcements: [
      {
        id: '1',
        title: 'Welcome New HR to our team',
        author: 'Emily',
        date: '24 Aug 2022 - 12:00 PM',
        avatar: 'E'
      },
      {
        id: '2',
        title: 'UX research phase 1 is done, UI designers Sta...',
        author: 'Juliana',
        date: '16 Aug 2022 - 11:30 AM',
        avatar: 'J'
      }
    ],
    teams: [
      {
        id: '1',
        name: "John's Team for UX desigers",
        members: '30 Members',
        created: 'Created at 25 aug, 2022',
        avatar: 'J'
      },
      {
        id: '2',
        name: 'Senior Developers',
        members: '450 Members',
        created: 'Created at 25 aug, 2022',
        avatar: 'SD'
      }
    ]
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Search results for '{searchQuery}'</h1>
            <p className="text-gray-600">340+ Search results founded in 10 tabs</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Filters Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-button hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">Filters</span>
              {showFilters ? (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Search Results */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6">
              {/* Tasks Search Results */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Tasks</h2>
                <div className="space-y-3">
                  {searchResults.tasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        className="mt-1 w-4 h-4 rounded-sm border-gray-300 focus:ring-2"
                        style={{ accentColor: '#6B40ED' }}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                          {task.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{task.date}</span>
                          <span className="bg-gray-100 px-2 py-1 rounded">{task.tag}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Announcements Search Results */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h2>
                <div className="space-y-3">
                  {searchResults.announcements.map((announcement) => (
                    <div key={announcement.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-medium">
                        {announcement.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                          {announcement.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{announcement.date}</span>
                          <span>from {announcement.author}</span>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teams Search Results */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Teams</h2>
                <div className="space-y-3">
                  {searchResults.teams.map((team) => (
                    <div key={team.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-medium">
                        {team.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                          {team.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{team.members}</span>
                          <span>{team.created}</span>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Other tabs results not founded for this key '{searchQuery}'
                </p>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="w-64 bg-white border border-gray-200 rounded-card p-4 flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              <div className="space-y-4">
                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categories
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                {/* Select Tag */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Tag
                  </label>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="Marketing">Marketing</option>
                    <option value="UI/UX">UI/UX</option>
                  </select>
                </div>

                {/* Select Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};