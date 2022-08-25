import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import { setShopId } from '../../app/slices/accountSlice';
import { setShop } from '../../app/slices/shopSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { CreateShopSchema } from '../../app/validation/shopValidationSchema';
import AppButton from '../common/AppButton';
import NumberInput from '../input/NumberInput';
import TextInput from '../input/TextInput';

interface Props {
  onClose?: () => void;
}

export default function ShopForm({ onClose }: Props) {
  const { shop } = useAppSelector((state) => state.shop);
  const isEdit = !!shop;
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(CreateShopSchema),
  });

  useEffect(() => {
    if (shop && !isDirty) {
      const item = {
        name: shop.name,
        tablesCount: shop.tablesCount,
      };
      reset(item);
    }
  }, [isDirty, reset, shop]);

  async function submitData(data: FieldValues) {
    let result = null;
    try {
      if (isEdit) {
        result = await agent.Shops.update(data);
      } else {
        result = await agent.Shops.create(data);
        dispatch(setShopId(result.id));
      }

      if (result && result.id) {
        dispatch(setShop(result));
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (onClose) {
        onClose();
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className='flex w-full flex-col gap-y-4'
    >
      <TextInput
        autoComplete='organization'
        control={control}
        placeholder={''}
        label='Nom du cafeteria'
        name={'name'}
      />
      <NumberInput
        control={control}
        placeholder={''}
        name={'tablesCount'}
        label='Nombre de tables'
        showButtons
      />

      {!isEdit && (
        <NumberInput
          control={control}
          placeholder={''}
          name={'initialAmount'}
          label='Montant initial'
        />
      )}

      <div className='mt-5 grid w-full grid-cols-2 gap-x-5'>
        <AppButton
          type='button'
          label='Annuler'
          genre='secondary'
          onClick={() => !!onClose && onClose()}
        />
        <AppButton
          disabled={!isValid || !isDirty}
          loading={isSubmitting}
          type='submit'
          label='Enregistrer'
          genre='info'
        />
      </div>
    </form>
  );
}
