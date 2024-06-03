import useCategory from '@hooks/useCategory';
import useProduct from '@hooks/useProduct';
import { Breadcrumb } from '@models/breadcrumbs.model';
import { useLocation } from 'react-router-dom';

export const useBreadcrumbs = () => {
  const location = useLocation();
  const { category } = useCategory();
  const { product, isProductLoading } = useProduct();
  const paths = location.pathname.split('/');

  const breadcrumbs: Breadcrumb[] = [];

  for (let i = 0; i < paths.length; i += 1) {
    const breadcrumb: Breadcrumb = {
      label: paths[i],
      to: '/',
    };

    if (paths[i] === 'categories') {
      breadcrumb.label = category?.name.en || '...';
      i += 1;
    }

    if (paths[i] === 'catalog') {
      breadcrumb.label = 'catalog' || '...';
      i += 1;
    }

    if (paths[i] === 'products') {
      breadcrumb.label = isProductLoading || !product?.name.en ? '...' : product.name.en;
      i += 1;
    }

    breadcrumb.to = paths.slice(0, i + 1).join('/');
    breadcrumb.isLast = i === paths.length - 1;

    if (breadcrumb.label !== '') {
      breadcrumbs.push(breadcrumb);
    }
  }

  return { breadcrumbs };
};
