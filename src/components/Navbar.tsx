import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
}

function Navbar({ children }: NavbarProps) {
  return <nav className='nav-bar'>{children}</nav>;
}

export default Navbar;
