import agent from '../../app/api/agent';
import { ShopAgent } from '../../app/models/shopAgent';
import { ShopAgentType } from '../../app/models/shopAgentType';
import { removeProduct } from '../../app/slices/productsSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import AppButton from '../common/AppButton';

interface Props {
  shopAgent: ShopAgent;
  onClose: () => void;
}

export default function AgentDeleteDialog({ shopAgent, onClose }: Props) {
  const dispatch = useAppDispatch();

  async function handleDelete(shopAgent: ShopAgent) {
    try {
      const result = await agent.Agents.delete(shopAgent.id);

      if (result) {
        dispatch(removeProduct(shopAgent.id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  }
  return (
    <div className='flex w-full max-w-lg flex-col '>
      <div className='mb-4 flex flex-initial flex-row'>
        <div>
          <small className=' font-Primary text-sm font-thin uppercase'>
            {shopAgent.type === ShopAgentType.client ? 'client' : 'fournisseur'}
          </small>
          <p className=' font-Primary text-4xl font-thin capitalize'>
            {shopAgent.name}
          </p>
        </div>
      </div>

      <div className='py-5  font-Secondary'>
        <p className=' '>
          <span className='font-semibold uppercase text-red-600'>
            Attention!
          </span>{' '}
          cette action est irreversible.
        </p>
        <p>
          Êtes vous sure de vouloir supprimer ce{' '}
          {shopAgent.type === ShopAgentType.client ? 'client' : 'fournisseur'}?
        </p>
      </div>

      <div className=' grid w-full flex-initial grid-cols-2 gap-4'>
        <AppButton
          label=' Oui'
          type='button'
          onClick={() => handleDelete(shopAgent)}
          genre={'error'}
        />

        <AppButton
          label=' Non'
          type='button'
          onClick={() => onClose()}
          genre={'secondary'}
        />
      </div>
    </div>
  );
}
