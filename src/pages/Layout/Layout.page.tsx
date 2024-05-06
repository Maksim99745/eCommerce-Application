import { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { getCategories } from '@core/api/requests';
import { ReactNode, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

function LayoutPage(): ReactNode {
  const [categories, setCategories] = useState<CategoryPagedQueryResponse>();

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <>
      <h1>Layout Page</h1>
      {!categories && <p>Loading...</p>}
      {categories?.results.map((category) => <p key={category.id}>{category.name.en}</p>)}
      <Outlet />
    </>
  );
}

export default LayoutPage;
