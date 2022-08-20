import { PencilAltIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { ShopAgent } from '../../app/models/shopAgent';
import { ShopAgentType } from '../../app/models/shopAgentType';
import { agentsSelectors, updateShopAgent } from '../../app/slices/agentsSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import AppButton from '../common/AppButton';
import AgentForm from '../forms/AgentForm';
import PaymentDialog from '../payment/PaymentDialog';
import AgentDeleteDialog from './AgentDeleteDialog';
import AgentPaymentsList from './AgentPaymentsList';

interface Props {
  agentId: string;
  onClose: () => void;
}

export default function AgentDetails({ agentId, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [addPayment, setAddPayment] = useState(false);

  const agent = useAppSelector((state) =>
    agentsSelectors.selectById(state, agentId)
  );

  function handleUpdate(value: ShopAgent) {
    dispatch(updateShopAgent({ id: value.id, changes: value }));
  }

  if (!agent) return <div>No Item</div>;

  if (addPayment)
    return (
      <div className='relative max-w-xl select-none '>
        <PaymentDialog
          shopAgentId={agent.id}
          type={agent.type}
          onClose={(value) => {
            if (value) {
            }
            setAddPayment(false);
          }}
        />
      </div>
    );

  if (isEdit)
    return (
      <AgentForm
        shopAgent={agent}
        type={agent.type}
        onClose={(value) => {
          if (value) {
            handleUpdate(value);
          }
          setIsEdit(false);
        }}
      />
    );

  if (isDelete)
    return (
      <AgentDeleteDialog
        shopAgent={agent}
        onClose={() => {
          setIsDelete(false);
        }}
      />
    );
  return (
    <div className='relative flex min-w-[40vw] select-none flex-col  items-stretch'>
      <div className=' mb-5'>
        <small className=' font-secondary text-xs uppercase '>
          {agent.type === ShopAgentType.client ? 'Client' : 'Fournisseur'}
        </small>
        <p className=' mb-2 font-Primary text-4xl font-thin capitalize'>
          {agent.name}
        </p>
        <div className=''>
          <p className=' font-secondary text-sm uppercase '>{agent.address1}</p>
          <p className=' font-secondary text-sm uppercase '>{agent.address2}</p>
          <p className=' font-secondary text-sm uppercase '>{agent.email}</p>
          <p className=' font-secondary text-sm uppercase '>
            {agent.phone} {agent.mobile}
          </p>
        </div>
      </div>

      <div className=' my-4 flex flex-row items-center justify-end gap-x-4'>
        <AppButton
          onClick={() => setIsEdit(true)}
          type='button'
          label='Modifier'
          Icon={PencilAltIcon}
          genre='warning'
        />
        <AppButton
          onClick={() => setIsDelete(true)}
          type='button'
          label='Supprimer'
          Icon={TrashIcon}
          genre={'error'}
        />
      </div>

      <div className='grid grid-cols-3 border-y border-y-gray-300 py-5 '>
        <div className={`text-center `}>
          <small className=' font-Primary text-sm font-thin uppercase'>
            Total
          </small>
          <p className=' font-Primary text-2xl font-light'>
            {agent.total.toFixed(2)}
            <span className='font-secondary text-xs uppercase'> DA</span>
          </p>
        </div>
        <div className=' text-center'>
          <small className=' font-Primary text-sm font-thin uppercase'>
            Payé
          </small>
          <p className=' font-Primary text-2xl font-light'>
            {agent.paid.toFixed(2)}
            <span className='font-secondary text-xs uppercase'> DA</span>
          </p>
        </div>
        <div className={`text-center `}>
          <small className=' font-Primary text-sm font-thin uppercase'>
            Reste
          </small>
          <p
            className={`font-Primary text-2xl ${
              agent.debt > 0
                ? ' font-bold text-red-600'
                : ' font-light text-inherit'
            }`}
          >
            <span>{agent.debt.toFixed(2)}</span>
            <span className='font-secondary text-xs uppercase'> DA</span>
          </p>
        </div>
      </div>

      <div className='mt-4'>
        <AgentPaymentsList agentId={agent.id} />
      </div>

      <div className=' mt-10 flex flex-row items-center justify-end'>
        {agent.debt > 0 && (
          <AppButton
            onClick={() => setAddPayment(true)}
            type='button'
            label='Ajouter un paiement'
            genre='primary'
            Icon={PlusIcon}
          />
        )}
      </div>

      <div className=' mt-5 w-full'>
        <AppButton
          onClick={() => onClose()}
          type='button'
          label='Fermer'
          genre='secondary'
          className='w-full'
        />
      </div>
    </div>
  );
}
