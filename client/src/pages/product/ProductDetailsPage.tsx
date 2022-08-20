import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import agent from '../../app/api/agent';
import useProductBatches from '../../app/hooks/useProductBatches';
import LoadingAnimation from '../../app/layout/LoadingAnimation';
import { Product } from '../../app/models/product';
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
  }, [fetchProduct, id, productLoaded]);

  if (productLoading)
    return (
      <div className=' fixed top-0 left-0 right-0 bottom-0 z-50 flex select-none items-center justify-center border-sky-500 bg-gray-900 text-white'>
        <div className='flex flex-col items-center justify-center'>
          <LoadingAnimation />
          <p className=' mt-5 font-Primary text-3xl font-thin uppercase lg:text-5xl'>
            Chargement en cours...
          </p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className=' flex h-full w-full items-center justify-center'>
        <p className=' font-Primary text-2xl uppercase opacity-10 md:text-5xl'>
          élément introuvable
        </p>
      </div>
    );

  return (
    <Layout
      className='flex flex-col px-5 py-5 '
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
      <div className=' mb-5 flex w-full flex-col items-start justify-between rounded-2xl bg-gray-100  p-5 md:flex-row md:items-end'>
        <div className=' flex flex-row items-center '>
          <div className='mx-auto px-0 py-5 pr-3 md:mx-0 md:my-auto md:py-0 lg:px-5'>
            <img
              src={product.pictureUrl}
              alt={product.name}
              className=' h-20 w-20 object-scale-down md:h-28 md:w-28'
            />
          </div>
          <div>
            <small className=' font-Primary text-base font-thin uppercase md:text-lg'>
              {product.category}
            </small>
            <p className=' font-Primary text-3xl font-thin capitalize  md:text-5xl lg:text-7xl'>
              {product.name}
            </p>
          </div>
        </div>

        <div className=' flex w-full  flex-row items-center justify-around gap-x-4 md:w-auto'>
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

      <div className='flex-initial rounded-2xl border-y border-gray-200 bg-gray-100 p-5 py-5'>
        <div className='grid gap-y-3  md:grid-cols-6 '>
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
          <p className='w-full pt-4 text-center font-Secondary text-sm italic opacity-50'>
            Inventaire non applicable
          </p>
        )}
      </div>

      {product.useInventory && batchesLoaded && (
        <div className='mt-10 flex flex-auto flex-col overflow-hidden rounded-2xl bg-gray-100 px-2 py-5 md:px-6 md:py-6'>
          <p className=' mb-5 flex-initial px-3 font-Primary text-2xl font-thin uppercase '>
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
      className={`flex w-full flex-row items-end justify-between text-center   md:flex-col md:items-center md:justify-center md:gap-y-1  `}
    >
      <div>
        <small className='  min-w-[8rem] font-Primary text-base font-thin uppercase'>
          {title}
        </small>
      </div>
      <div className='flex items-center justify-center md:w-full md:flex-auto'>
        {value ? (
          <p>
            <span className=' font-Primary text-lg font-light md:text-3xl'>
              {value}
            </span>
            {prefix && (
              <span className='ml-1 font-Primary text-sm font-light'>
                {prefix}
              </span>
            )}
          </p>
        ) : (
          <p className=' font-Primary text-lg font-thin uppercase opacity-50'>
            {fallBack}
          </p>
        )}
      </div>
    </div>
  );
}
