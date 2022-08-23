import { PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { Product } from '../../app/models/product';
import { useAppSelector } from '../../app/store/configureStore';
import ProductForm from '../../components/forms/ProductForm';
import Layout from '../../components/Layout';
import ShopProductsList from '../../components/product/ShopProductsList';
import ShopDetailsHeader from '../../components/shop/ShopDetailsHeader';
import ShopDetailsOwner from '../../components/shop/ShopDetailsOwner';

export default function ShopDetailsPage() {
  const { shop } = useAppSelector((state) => state.shop);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [productFormVisible, setProductFormVisible] = useState(false);

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
    //setProductFormVisible(true);
  }

  const addNewProduct = () => {
    setSelectedProduct(undefined);
    setProductFormVisible(true);
  };

  const closeForm = () => {
    //setSelectedProduct(undefined);
    setProductFormVisible(false);
  };

  if (!shop) return <div>No Shop</div>;

  return (
    <>
      <Layout className='flex flex-col py-10'>
        <div className=' container mx-auto flex flex-1 select-none flex-col gap-y-5 px-5 py-5 '>
          <div className=' flex-initial'>
            <ShopDetailsHeader
              name={'test'}
              tablesCount={shop.tablesCount}
              productsCount={shop.productsCount}
              operationsCount={shop.operationsCount}
            />
          </div>

          <div className='flex-initial  rounded-md py-5 px-5 font-Secondary text-base drop-shadow-md lg:px-10'>
            <div className=' mb-5 flex flex-row items-center  justify-between'>
              <p className=' font-Primary text-2xl font-thin uppercase'>
                Propriétaire
              </p>
            </div>
            <div className='grid gap-5 lg:grid-cols-2'>
              <ShopDetailsOwner owner={shop.owner} />
            </div>
          </div>

          <div className='static flex flex-1 flex-col  rounded-md border border-gray-300 bg-gray-200 py-5 px-5 font-Secondary text-base drop-shadow-md dark:border-gray-800 dark:bg-gray-900 lg:px-10'>
            <div className=' mb-5 flex flex-row items-center  justify-between'>
              <p className=' font-Primary text-2xl font-thin uppercase'>
                Articles
              </p>
              <button
                type='button'
                onClick={() => addNewProduct()}
                className=' inline-flex items-center rounded-md bg-gray-800 px-5 py-1 font-Primary text-base font-thin uppercase text-white'
              >
                <PlusIcon className='h-6 w-6 md:mr-2' />
                <span className=' hidden md:inline-block'>
                  Ajouter un produit
                </span>
              </button>
            </div>
            <ShopProductsList onSelect={handleSelectProduct} />
          </div>
        </div>
      </Layout>

      {productFormVisible && (
        <Layout className=' fixed top-0 left-0 right-0 bottom-0 z-[5] flex items-center justify-center bg-black bg-opacity-80'>
          <div className=' rounded-md bg-white  py-5 px-10 dark:bg-gray-800'>
            <ProductForm
              product={selectedProduct}
              onClose={() => closeForm()}
            />
          </div>
        </Layout>
      )}
    </>
  );
}
