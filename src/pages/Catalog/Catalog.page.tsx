import { POPULAR_CATEGORY } from '@constants/categories.const';
import useCategory from '@hooks/useCategory';
import { Box, Button, ButtonProps, Container, Stack, Typography } from '@mui/material';
import ProductListComponent from '@components/ProductList/ProductList.component';
import { CatalogPageSkeleton } from '@pages/Catalog/Catalog.page.skeleton';
import DiscountIcon from '@mui/icons-material/Discount';
import { GetPromoCodesDialog } from './components/GetPromoCodesDialog';

function GetPromoCode(props: ButtonProps) {
  return (
    <Button variant="contained" startIcon={<DiscountIcon />} color="warning" {...props}>
      Get promo code
    </Button>
  );
}

function CatalogPage() {
  const { category, isCategoryLoading } = useCategory();

  const isPopular = category?.key === POPULAR_CATEGORY;
  const productPath = isPopular ? '/' : './';

  if (isCategoryLoading) {
    return <CatalogPageSkeleton />;
  }

  return (
    <Container maxWidth="xl" sx={{ p: { xs: 1, md: 2 }, height: '100%' }}>
      <Stack gap={2} sx={{ height: '100%' }}>
        <GetPromoCodesDialog openControl={GetPromoCode} disabled={isCategoryLoading} />
        <Box
          sx={{
            width: '100%',
            minHeight: '200px',
            position: 'relative',
            backgroundImage: `url("${category?.description?.en || 'https://images.prom.ua/5906359888_5906359888.jpg'}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 3,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              position: 'absolute',
              top: 10,
              left: 20,
              color: 'white',
              fontWeight: 'bold',
              textShadow:
                '3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8)',
            }}
          >
            {category?.name?.en || 'Products Catalog'}
          </Typography>
        </Box>
        <ProductListComponent productPath={productPath} />
      </Stack>
    </Container>
  );
}

export default CatalogPage;
