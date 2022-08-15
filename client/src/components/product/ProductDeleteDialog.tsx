import agent from '../../app/api/agent';
import {Product} from '../../app/models/product';
import {removeProduct} from '../../app/slices/shopSlice';
import {useAppDispatch} from '../../app/store/configureStore';
import AppButton from '../common/AppButton';

interface Props {
  product: Product;
  onClose: (success?: boolean) => void;
}

export default function ProductDeleteDialog({ product, onClose }: Props) {
  const dispatch = useAppDispatch();
  async function handleDelete(product: Product) {
    try {
      const result = await agent.Products.delete(product.id);

      if (result) {
        dispatch(removeProduct(product.id));
      }
      onClose(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='max-w-lg w-full flex flex-col '>
      <div className='mb-4 flex flex-row flex-initial'>
        <div className='px-5'>
          <img
            src={product.pictureUrl}
            alt=''
            className=' h-20 w-20 object-scale-down'
          />
        </div>
        <div>
          <small className=' font-Primary text-sm font-thin uppercase'>
            {product.category}
          </small>
          <p className=' font-Primary text-4xl font-thin capitalize'>
            {product.name}
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
        <AppButton
          label='Oui'
          type='button'
          genre='error'
          onClick={() => handleDelete(product)}
        />

        <AppButton
          label='Non'
          onClick={() => onClose()}
          type='button'
          genre='secondary'
        />
      </div>
    </div>
  );
}
