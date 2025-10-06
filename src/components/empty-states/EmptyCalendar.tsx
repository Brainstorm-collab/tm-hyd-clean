import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

export const EmptyCalendar: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <CalendarIcon className="w-12 h-12 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No calendar events
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Your calendar is empty. Sign in to create and manage your tasks and events.
      </p>
    </div>
  );
};
