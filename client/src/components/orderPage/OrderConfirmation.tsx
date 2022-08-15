import {UserAddIcon} from '@heroicons/react/solid';
import {useState} from 'react';
import agent from '../../app/api/agent';
import useAgents from '../../app/hooks/useAgents';
import {OperationElement} from '../../app/models/OperationElement';
import {OperationType} from '../../app/models/OperationType';
import {ShopAgentType} from '../../app/models/shopAgentType';
import AppButton from '../common/AppButton';
import TextField from '../fields/TextField';
import AgentForm from '../forms/AgentForm';
import DropDown from '../input/DropDown';

interface Props {
  elements: OperationElement[];
  operationTotal: number;
  table?: number;
  type?: OperationType;
  onClose: (value?: any | null | undefined) => void;
}

type AgentListItem = { title: string; value: any };

export default function OrderConfirmation({
  elements = [],
  operationTotal = 0,
  table,
  type = OperationType.sale,
  onClose,
}: Props) {
  const agentType =
    type === OperationType.sale ? ShopAgentType.client : ShopAgentType.provider;

  const { agents, agentsLoading, addAgent } = useAgents(agentType);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [total] = useState(operationTotal);
  const [paidAmount, setPaidAmount] = useState(0);
  const [agentFormVisible, setAgentFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const agentsList = (): AgentListItem[] => {
    return [
      { title: '', value: null },
      ...agents.map((agent) => ({
        title: agent.name,
        value: agent.id,
      })),
    ];
  };

  const isDebt = () => {
    return total > paidAmount;
  };

  const remainAmount = () => {
    return Math.abs(total - paidAmount);
  };

  async function submitOperation() {
    if (elements.length > 0) {
      setIsSubmitting(true);
      try {
        const items = elements.map((element) => ({
          productId: element.productId,
          quantity: element.quantity,
          price: element.price,
          expiryDate: element.expiryDate,
        }));

        const operation = {
          elements: items,
          table: table,
          type,
          agentId: selectedAgent,
          paid: paidAmount > total ? total : paidAmount,
        };

        const result = await agent.Operations.create(operation);
        onClose(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  if (agentFormVisible)
    return (
      <AgentForm
        type={agentType}
        onClose={(agent) => {
          if (agent) {
            addAgent(agent);
            setSelectedAgent(agent.id);
          }
          setAgentFormVisible(false);
        }}
      />
    );

  return (
    <div className='w-full flex flex-col items-stretch gap-y-5'>
      <div className='flex flex-col gap-y-3 border-b border-b-gray-200 pb-4'>
        <div className=' inline-flex justify-between items-end w-full'>
          <p className='font-Primary text-base uppercase'>Total</p>
          <p className=' font-Primary text-2xl font-thin'>
            {total.toFixed(2)} Da
          </p>
        </div>
        <div className=' inline-flex justify-between items-end w-full'>
          <p className='font-Primary text-base uppercase'>Payé</p>
          <p className=' font-Primary text-2xl font-thin'>
            {paidAmount.toFixed(2)} Da
          </p>
        </div>
        <div className=' inline-flex justify-between items-end w-full'>
          <p className='font-Primary text-base uppercase'>
            {isDebt() ? 'Reste' : 'Monnaie'}
          </p>
          <p
            className={`font-Primary text-2xl font-thin transition-all duration-300 ${
              remainAmount() === 0
                ? 'text-inherit'
                : isDebt()
                ? 'text-red-600 dark:text-red-400'
                : 'text-green-600'
            }`}
          >
            {Math.ceil(remainAmount()).toFixed(2)} Da
          </p>
        </div>
      </div>

      <div className='w-full flex flex-col gap-y-3 '>
        <TextField
          type='number'
          inputStyles='text-center'
          value={paidAmount}
          min={0}
          className='text-center'
          label='Montant payé'
          onChange={(value: any) => setPaidAmount(+value)}
        />
        <DropDown
          disabled={agentsLoading}
          selectedValue={selectedAgent}
          className='flex-auto'
          label={agentType === ShopAgentType.client ? 'Client' : 'Fournisseur'}
          items={agentsList()}
          onChange={(item) => {
            setSelectedAgent(item ? item.value : null);
          }}
          button={
            <AppButton
              type='button'
              genre='outline'
              className=' border-none rounded-none'
              Icon={UserAddIcon}
              onClick={() => setAgentFormVisible(true)}
              title={`Ajouter un ${
                agentType === ShopAgentType.client ? 'client' : 'fournisseur'
              }`}
              label={''}
            />
          }
        />
      </div>

      <div className=' grid xl:grid-cols-2 gap-5 mt-5 '>
        <AppButton
          label={'Fermer'}
          disabled={isSubmitting}
          onClick={() => onClose()}
          type='button'
          genre='secondary'
        />

        <AppButton
          label={isSubmitting ? 'Validation' : 'Valider'}
          disabled={isSubmitting}
          onClick={() => submitOperation()}
          type='button'
        />
      </div>
    </div>
  );
}
