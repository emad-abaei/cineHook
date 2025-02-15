import { ReactNode } from 'react';

interface NavbarProps {
  children: ReactNode;
}

function Navbar({ children }: NavbarProps) {
  return (
    <nav className="nav-bar" role="navigation">
      {children}
    </nav>
  );
}

export default Navbar;
