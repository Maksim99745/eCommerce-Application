import { CategoriesListSkeletonComponent } from '@components/CategoriesList/CategoriesListSkeleton.component';
import { POPULAR_CATEGORY } from '@constants/categories.const';
import useCategory from '@hooks/useCategory';
import { useGetCategories } from '@hooks/useGetCategories';
import { Button, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

interface CategoryListProps {
  onSelectCategory?: (categoryId?: string) => void;
}

export function CategoriesListComponent({ onSelectCategory }: CategoryListProps) {
  const { categoryKey } = useParams<'categoryKey'>();
  const { data: categories, isLoading, error } = useGetCategories();
  const { setCategory } = useCategory();
  const location = useLocation();

  useEffect(() => {
    if (!categories) {
      return;
    }

    const currentKey = location.pathname !== '/' ? categoryKey : POPULAR_CATEGORY;
    const category = categories.results.find(({ key }) => key === currentKey) || null;

    setCategory(category);
  }, [categories, categoryKey, location, setCategory]);

  return (
    <>
      {error && <p>Error: {String(error)}</p>}
      {isLoading && <CategoriesListSkeletonComponent />}
      <Button
        sx={{ borderRadius: 4, textTransform: 'none', display: { xs: 'flex', sm: 'none' } }}
        component={Link}
        to="/catalog"
        size="medium"
        variant="text"
      >
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontSize: '16px',
            textAlign: 'left',
            width: '100%',
            pl: '8px',
            pt: '16px',
            color: '#000000DE',
            fontWeight: '600',
          }}
        >
          Catalog
        </Typography>
      </Button>
      {categories && (
        <List>
          {categories.results
            .filter(({ key }) => key !== POPULAR_CATEGORY)
            .map((category) => (
              <ListItem key={category.id} disablePadding onClick={() => onSelectCategory?.()}>
                <ListItemButton
                  component={Link}
                  to={`/categories/${category.key}`}
                  selected={category.key === categoryKey}
                  onClick={() => setCategory(category)}
                >
                  <ListItemText primary={category.name.en} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      )}
    </>
  );
}
