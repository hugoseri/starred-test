import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {

  let left = (
    <div className="left">
      <Link href="/">
        <div className="bold">
          Feed
        </div>
      </Link>
    </div>
  );

  let right = null;

  return (
    <nav>
      {left}
      {right}
    </nav>
  );
};

export default Header;