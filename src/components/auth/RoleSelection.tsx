import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Logo } from '../ui/Logo';

interface RoleSelectionProps {
  onRoleSelected: (role: string) => void;
  onSkip: () => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({
  onRoleSelected,
  onSkip
}) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['UI/UX Designer', 'Founder']);

  const roles = [
    'UI/UX Designer',
    'Developer',
    'Influencer',
    'Manager',
    'Marketer',
    'Founder'
  ];

  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleNext = () => {
    if (selectedRoles.length > 0) {
      onRoleSelected(selectedRoles[0]); // Use first selected role
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <Logo size="md" />
          <span className="font-semibold text-lg text-gray-900">Superpage</span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-gray-600 bg-gray-100  hover:bg-gray-200 transition-colors">
            Explore Features
          </button>
          <button className="px-4 py-2 text-white bg-black  hover:bg-gray-800 transition-colors">
            Get Started
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="w-full max-w-sm">
          <div className="bg-white  shadow-2xl border-2 border-gray-200 p-6">
            {/* Title */}
            <h1 className="text-xl font-bold text-gray-900 text-center mb-2">
              What is your job title?
            </h1>
            <p className="text-gray-600 text-center mb-6 text-sm">
              Select option to customize your dashboard
            </p>

            {/* Role Grid */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleToggle(role)}
                  className={`p-3  border-2 transition-all flex items-center space-x-2 text-sm ${
                    selectedRoles.includes(role)
                      ? 'bg-[#6B40ED]/10 border-[#6B40ED] text-[#6B40ED]'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <Check className={`w-3 h-3 ${
                    selectedRoles.includes(role) ? 'text-[#6B40ED]' : 'text-gray-400'
                  }`} />
                  <span className="font-medium">{role}</span>
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-full bg-black text-white py-2.5  hover:bg-gray-800 transition-colors font-medium text-sm mb-4"
            >
              Next
            </button>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#6B40ED] "></div>
                <div className="w-2 h-2 bg-[#6B40ED] "></div>
                <div className="w-2 h-2 bg-[#6B40ED] "></div>
                <div className="w-2 h-2 bg-gray-300 "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
