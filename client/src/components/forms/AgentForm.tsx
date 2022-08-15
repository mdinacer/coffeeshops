import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useEffect} from 'react';
import {FieldValues, useForm} from 'react-hook-form';
import agent from '../../app/api/agent';
import {ShopAgent} from '../../app/models/shopAgent';
import {ShopAgentType} from '../../app/models/shopAgentType';
import {AgentValidationSchema} from '../../app/validation/agentValidationSchema';
import AppButton from '../common/AppButton';
import TextInput from '../input/TextInput';

interface Props {
  type: ShopAgentType;
  shopAgent?: ShopAgent | null;
  onClose: (value?: ShopAgent) => void;
}

export default function AgentForm({ type, shopAgent, onClose }: Props) {
  const isEdit = !!shopAgent;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(AgentValidationSchema),
  });

  useEffect(() => {
    if (shopAgent && !isDirty) {
      const item = {
        name: shopAgent.name,
        email: shopAgent.email || '',
        phone: shopAgent.phone || '',
        mobile: shopAgent.mobile || '',
        address1: shopAgent.address1 || '',
        address2: shopAgent.address2 || '',
      };
      reset(item);
    }
  }, [isDirty, shopAgent, reset]);

  async function submitData(data: FieldValues) {
    let result = null;
    try {
      if (isEdit) {
        result = await agent.Agents.update(shopAgent.id, data);
      } else {
        result = await agent.Agents.create({ ...data, type });
      }

      if (result && result.id) {
        onClose(result);
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className='flex flex-col gap-y-4 w-full'
    >
      <TextInput control={control} placeholder={''} label='Nom' name={'name'} />

      <div className='grid grid-cols-1 gap-5'>
        <TextInput
          autoComplete='email'
          control={control}
          placeholder={''}
          type='email'
          label='Email'
          name={'email'}
        />
        <TextInput
          autoComplete='phone'
          control={control}
          placeholder={''}
          type='tel'
          label='Téléphone'
          name={'phone'}
        />
        <TextInput
          autoComplete='mobile'
          control={control}
          placeholder={''}
          type='tel'
          label='Mobile'
          name={'mobile'}
        />
      </div>
      <TextInput
        control={control}
        placeholder={''}
        label='Address'
        name={'address1'}
      />
      <TextInput
        control={control}
        placeholder={''}
        label='Address auxiliaire'
        name={'address2'}
      />

      <div className='w-full grid grid-cols-2 gap-x-5 mt-5'>
        <AppButton
          label='Fermer'
          type='button'
          onClick={() => onClose()}
          genre={'secondary'}
        />

        <AppButton
          label={isSubmitting ? 'Enregistrement en cours' : 'Enregistrer'}
          type='submit'
          genre={'secondary'}
          disabled={!isValid || isSubmitting || !isDirty}
        />
      </div>
    </form>
  );
}
