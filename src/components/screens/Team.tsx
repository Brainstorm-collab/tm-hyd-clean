import React from 'react';
import { GuestTeams } from '../empty-states/GuestTeams';

export const Team: React.FC = () => {
  // Always show guest experience with empty cards
  return <GuestTeams />;
};
