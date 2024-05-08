import { getCategory } from '@core/api/requests';
import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

function CatalogPage(): ReactNode {
  const { categoryKey } = useParams();
  const { data: category, error, isLoading } = useSWR(categoryKey, getCategory);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {String(error)}</p>}
      {category && <p>Catalog for {category?.name.en} page</p>}
    </>
  );
}

export default CatalogPage;
