import { useGetProduct } from '@hooks/useGetProduct';
// import { useShowMessage } from '@hooks/useShowMessage';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { productKey = '' } = useParams<'productKey'>();
  const { data } = useGetProduct(productKey);
  // const showMessage = useShowMessage();

  return <h1>{data?.name.en}</h1>;
}

export default ProductPage;
