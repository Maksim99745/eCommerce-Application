import { CategoriesListSkeletonComponent } from '@components/CategoriesList/CategoriesListSkeleton.component';
import { apiService } from '@core/api/api.service';
import { useRequest } from '@hooks/useRequest';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

export function CategoriesListComponent() {
  const { categoryKey = '' } = useParams<'categoryKey'>();
  const { data: categories, isLoading, error } = useRequest('categories', () => apiService.getCategories());

  return (
    <>
      {error && <p>Error: {String(error)}</p>}
      {isLoading && <CategoriesListSkeletonComponent />}

      {categories && (
        <List>
          {categories.results
            .filter(({ key }) => key !== 'popular')
            .map(({ id, key, name }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton component={Link} to={`/categories/${key}`} selected={key === categoryKey}>
                  <ListItemText primary={name.en} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      )}
    </>
  );
}
