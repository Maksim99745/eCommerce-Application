import { apiService } from '@core/api/api.service';
import { useRequest } from '@core/api/use-request.hook';
import { useParams } from 'react-router-dom';

function CatalogPage() {
  const { categoryKey = '' } = useParams<'categoryKey'>();
  const {
    data: category,
    error,
    isLoading,
  } = useRequest(`categories/${categoryKey}`, () => apiService.getCategory(categoryKey));

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {String(error)}</p>}
      {category && <p>Catalog for {category?.name.en} page</p>}
    </>
  );
}

export default CatalogPage;
