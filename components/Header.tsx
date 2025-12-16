import React from 'react';
import Navbar from './layout/Navbar';

interface HeaderProps {
  onOpenProfile?: () => void;
}

// Header is now a simple wrapper around Navbar for backward compatibility
const Header: React.FC<HeaderProps> = (props) => <Navbar {...props} />;

export default Header;