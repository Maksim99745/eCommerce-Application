import { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { ReactNode } from 'react';
import { SWRResponse } from 'swr';

interface SidebarProps {
  categoriesResponse: SWRResponse<CategoryPagedQueryResponse>;
  handleDrawerToggle: () => void;
}

function SidebarComponent({ categoriesResponse, handleDrawerToggle }: SidebarProps): ReactNode {
  const { data: categories, error, isLoading } = categoriesResponse;

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
      <List>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {categories?.results.map(({ key, name }) => (
          <ListItem key={key} disablePadding>
            <ListItemButton>
              {/* <ListItemIcon>{}</ListItemIcon> */}
              <ListItemText primary={name.en} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SidebarComponent;
