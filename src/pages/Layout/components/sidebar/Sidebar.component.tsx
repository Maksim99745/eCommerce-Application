import { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SWRResponse } from 'swr';

interface SidebarProps {
  categoriesResponse: SWRResponse<CategoryPagedQueryResponse>;
  handleDrawerToggle: () => void;
}

function SidebarComponent({ categoriesResponse, handleDrawerToggle }: SidebarProps): ReactNode {
  const { data: categories, isLoading, error } = categoriesResponse;

  return (
    <div>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {String(error)}</p>}
      {categories && (
        <List>
          {categories?.results.map(({ key, name }) => (
            <ListItem key={key} disablePadding>
              <ListItemButton component={Link} to={`/categories/${key}`}>
                {/* <ListItemIcon>{}</ListItemIcon> */}
                <ListItemText primary={name.en} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default SidebarComponent;
