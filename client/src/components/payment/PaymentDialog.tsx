import * as yup from 'yup';
import { useEffect, useState } from 'react';
import useAgents from '../../app/hooks/useAgents';
import { ShopAgentType } from '../../app/models/shopAgentType';
import { ShopPayment } from '../../app/models/shopPayment';
import DropDown from '../input/DropDown';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import NumberInput from '../input/NumberInput';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { agentsSelectors, fetchAgentAsync } from '../../app/slices/agentsSlice';
import agent from '../../app/api/agent';
import TextArea from '../input/TextArea';
import { TransactionDirection } from '../../app/models/TransactionDirection';

interface Props {
  shopAgentId?: string;
  type: ShopAgentType;
  onClose: (payment?: ShopPayment) => void;
}

type AgentListItem = { title: string; value: any };

export default function PaymentDialog({ shopAgentId, type, onClose }: Props) {
  const dispatch = useAppDispatch();
  const { agents, agentsLoading } = useAgents(type, !shopAgentId);
  const [selectedAgentId, setSelectedAgentId] = useState<string | undefined>(
    shopAgentId
  );

  const shopAgent = useAppSelector((state) =>
    selectedAgentId ? agentsSelectors.selectById(state, selectedAgentId) : null
  );

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(
      yup.object({
        agentId: yup.string().required().min(3),
        description: yup.string().optional().nullable(),
        amount: yup
          .number()
          .required()
          .min(0)
          .max(
            shopAgent ? shopAgent.debt : 0,
            `Le montant ne doit pas dépasser la somme de ${shopAgent?.debt} Da`
          ),
      })
    ),
  });

  const agentsList = (): AgentListItem[] => {
    return [
      { title: '', value: null },
      ...agents.map((agent) => ({
        title: agent.name,
        value: agent.id,
      })),
    ];
  };

  async function submitData(data: FieldValues) {
    try {
      const result: ShopPayment = await agent.Payments.create(data);
      if (result) {
        await dispatch(fetchAgentAsync(result.agentId));
        onClose(result);
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getTransactionDirection = (type: ShopAgentType) => {
    return TransactionDirection[type];
  };

  useEffect(() => {
    if (shopAgent) {
      setValue('agentId', shopAgent.id, { shouldDirty: true });
      setValue('amount', shopAgent.debt, { shouldDirty: true });
      setValue('direction', getTransactionDirection(shopAgent.type), {
        shouldDirty: true,
      });
    }

    return () => {
      reset();
    };
  }, [reset, setValue, shopAgent]);

  useEffect(() => {
    if (selectedAgentId && !shopAgent) {
      dispatch(fetchAgentAsync(selectedAgentId));
    }
  }, [dispatch, selectedAgentId, shopAgent]);

  return (
    <div className='w-full'>
      {shopAgent && (
        <div className='mb-5'>
          <p className=' mb-2 font-Primary text-4xl font-thin capitalize'>
            {shopAgent?.name}
          </p>
        </div>
      )}

      <form
        className='flex w-full flex-col gap-y-5 '
        onSubmit={handleSubmit(submitData)}
      >
        {!shopAgent && !agentsLoading && agents.length > 0 && (
          <DropDown
            disabled={agentsLoading}
            selectedValue={selectedAgentId}
            className='flex-auto'
            label={type === ShopAgentType.client ? 'Client' : 'Fournisseur'}
            items={agentsList()}
            onChange={(item) => {
              setSelectedAgentId(item ? item.value : undefined);
            }}
          />
        )}
        {shopAgent ? (
          <div className='mb-5 grid grid-cols-3 border-y border-y-gray-300 py-5 '>
            <div className={`text-center `}>
              <small className=' font-Primary text-sm font-thin uppercase'>
                Total
              </small>
              <p className=' font-Primary text-2xl font-light'>
                {shopAgent.total.toFixed(2)}
                <span className='font-secondary text-xs uppercase'> DA</span>
              </p>
            </div>
            <div className=' text-center'>
              <small className=' font-Primary text-sm font-thin uppercase'>
                Payé
              </small>
              <p className=' font-Primary text-2xl font-light'>
                {shopAgent.paid.toFixed(2)}
                <span className='font-secondary text-xs uppercase'> DA</span>
              </p>
            </div>
            <div className={`text-center `}>
              <small className=' font-Primary text-sm font-thin uppercase'>
                Reste
              </small>
              <p
                className={`font-Primary text-2xl ${
                  shopAgent.debt > 0
                    ? ' font-bold text-red-600 dark:text-red-400'
                    : ' font-light text-inherit'
                }`}
              >
                <span>{shopAgent.debt.toFixed(2)}</span>
                <span className='font-secondary text-xs uppercase'> DA</span>
              </p>
            </div>
          </div>
        ) : (
          <div className='flex h-10 items-center justify-center border-y border-y-gray-300 py-5 '>
            <p className={`font-Primary text-2xl`}>Chargement</p>
          </div>
        )}

        <NumberInput
          control={control}
          placeholder={''}
          label='Montant'
          name={'amount'}
          min={0}
          max={shopAgent?.debt}
        />

        <TextArea
          control={control}
          placeholder={''}
          label='Description'
          rows={3}
          name={'description'}
        />

        <div className='mt-5 grid w-full grid-cols-2 gap-x-5'>
          <button
            type='button'
            onClick={() => onClose()}
            className={`${buttonStyle} cursor-pointer`}
          >
            Annuler
          </button>
          <input
            type='submit'
            disabled={!isValid || isSubmitting || !isDirty}
            value={isSubmitting ? 'Enregistrement en cours' : 'Enregistrer'}
            className={`${buttonStyle} ${
              isValid
                ? 'cursor-pointer bg-sky-500 text-white'
                : ' bg-gray-400 text-gray-300'
            }`}
          />
        </div>
      </form>
    </div>
  );
}
const buttonStyle =
  'border border-gray-400 font-Primary uppercase font-thin py-1';
