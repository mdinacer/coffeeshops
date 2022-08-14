import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import { ProductSmall } from '../../app/models/product';
import DropDown from '../input/DropDown';

export default function ProductLossDialog() {
  const [products, setProducts] = useState<ProductSmall[]>([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm({
    mode: 'all',
    //resolver: yupResolver(OperationValidationSchema),
  });

  const productsList = () => {
    return products.map((p) => ({ title: p.name, value: p.id }));
  };

  const fetchProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      const result: ProductSmall[] = await agent.Products.listAll();
      console.log(result);

      setProducts(result);

      setProductsLoaded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  async function handleSubmitData(data: FieldValues) {}

  useEffect(() => {
    if (!productsLoaded) {
      fetchProducts();
    }
  }, [fetchProducts, productsLoaded]);
  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <DropDown
          label={'Article'}
          items={productsList()}
          onChange={(item) => {
            setValue('productId', item.value);
          }}
          className=' flex-auto'
        />
      </form>
    </div>
  );
}
