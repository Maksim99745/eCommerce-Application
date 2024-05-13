import { apiService } from '@core/api/api.service';
import { useRequest } from '@core/api/use-request.hook';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

export function CategoriesListComponent() {
  const { data: categories, isLoading, error } = useRequest('categories', () => apiService.getCategories());

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {String(error)}</p>}
      {categories && (
        <List>
          {categories.results.map(({ id, key, name }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton component={Link} to={`/categories/${key}`}>
                {/* <ListItemIcon>{}</ListItemIcon> */}
                <ListItemText primary={name.en} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
