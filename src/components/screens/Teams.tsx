import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  MoreVertical, 
  Search,
  Users,
  UserPlus,
  Edit,
  Trash2,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Avatar, AvatarFallback } from '../ui/Avatar';
import { CreateTeamModal } from '../modals/CreateTeamModal';

interface Team {
  id: string;
  name: string;
  memberCount: number;
  avatar: string;
}

export const Teams: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdowns, setOpenDropdowns] = useState<{[key: string]: boolean}>({});
  const navigate = useNavigate();
  
  // Refs for dropdowns
  const dropdownRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(dropdownRefs.current).forEach(key => {
        if (dropdownRefs.current[key] && !dropdownRefs.current[key]?.contains(event.target as Node)) {
          setOpenDropdowns(prev => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (key: string) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const teams: Team[] = [
    {
      id: '1',
      name: 'Team 1',
      memberCount: 0,
      avatar: 'T1'
    },
    {
      id: '2',
      name: 'Team 2',
      memberCount: 0,
      avatar: 'T2'
    },
    {
      id: '3',
      name: 'Team 3',
      memberCount: 0,
      avatar: 'T3'
    },
    {
      id: '4',
      name: 'Team 4',
      memberCount: 0,
      avatar: 'T4'
    },
    {
      id: '5',
      name: 'Team 5',
      memberCount: 0,
      avatar: 'T5'
    },
    {
      id: '6',
      name: 'Team 6',
      memberCount: 0,
      avatar: 'T6'
    },
    {
      id: '7',
      name: 'Team 7',
      memberCount: 0,
      avatar: 'T7'
    },
    {
      id: '8',
      name: 'Team 8',
      memberCount: 0,
      avatar: 'T8'
    }
  ];

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Teams</h1>
          <p className="text-gray-600">0 Total teams are added</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <CreateTeamModal>
            <button className="px-4 py-2 transition-colors flex items-center space-x-2 bg-primary-100 text-primary-700 hover:bg-primary-200">
              <Plus className="w-4 h-4" />
              <span>Team</span>
            </button>
          </CreateTeamModal>
          <div className="relative" ref={el => { dropdownRefs.current['teams-section'] = el; }}>
            <button 
              onClick={() => toggleDropdown('teams-section')}
              className="p-1 hover:bg-gray-100"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
            
            {/* Teams Section Dropdown */}
            {openDropdowns['teams-section'] && (
              <div className="absolute right-0 mt-1 w-48 bg-white  shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={() => {
                    // Handle view all teams
                    setOpenDropdowns(prev => ({ ...prev, 'teams-section': false }));
                  }}
                  className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="w-4 h-4 text-gray-500 mr-2" />
                  View All Teams
                </button>
                <button
                  onClick={() => {
                    // Handle team settings
                    setOpenDropdowns(prev => ({ ...prev, 'teams-section': false }));
                  }}
                  className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="w-4 h-4 text-gray-500 mr-2" />
                  Team Settings
                </button>
                <button
                  onClick={() => {
                    // Handle manage teams
                    setOpenDropdowns(prev => ({ ...prev, 'teams-section': false }));
                  }}
                  className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="w-4 h-4 text-gray-500 mr-2" />
                  Manage Teams
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{team.name}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>0 Members</span>
                    </div>
                  </div>
                </div>
                <div className="relative" ref={el => { dropdownRefs.current[`team-${team.id}`] = el; }}>
                  <button 
                    onClick={() => toggleDropdown(`team-${team.id}`)}
                    className="p-1 hover:bg-gray-100"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  {/* Team Dropdown Menu */}
                  {openDropdowns[`team-${team.id}`] && (
                    <div className="absolute right-0 mt-1 w-40 bg-white  shadow-lg border border-gray-200 py-1 z-50">
                      <button
                        onClick={() => {
                          setOpenDropdowns(prev => ({ ...prev, [`team-${team.id}`]: false }));
                          navigate('/invite-users');
                        }}
                        className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <UserPlus className="w-4 h-4 text-gray-500 mr-2" />
                        Invite User
                      </button>
                      <button
                        onClick={() => {
                          // Handle edit team
                          setOpenDropdowns(prev => ({ ...prev, [`team-${team.id}`]: false }));
                        }}
                        className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4 text-gray-500 mr-2" />
                        Edit Team
                      </button>
                      <button
                        onClick={() => {
                          // Handle delete team
                          setOpenDropdowns(prev => ({ ...prev, [`team-${team.id}`]: false }));
                        }}
                        className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Trash2 className="w-4 h-4 text-gray-500 mr-2" />
                        Delete Team
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
