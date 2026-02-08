'use client';

import NavLinkItem from '@/app/components/common/NavLinkItem';
import NavLinkItemButton from '@/app/components/common/NavLinkItemButton';
import axios from 'axios';

export default function AuthenticatedLinks() {
  const handleSignOut = async () => {
    const response = await axios.post('/api/auth/logout');
    console.log('Logout response:', response);
    if (response.status === 200) {
      window.location.href = '/';
    }
  };

  return (
    <>
      <NavLinkItem href="/room/join">Create Room</NavLinkItem>
      <NavLinkItemButton onClick={handleSignOut}>Sign Out</NavLinkItemButton>
    </>
  );
}
