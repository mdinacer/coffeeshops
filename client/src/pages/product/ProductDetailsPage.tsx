import {PencilAltIcon, TrashIcon} from '@heroicons/react/outline';
import {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import agent from '../../app/api/agent';
import useProductBatches from '../../app/hooks/useProductBatches';
import LoadingAnimation from '../../app/layout/LoadingAnimation';
import {Product} from '../../app/models/product';
import AppButton from '../../components/common/AppButton';
import AppDialog from '../../components/common/AppDialog';
import ProductForm from '../../components/forms/ProductForm';
import Layout from '../../components/Layout';
import ProductBatchList from '../../components/product/ProductBatchList';
import ProductDeleteDialog from '../../components/product/ProductDeleteDialog';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { state }: any | null = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [productLoaded, setProductLoaded] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { batches, batchesLoaded, batchesLoading } = useProductBatches(
    product?.id
  );

  const fetchProduct = useCallback(async (productId: string) => {
    setProductLoading(true);
    try {
      const result = await agent.Products.get(productId);
      setProduct(result);
      setProductLoaded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setProductLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id && !productLoaded) {
      fetchProduct(id);
    }
  }, [id, productLoaded]);

  if (productLoading)
    return (
      <div className=' select-none bg-gray-900 text-white border-indigo-500 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50'>
        <div className='flex flex-col items-center justify-center'>
          <LoadingAnimation />
          <p className=' font-Primary text-3xl lg:text-5xl font-thin uppercase mt-5'>
            Chargement en cours...
          </p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className=' flex items-center justify-center h-full w-full'>
        <p className=' font-Primary text-2xl md:text-5xl uppercase opacity-10'>
          élément introuvable
        </p>
      </div>
    );

  return (
    <Layout
      className='px-5 py-5 flex flex-col '
      dialogVisible={isEdit || isDelete}
      dialogContent={
        <>
          {isEdit && (
            <AppDialog>
              <ProductForm
                product={product}
                onClose={(product) => {
                  if (product) {
                    setProduct((prev) => ({ ...prev, ...product }));
                  }
                  setIsEdit(false);
                }}
              />
            </AppDialog>
          )}

          {isDelete && (
            <AppDialog>
              <ProductDeleteDialog
                product={product}
                onClose={(value) => {
                  if (value) navigate(state.from || '/');
                  setIsDelete(false);
                }}
              />
            </AppDialog>
          )}
        </>
      }
    >
      <div className=' w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-5  bg-gray-100 p-5 rounded-2xl'>
        <div className=' flex flex-row items-center '>
          <div className='lg:px-5 px-0 pr-3 mx-auto md:mx-0 py-5 md:py-0 md:my-auto'>
            <img
              src={product.pictureUrl}
              alt={product.name}
              className=' h-20 w-20 md:h-28 md:w-28 object-scale-down'
            />
          </div>
          <div>
            <small className=' font-Primary text-base md:text-lg font-thin uppercase'>
              {product.category}
            </small>
            <p className=' font-Primary text-3xl md:text-5xl lg:text-7xl  font-thin capitalize'>
              {product.name}
            </p>
          </div>
        </div>

        <div className=' flex flex-row  items-center gap-x-4 justify-around w-full md:w-auto'>
          <AppButton
            label='Supprimer'
            Icon={TrashIcon}
            onClick={() => setIsDelete(true)}
            type='button'
            genre='error'
          />
          <AppButton
            label='Modifier'
            Icon={PencilAltIcon}
            onClick={() => setIsEdit(true)}
            type='button'
            genre='warning'
          />
        </div>
      </div>

      <div className='border-y border-gray-200 py-5 flex-initial bg-gray-100 p-5 rounded-2xl'>
        <div className='grid md:grid-cols-6  gap-y-3 '>
          <StatItem
            title={'Prix'}
            value={product.price.toFixed(2)}
            prefix='Da'
          />
          <StatItem title={'Quantité'} value={product.quantity} />
          <StatItem title={'Vendu'} value={product.soldQuantity} />
          <StatItem
            title={'Vente Moyenne'}
            value={product.averageSale}
            prefix='/ jour'
            fallBack='indisponible'
          />
          <StatItem
            title={'Stock'}
            value={product.useInventory ? product.inventory : null}
          />

          <StatItem
            title={'Profit'}
            value={product.currentProfit.toFixed(2)}
            prefix='Da'
          />
        </div>
        {!product.useInventory && (
          <p className='w-full font-Secondary text-center text-sm opacity-50 italic pt-4'>
            Inventaire non applicable
          </p>
        )}
      </div>

      {product.useInventory && batchesLoaded && (
        <div className='mt-10 flex-auto flex flex-col overflow-hidden bg-gray-100 px-2 py-5 md:px-6 md:py-6 rounded-2xl'>
          <p className=' font-Primary text-2xl uppercase font-thin mb-5 flex-initial px-3 '>
            Lots
          </p>
          {batchesLoading && <div>loading</div>}
          {batchesLoaded && <ProductBatchList batches={batches} />}
        </div>
      )}
    </Layout>
  );
}

interface StatItemProps {
  title: string;
  value?: any;
  prefix?: string;
  fallBack?: string;
}

function StatItem({ title, value, prefix, fallBack = 'N/A' }: StatItemProps) {
  return (
    <div
      className={`text-center flex flex-row md:flex-col w-full justify-between   md:justify-center items-end md:items-center md:gap-y-1  `}
    >
      <div>
        <small className='  font-Primary text-base font-thin uppercase min-w-[8rem]'>
          {title}
        </small>
      </div>
      <div className='md:flex-auto md:w-full flex items-center justify-center'>
        {value ? (
          <p>
            <span className=' font-Primary text-lg md:text-3xl font-light'>
              {value}
            </span>
            {prefix && (
              <span className='font-Primary text-sm ml-1 font-light'>
                {prefix}
              </span>
            )}
          </p>
        ) : (
          <p className=' font-Primary text-lg uppercase font-thin opacity-50'>
            {fallBack}
          </p>
        )}
      </div>
    </div>
  );
}
