import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListPageLayout from '../../app/layout/ListPageLayout';
import { ShopAgent } from '../../app/models/shopAgent';
import { ShopAgentType } from '../../app/models/shopAgentType';
import { agentsSelectors, updateShopAgent } from '../../app/slices/agentsSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import AgentDeleteDialog from '../../components/agent/AgentDeleteDialog';
import AgentPaymentsList from '../../components/agent/AgentPaymentsList';
import AppButton from '../../components/common/AppButton';
import LoadingComponent from '../../components/common/LoadingComponent';
import AgentForm from '../../components/forms/AgentForm';
import PaymentDialog from '../../components/payment/PaymentDialog';
import { fetchAgentAsync } from '../../app/slices/agentsSlice';
import NotFound from '../../errors/NotFound';
import ModalDialog from '../../components/common/ModalDialog';
import { formatNumber } from '../../app/utils/utils';
import AppLink from '../../components/common/AppLink';

export default function AgentDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { status: agentsStatus } = useAppSelector((state) => state.agent);

  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [addPayment, setAddPayment] = useState(false);

  const agent = useAppSelector((state) =>
    id ? agentsSelectors.selectById(state, id) : null
  );

  function handleUpdate(value: ShopAgent) {
    dispatch(updateShopAgent({ id: value.id, changes: value }));
  }

  useEffect(() => {
    if (id && !agent) dispatch(fetchAgentAsync(id));
  }, [agent, dispatch, id]);

  if (agentsStatus.includes('pending')) return <LoadingComponent />;

  if (!agent) {
    return <NotFound />;
  }

  return (
    <>
      <ModalDialog title='Suppression' active={isDelete}>
        <AgentDeleteDialog
          shopAgent={agent}
          onClose={() => {
            setIsDelete(false);
          }}
        />
      </ModalDialog>

      <ModalDialog title='Modification' active={isEdit}>
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
      </ModalDialog>

      <ModalDialog title='Ajouter un paiement' active={addPayment}>
        <PaymentDialog
          shopAgentId={agent.id}
          type={agent.type}
          onClose={(value) => {
            if (value) {
            }
            setAddPayment(false);
          }}
        />
      </ModalDialog>

      <ListPageLayout
        className='m-auto h-auto text-stone-600 2xl:max-w-6xl'
        title={agent.name}
        stats={getStats(agent)}
        header={<Header agent={agent} />}
        list={<AgentPaymentsList agentId={agent.id} />}
        metaData={null}
        onPageChange={(page) => {}}
        actionButton={
          <div className=' my-4 flex flex-row items-center justify-end gap-x-1'>
            <AppLink
              toPath={`/reports/operations?agentId=${agent.id}`}
              label='Opérations'
              Icon={DocumentIcon}
              genre={'info'}
            />
            <AppButton
              onClick={() => setIsEdit(true)}
              type='button'
              label='Modifier'
              Icon={PencilSquareIcon}
              genre='warning'
            />
            <AppButton
              onClick={() => setIsDelete(true)}
              type='button'
              label='Supprimer'
              Icon={TrashIcon}
              genre={'error'}
            />

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
        }
      />
    </>
  );
}

const getStats = (agent: ShopAgent) => [
  {
    title: 'total',
    value: (
      <p className=''>
        {formatNumber(agent.total)}
        <span className='font-secondary text-xs uppercase'> DA</span>
      </p>
    ),
  },
  {
    title: 'payé',
    value: (
      <p className=''>
        {formatNumber(agent.paid)}
        <span className='font-secondary text-xs uppercase'> DA</span>
      </p>
    ),
  },
  {
    title: 'reste',
    value: (
      <p
        className={` ${
          agent.debt > 0 ? ' font-semibold text-red-500' : 'text-inherit'
        }`}
      >
        <span>{formatNumber(agent.debt)}</span>
        <span className='font-secondary text-xs uppercase'> DA</span>
      </p>
    ),
  },
];

function Header({ agent }: { agent: ShopAgent }) {
  return (
    <div className='font-secondary text-sm uppercase'>
      <p>{agent.type === ShopAgentType.client ? 'Client' : 'Fournisseur'}</p>
      <p>{agent.address1}</p>
      <p>{agent.address2}</p>
      <p>{agent.email}</p>
      <p>
        {agent.phone} {agent.mobile}
      </p>
    </div>
  );
}
