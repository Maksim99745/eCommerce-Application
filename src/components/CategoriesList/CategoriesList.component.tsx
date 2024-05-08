import { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { getCategories } from '@core/api/requests';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

export function CategoriesListComponent() {
  const { data: categories, isLoading, error } = useSWR<CategoryPagedQueryResponse>('categories', getCategories);

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
