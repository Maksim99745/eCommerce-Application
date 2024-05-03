import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

function LayoutPage(): ReactNode {
  return (
    <>
      <h1>Layout Page</h1>
      <Outlet />
    </>
  );
}

export default LayoutPage;
