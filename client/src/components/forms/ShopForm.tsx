import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import agent from '../../app/api/agent';
import { setShopId } from '../../app/slices/accountSlice';
import { setShop } from '../../app/slices/shopSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  CreateShopSchema,
  EditShopSchema,
} from '../../app/validation/shopValidationSchema';
import NumberInput from '../input/NumberInput';
import TextInput from '../input/TextInput';

export default function ShopForm() {
  const { shop } = useAppSelector((state) => state.shop);
  const isEdit = !!shop;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const validationSchema = isEdit ? EditShopSchema : CreateShopSchema;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
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
        navigate('/management/');
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
      <TextInput
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

      <div className='w-full grid grid-cols-2 gap-x-5 mt-5'>
        <input type='button' value='Annuler' className={`${buttonStyle}`} />
        <input
          disabled={!isValid || !isDirty || isSubmitting}
          type='submit'
          value='Enregistrer'
          className={`${buttonStyle} ${
            isValid ? 'bg-gray-800 text-white' : ' bg-gray-400 text-gray-300'
          }`}
        />
      </div>
    </form>
  );
}
const buttonStyle =
  'border border-gray-400 font-Primary uppercase font-thin py-1';
