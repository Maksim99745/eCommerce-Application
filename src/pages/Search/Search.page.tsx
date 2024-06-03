import ProductListComponent from '@components/ProductList/ProductList.component';
import { Paper, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || undefined;

  return (
    <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
      <Typography variant="h4" sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
        Search: {query}
      </Typography>

      <ProductListComponent query={query} />
    </Paper>
  );
}

export default SearchPage;
