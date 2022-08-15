import {PlusIcon} from '@heroicons/react/solid';
import {useState} from 'react';
import {Product} from '../../app/models/product';
import {useAppSelector} from '../../app/store/configureStore';
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
      <Layout className='flex-col flex py-10'>
        <div className=' container mx-auto px-5 select-none flex flex-col gap-y-5 py-5 flex-1 '>
          <div className=' flex-initial'>
            <ShopDetailsHeader
              name={shop.name}
              tablesCount={shop.tablesCount}
              productsCount={shop.productsCount}
              operationsCount={shop.operationsCount}
            />
          </div>

          <div className='flex-initial  py-5 px-5 lg:px-10 rounded-md drop-shadow-md font-Secondary text-base'>
            <div className=' flex flex-row items-center justify-between  mb-5'>
              <p className=' font-Primary text-2xl uppercase font-thin'>
                Propriétaire
              </p>
            </div>
            <div className='grid lg:grid-cols-2 gap-5'>
              <ShopDetailsOwner owner={shop.owner} />
            </div>
          </div>

          <div className='static flex-1 flex flex-col  bg-gray-200 dark:bg-gray-900 py-5 px-5 lg:px-10 rounded-md drop-shadow-md border border-gray-300 dark:border-gray-800 font-Secondary text-base'>
            <div className=' flex flex-row items-center justify-between  mb-5'>
              <p className=' font-Primary text-2xl uppercase font-thin'>
                Articles
              </p>
              <button
                type='button'
                onClick={() => addNewProduct()}
                className=' bg-gray-800 text-white font-Primary text-base uppercase font-thin px-5 py-1 rounded-md inline-flex items-center'
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
        <Layout className=' fixed z-[5] top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80'>
          <div className=' bg-white dark:bg-gray-800  rounded-md py-5 px-10'>
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
