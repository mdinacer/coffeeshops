import {useEffect, useState} from 'react';
import agent from '../../app/api/agent';
import useProducts from '../../app/hooks/useProducts';
import {Product} from '../../app/models/product';
import {removeProduct, setPageNumber, setProductParams,} from '../../app/slices/shopSlice';
import {useAppDispatch} from '../../app/store/configureStore';
import ProductForm from '../forms/ProductForm';
import Pagination from '../input/Pagination';
import Layout from '../Layout';
import ShopProductCard from './ShopProductCard';

interface Props {
  onSelect: (product: Product) => void;
}

export default function ShopProductsList({ onSelect }: Props) {
  const dispatch = useAppDispatch();
  const { products, metaData, productsLoaded } = useProducts();
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  async function handlePageChange(page: number) {
    dispatch(setPageNumber({ pageNumber: page + 1 }));
  }

  async function handleDelete(product: Product) {
    try {
      const result = await agent.Products.delete(product.id);
      if (result) {
        dispatch(removeProduct(product.id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteDialogVisible(false);
    }
  }

  useEffect(() => {
    dispatch(setProductParams(initParams()));
  }, [dispatch]);

  if (!productsLoaded) return <div>Loading</div>;

  return (
    <>
      <div className='flex flex-col flex-1'>
        <div className='gap-y-5 md:gap-y-2 grid grid-cols-3 gap-5'>
          {products.map((product) => (
            <ShopProductCard
              product={product}
              onEdit={() => {
                setSelectedProduct(product);
                setEditDialogVisible(true);
              }}
              onDelete={(product) => {
                setSelectedProduct(product);
                setDeleteDialogVisible(true);
              }}
            />
          ))}
        </div>

        <div className=' mt-4'>
          {metaData && metaData.totalPages > 1 && (
            <Pagination metaData={metaData} onPageChange={handlePageChange} />
          )}
        </div>
      </div>

      {(deleteDialogVisible || editDialogVisible) && selectedProduct && (
        <Layout className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-70 '>
          <div>
            {deleteDialogVisible && (
              <div className=' bg-white dark:bg-gray-800 rounded-md py-5 px-10 max-w-lg w-full flex flex-col '>
                <div className='mb-4 flex flex-row flex-initial'>
                  <div className='px-5'>
                    <img
                      src={selectedProduct.pictureUrl}
                      alt=''
                      className=' h-20 w-20 object-scale-down'
                    />
                  </div>
                  <div>
                    <small className=' font-Primary text-sm font-thin uppercase'>
                      {selectedProduct.category}
                    </small>
                    <p className=' font-Primary text-4xl font-thin capitalize'>
                      {selectedProduct.name}
                    </p>
                  </div>
                </div>

                <div className='py-5  font-Secondary'>
                  <p className=' '>
                    <span className='text-red-600 font-semibold uppercase'>
                      Attention!
                    </span>{' '}
                    cette action est irreversible.
                  </p>
                  <p>Êtes vous sure de vouloir supprimer ce produit?</p>
                </div>

                <div className=' w-full grid grid-cols-2 gap-4 flex-initial'>
                  <button
                    type='button'
                    onClick={() => handleDelete(selectedProduct)}
                    className={buttonStyle + 'bg-red-600 rounded-md'}
                  >
                    Oui
                  </button>

                  <button
                    onClick={() => setDeleteDialogVisible(false)}
                    type='button'
                    className={buttonStyle + ' bg-gray-700 rounded-md'}
                  >
                    Non
                  </button>
                </div>
              </div>
            )}

            {editDialogVisible && (
              <div className=' bg-white dark:bg-gray-800  rounded-md py-5 px-10'>
                <ProductForm
                  product={selectedProduct}
                  onClose={() => setEditDialogVisible(false)}
                />
              </div>
            )}
          </div>
        </Layout>
      )}
    </>
  );
}

const buttonStyle = 'py-1 px-5 uppercase font-Primary font-thin text-white ';

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'id',
    showcase: undefined,
  };
}
