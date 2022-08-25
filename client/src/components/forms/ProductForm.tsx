import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { Product } from '../../app/models/product';
import { useAppDispatch } from '../../app/store/configureStore';
import {
  CreateProductSchema,
  EditProductSchema,
} from '../../app/validation/productValidationSchema';
import { useEffect, useState } from 'react';
import TextInput from '../input/TextInput';
import DropDown from '../input/DropDown';
import NumberInput from '../input/NumberInput';
import ImageDropZone from '../input/ImageDropZone';
import agent from '../../app/api/agent';
import { setProduct, updateProduct } from '../../app/slices/productsSlice';
import { ViewGridAddIcon } from '@heroicons/react/solid';

import TextArea from '../input/TextArea';
import ProductGalleryForm from './ProductGalleryForm';
import useProducts from '../../app/hooks/useProducts';
import CheckboxInput from '../input/Checkbox';
import AppDatePicker from '../input/DatePicker';
import AppButton from '../common/AppButton';
import ModalDialog from '../common/ModalDialog';

interface Props {
  product?: Product | undefined;
  isPurchase?: boolean;
  onClose: (product?: Product) => void;
}
export default function ProductForm({
  product,
  isPurchase = false,
  onClose,
}: Props) {
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
  } = useForm<FieldValues | any, any>({
    mode: 'all',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      quantity: 0,
      categoryId: '',
      description: '',
      minQuantity: 0,
      price: 0,
      showcase: true,
      useInventory: false,
    },
  });

  const useInventory = watch('useInventory');
  const quantity = watch('quantity');
  const watchFile = watch('file', null);
  const selectedCategory = watch('categoryId', null);

  useEffect(() => {
    if (product && !watchFile && !isDirty) {
      const item = {
        name: product.name,
        quantity: product.quantity,
        categoryId: product.categoryId,
        description: product.description || '',
        price: product.price,
        showcase: product.showcase,
        useInventory: product.useInventory,
        minQuantity: product.minQuantity,
      };
      reset(item, { keepDirty: false });
    }

    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [watchFile, product, isDirty]);

  function handleAddItem(item: any) {
    setValue('name', item.name);
    setValue('pictureUrl', item.pictureUrl);
    if (item.description) {
      setValue('description', item.description);
    }
    const category = categories.find(
      (c) => c.name.trim().toLowerCase() === item.category.trim().toLowerCase()
    );

    if (category) {
      setValue('categoryId', category.id);
    }
  }

  const pictureUrl = watch('pictureUrl', null);

  async function submitData(data: FieldValues) {
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

  // if (productGalleryVisible)
  //   return (
  //     <ProductGalleryForm
  //       onExit={(item) => {
  //         if (item) {
  //           handleAddItem(item);
  //         }
  //         setProductGalleryVisible(false);
  //       }}
  //     />
  //   );

  return (
    <>
      <ModalDialog
        onClose={() => setProductGalleryVisible(false)}
        active={productGalleryVisible}
        title='Galerie de produits'
      >
        <ProductGalleryForm
          onExit={(item) => {
            if (item) {
              handleAddItem(item);
            }
            setProductGalleryVisible(false);
          }}
        />
      </ModalDialog>
      <form
        onSubmit={handleSubmit(submitData)}
        className='flex w-full max-w-lg flex-col gap-y-4'
      >
        <TextInput
          control={control}
          label={'Désignation'}
          name={'name'}
          inputStyle=' capitalize '
          className='w-full overflow-hidden'
          button={
            <>
              {!isEdit && (
                <AppButton
                  Icon={ViewGridAddIcon}
                  label='Galerie'
                  onClick={() => setProductGalleryVisible(true)}
                  labelStyle={' hidden md:block '}
                  type='button'
                  genre='info'
                  className='  rounded-none border-none'
                />
              )}
            </>
          }
        />

        <DropDown
          selectedValue={selectedCategory}
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
          label='Détails'
          control={control}
        />

        <NumberInput
          control={control}
          placeholder={''}
          label={'Prix'}
          name={'price'}
          prefix={'DA'}
          className=''
        />

        <div className='grid gap-5 md:grid-cols-2'>
          <CheckboxInput
            control={control}
            label={'Vitrine'}
            name={'showcase'}
          />
          <CheckboxInput
            control={control}
            label={`Inventaire`}
            name={'useInventory'}
          />
        </div>

        {!isEdit && useInventory && !isPurchase && (
          <div className=' grid grid-cols-1 gap-3 rounded border border-stone-400 p-3 '>
            {!isPurchase && (
              <NumberInput
                control={control}
                placeholder={''}
                label={'Quantité'}
                name={'quantity'}
                min={0}
                showButtons
              />
            )}

            <NumberInput
              control={control}
              placeholder={''}
              label={"Prix d'achat"}
              name={'purchasePrice'}
              prefix={'DA'}
            />

            <NumberInput
              control={control}
              placeholder={''}
              label={'Seuil minimale'}
              name={'minQuantity'}
              min={0}
              showButtons
            />

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
          </div>
        )}
        <div className='mt-4 grid grid-cols-2 gap-5'>
          <div className=' rounded-lg border border-stone-400 bg-stone-300 py-5 '>
            <ImageDropZone control={control} name={'file'} />
          </div>

          <div className='flex h-auto w-full items-center overflow-hidden  rounded-lg border border-stone-400 bg-stone-300 '>
            {watchFile ? (
              <img
                className='h-[140px] w-full object-fill object-center lg:h-[200px]  '
                src={watchFile.preview}
                alt='preview'
              />
            ) : (
              <img
                className=' h-[140px] w-full object-scale-down object-center lg:h-[200px]  '
                src={product?.pictureUrl || pictureUrl}
                alt={product?.pictureUrl || pictureUrl}
              />
            )}
          </div>
        </div>
        <div className='mt-5 grid w-full grid-cols-2 gap-x-5'>
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
            label={`${
              isSubmitting ? 'Enregistrement en cours' : 'Enregistrer'
            }`}
            genre='primary'
            type='submit'
          />
        </div>
      </form>
    </>
  );
}
