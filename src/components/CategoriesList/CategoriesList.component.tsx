import { CategoriesListSkeletonComponent } from '@components/CategoriesList/CategoriesListSkeleton.component';
import { POPULAR_CATEGORY } from '@constants/categories.const';
import useCategory from '@hooks/useCategory';
import { useGetCategories } from '@hooks/useGetCategories';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
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
