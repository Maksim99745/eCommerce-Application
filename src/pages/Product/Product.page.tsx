import { useParams } from 'react-router-dom';

function ProductPage() {
  const { productKey = '' } = useParams<'productKey'>();

  return <h1>{productKey}</h1>;
}

export default ProductPage;
