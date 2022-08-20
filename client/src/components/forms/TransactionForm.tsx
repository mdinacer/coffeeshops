import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FieldValues, useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import { ShopTransaction } from '../../app/models/shopTransaction';
import { TransactionDirection } from '../../app/models/TransactionDirection';
import { TransactionValidationSchema } from '../../app/validation/transactionValidationSchema';
import AppButton from '../common/AppButton';
import AppButtonSelect from '../common/AppButtonSelect';
import NumberInput from '../input/NumberInput';
import TextArea from '../input/TextArea';

interface Props {
  onClose: (transaction?: ShopTransaction) => void;
}

export default function TransactionForm({ onClose }: Props) {
  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid },
  } = useForm<FieldValues | any, any>({
    mode: 'all',
    resolver: yupResolver(TransactionValidationSchema),
    defaultValues: {
      amount: 0,
      description: '',
      direction: 1,
    },
  });

  async function handleSubmitData(values: FieldValues) {
    console.log(values);
    try {
      var response = await agent.Transactions.create({
        ...values,
        direction: +values.direction,
      });
      if (response) {
        onClose(response);
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <p className=' text-3xl'>Ajouter une transaction</p>
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className='my-5 flex flex-col items-stretch gap-y-5'
      >
        <NumberInput
          control={control}
          placeholder={''}
          name={'amount'}
          label='Montant'
        />

        <AppButtonSelect
          label='Direction du flux'
          items={[
            { title: 'entrant', value: 0 },
            { title: 'sortant', value: 1 },
          ]}
          selectedValue={watch('direction')}
          onChange={(item) => {
            if (item) {
              setValue('direction', item.value);
            }
          }}
        />

        <TextArea
          control={control}
          placeholder={''}
          label='Description'
          name={'description'}
        />

        <div className=' grid grid-cols-2 gap-4'>
          <AppButton
            onClick={() => onClose()}
            type='button'
            genre='secondary'
            label='Annuler'
          />
          <AppButton
            disabled={isSubmitting || !isValid}
            type='submit'
            genre='info'
            label='Enregistrer'
          />
        </div>
      </form>
    </div>
  );
}
