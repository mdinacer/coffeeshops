import {FieldValues, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';

import {Product} from '../../app/models/product';
import {useAppDispatch} from '../../app/store/configureStore';
import {CreateProductSchema, EditProductSchema,} from '../../app/validation/productValidationSchema';
import {useEffect, useState} from 'react';
import TextInput from '../input/TextInput';
import DropDown from '../input/DropDown';
import NumberInput from '../input/NumberInput';
import ImageDropZone from '../input/ImageDropZone';
import agent from '../../app/api/agent';
import {setProduct, updateProduct} from '../../app/slices/shopSlice';
import {ViewGridAddIcon} from '@heroicons/react/solid';

import TextArea from '../input/TextArea';
import ProductGalleryForm from './ProductGalleryForm';
import useProducts from '../../app/hooks/useProducts';
import CheckboxInput from '../input/Checkbox';
import AppDatePicker from '../input/DatePicker';
import AppButton from '../common/AppButton';

interface Props {
  product?: Product | undefined;
  onClose: (product?: Product) => void;
}
export default function ProductForm({ product, onClose }: Props) {
  const { categories } = useProducts();
  const isEdit = !!product;
  const dispatch = useAppDispatch();
  const validationSchema = isEdit ? EditProductSchema : CreateProductSchema;
  const [productGalleryVisible, setProductGalleryVisible] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | null | undefined>(null);

  const {
    watch,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const useInventory = watch('useInventory');
  const quantity = watch('quantity');
  const watchFile = watch('file', null);

  useEffect(() => {
    if (product && !watchFile && !isDirty) {
      const item = {
        name: product.name,
        quantity: product.quantity,
        categoryId: product.categoryId,
        description: product.description,
        price: product.price,
        showcase: product.showcase,
        useInventory: product.useInventory,
      };
      reset(item, { keepDirty: false });
    }

    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [watchFile, product, isDirty, reset]);

  function handleAddItem(item: any) {
    setValue('name', item.name);
    setValue('pictureUrl', item.pictureUrl);
    if (item.description) {
      setValue('description', item.description);
    }
  }

  const pictureUrl = watch('pictureUrl', null);

  async function submitData(data: FieldValues) {
    console.log(data);

    let result = null;
    try {
      if (isEdit) {
        result = await agent.Products.update(product.id, data);
        dispatch(updateProduct({ id: product.id, changes: result }));
      } else {
        result = await agent.Products.create(data);
        dispatch(setProduct(result));
      }
    } catch (error) {
      console.log(error);
    } finally {
      onClose(result);
      reset();
    }
  }

  if (productGalleryVisible)
    return (
      <ProductGalleryForm
        onExit={(item) => {
          if (item) {
            handleAddItem(item);
          }
          setProductGalleryVisible(false);
        }}
      />
    );
  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className='flex flex-col gap-y-4 w-full max-w-lg'
    >
      <TextInput
        control={control}
        placeholder={''}
        label={'Désignation'}
        name={'name'}
        className='w-full overflow-hidden '
        button={
          !isEdit && (
            <AppButton
              Icon={ViewGridAddIcon}
              label='Galerie'
              onClick={() => setProductGalleryVisible(true)}
              type='button'
              genre='outline'
              className='  border-none rounded-none'
            />
          )
        }
      />

      <DropDown
        selectedValue={watch('categoryId')}
        className='flex-auto'
        label='Catégorie'
        items={categories.map((category) => ({
          title: category.name,
          value: category.id,
        }))}
        onChange={(item) => setValue('categoryId', item.value)}
      />

      <TextArea
        placeholder={''}
        name={'description'}
        label='Description'
        control={control}
      />

      <div className='grid lg:grid-cols-2 gap-5'>
        <div className=' '>
          <NumberInput
            control={control}
            placeholder={''}
            label={'Prix'}
            name={'price'}
            prefix={'DA'}
            className=''
          />
        </div>

        <NumberInput
          control={control}
          placeholder={''}
          label={'Quantité'}
          name={'quantity'}
          min={0}
          showButtons
        />
      </div>

      <div className='grid md:grid-cols-2 gap-5'>
        <CheckboxInput control={control} label={'Vitrine'} name={'showcase'} />
        <CheckboxInput
          control={control}
          label={`Inventaire`}
          name={'useInventory'}
        />
      </div>

      {!isEdit && useInventory && quantity > 0 && (
        <div className=' grid grid-cols-1 gap-5 border-y border-gray-indigo-800 p-3 bg-gray-300 rounded '>
          <AppDatePicker
            label={'Date de péremption'}
            minDate={new Date()}
            selectedDate={expiryDate}
            onChange={(value) => {
              setExpiryDate(value);
              if (value) {
                setValue('expiryDate', value.toUTCString());
              }
            }}
          />
          <NumberInput
            control={control}
            placeholder={''}
            label={"Prix d'achat"}
            name={'purchasePrice'}
            prefix={'DA'}
          />

          <span className=' text-center text-xs font-Secondary italic opacity-50'>
            Facultatif
          </span>
        </div>
      )}
      <div className='grid md:grid-cols-2 gap-5 mt-4'>
        <div className=' bg-gray-100 border border-gray-300 rounded-lg py-5 '>
          <ImageDropZone control={control} name={'file'} />
        </div>

        <div className='flex items-center h-auto w-full overflow-hidden  bg-gray-100 border border-gray-300 rounded-lg '>
          {watchFile ? (
            <img
              className='object-fill object-center h-[140px] lg:h-[200px] w-full  '
              src={watchFile.preview}
              alt='preview'
            />
          ) : (
            <img
              className=' object-scale-down object-center h-[140px] lg:h-[200px] w-full  '
              src={product?.pictureUrl || pictureUrl}
              alt={product?.pictureUrl || pictureUrl}
            />
          )}
        </div>
      </div>
      <div className='w-full grid grid-cols-2 gap-x-5 mt-5'>
        <AppButton
          label='Annuler'
          onClick={() => {
            reset();
            onClose();
          }}
          genre='secondary'
          type='button'
        />
        <AppButton
          disabled={!isValid || isSubmitting}
          label={isSubmitting ? 'Enregistrement en cours' : 'Enregistrer'}
          genre='primary'
          type='submit'
        />
      </div>
    </form>
  );
}
