import { XMarkIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import { Operation } from '../../app/models/operation';
import { OperationElement } from '../../app/models/OperationElement';
import { OperationType } from '../../app/models/OperationType';
import { Product, ProductSmall } from '../../app/models/product';
import { addOperation } from '../../app/slices/operationSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import { formatNumber } from '../../app/utils/utils';
import { OperationValidationSchema } from '../../app/validation/operationValidationSchema';
import AppButton from '../common/AppButton';
import ModalDialog from '../common/ModalDialog';
import ResponsiveTable from '../common/ResponsiveTable';
import ResponsiveTableRow from '../common/ResponsiveTableRow';
import AppDatePicker from '../input/DatePicker';
import DropDown from '../input/DropDown';
import NumberInput from '../input/NumberInput';
import OrderConfirmation from '../orderPage/OrderConfirmation';
import ProductForm from './ProductForm';

interface Props {
  operation?: Operation | null | undefined;
  onClose: (value?: Operation | null | undefined) => void;
}

export default function PurchaseOperationForm({ operation, onClose }: Props) {
  const [elements, setElements] = useState<OperationElement[]>([]);
  const [products, setProducts] = useState<ProductSmall[]>([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productFormVisible, setProductFormVisible] = useState(false);
  const [validateOperation, setValidateOperation] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | null | undefined>(null);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<FieldValues | any, any>({
    mode: 'all',
    resolver: yupResolver(OperationValidationSchema),
    defaultValues: {
      productId: '',
      quantity: 0,
      price: 0,
      minQuantity: 0,
      expiryDate: '',
    },
  });

  function handleRemoveElement(productId: string) {
    const index = elements.findIndex((e) => e.productId === productId);
    console.log(index, productId, elements);

    if (index === -1) return;
    const list = elements.filter((e) => e.productId !== productId);
    setElements(list);
  }

  const productsList = () => {
    return products
      .filter((p) => p.useInventory)
      .map((p) => ({ title: p.name, value: p.id }));
  };

  const fetchProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      const result = await agent.Products.listAll();
      console.log(result);
      setProducts(result);

      setProductsLoaded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  const closeForm = async (product: Product | undefined) => {
    setProductFormVisible(false);
    if (product) {
      await fetchProducts();
      setValue('productId', product.id);
    }
  };

  useEffect(() => {
    if (operation && !isDirty) {
      const item = {};
      reset(item);
      setExpiryDate(null);
    }
  }, [isDirty, operation, reset]);

  const getProduct = (id: string) => {
    const index = products.findIndex((o) => o.id === id);

    if (index >= 0) {
      return products[index];
    }
    return null;
  };

  function submitData(data: FieldValues) {
    const { productId, quantity, price, expiryDate } = data;

    const product = getProduct(productId);

    if (product) {
      const item = {
        productId,
        productName: product.name,
        quantity,
        price,
        total: quantity * price,
        expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      };

      setElements((prev) => [...prev, item]);
      reset();
      setExpiryDate(null);
    }
  }

  function getTotal() {
    if (elements.length > 0) {
      return elements.reduce(
        (sum, current) => sum + current.price * current.quantity,
        0
      );
    }
    return 0;
  }

  function handleSelectProduct(productId: string) {
    const product = products.find((p) => p.id === productId);

    if (product) {
      setValue('productId', productId);
      setValue('minQuantity', product.minQuantity);
    } else {
      setValue('productId', '');
      setValue('minQuantity', 0);
    }
  }

  useEffect(() => {
    if (!productsLoaded) {
      fetchProducts();
    }
  }, [productsLoaded]);

  if (productsLoading)
    return (
      <div className='flex h-40 w-full max-w-lg items-center justify-center'>
        <p className=' font-Primary text-3xl font-thin uppercase opacity-40'>
          Chargement des données
        </p>
      </div>
    );

  // if (productFormVisible)
  //   return <ProductForm onClose={(value) => closeForm(value)} isPurchase />;

  // if (validateOperation)
  //   return (
  //     <OrderConfirmation
  //       elements={elements}
  //       onClose={(value) => {
  //         if (value) {
  //           dispatch(addOperation(value));
  //         }
  //         onClose();
  //         setValidateOperation(false);
  //       }}
  //       operationTotal={getTotal()}
  //       type={OperationType.purchase}
  //     />
  //   );

  return (
    <>
      <div className='flex max-w-lg flex-col items-stretch gap-y-5 '>
        <form
          onSubmit={handleSubmit(submitData)}
          className='flex w-full flex-col gap-y-4 rounded-2xl '
        >
          <div className=' w-full '>
            <DropDown
              label={'Article'}
              items={productsList()}
              onChange={(item) => {
                handleSelectProduct(item.value);
              }}
              className=' flex-auto'
              selectedValue={watch('productId')}
              button={
                <button
                  type='button'
                  onClick={() => setProductFormVisible(true)}
                  title={`Ajouter un article`}
                  className='flex h-full w-full items-center justify-center px-2'
                >
                  <PlusCircleIcon className='h-6 w-6' />
                </button>
              }
            />
          </div>

          <NumberInput
            control={control}
            placeholder={''}
            min={1}
            label='Quantité'
            name={'quantity'}
            showButtons
          />
          <NumberInput
            control={control}
            placeholder={''}
            min={0}
            label='Seuil Minimum'
            name={'minQuantity'}
            showButtons
          />
          <NumberInput
            control={control}
            placeholder={''}
            label={`prix d'achat`}
            name={'price'}
            prefix='Da'
          />

          <AppDatePicker
            label={'péremption'}
            minDate={new Date()}
            initialDate={undefined}
            selectedDate={expiryDate}
            onChange={(value) => {
              setExpiryDate(value);
              if (value) {
                setValue('expiryDate', value.toUTCString());
              }
            }}
          />

          <AppButton
            type='submit'
            genre='info'
            disabled={!isValid || !isDirty || isSubmitting}
            label={'Ajouter'}
          />
        </form>
        <div className=' flex flex-auto select-none flex-col overflow-hidden'>
          <p className=' mb-3 flex-initial font-Primary text-2xl font-thin uppercase '>
            éléments
          </p>

          <div className='max-h-[30vh] flex-auto  overflow-y-auto overflow-x-hidden'>
            {elements.length > 0 ? (
              <ResponsiveTable
                headers={['article', 'quantité', 'total', '']}
                children={elements.map((element, index) => (
                  <ResponsiveTableRow
                    key={element.productId}
                    cells={[
                      {
                        title: 'article',
                        value: element.productName,
                      },
                      {
                        title: 'quantité',
                        value: element.quantity,
                        align: 'center',
                      },

                      {
                        title: 'total',
                        value: formatNumber(element.total),
                        align: 'right',
                      },

                      {
                        title: '',
                        value: (
                          <AppButton
                            Icon={XMarkIcon}
                            type='button'
                            genre='none'
                            onClick={() =>
                              handleRemoveElement(element.productId)
                            }
                            className='  px-1 py-1'
                          />
                        ),
                        align: 'right',
                      },
                    ]}
                  />
                ))}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className=' grid w-full grid-cols-2 gap-4'>
          <AppButton
            label='Fermer'
            type='button'
            onClick={() => onClose()}
            genre='secondary'
          />
          <AppButton
            disabled={elements.length === 0}
            type='button'
            label='Enregistrer'
            onClick={() => setValidateOperation(true)}
            genre='primary'
          />
        </div>
      </div>

      <ModalDialog
        active={validateOperation}
        title='Confirmation'
        onClose={() => setValidateOperation(false)}
      >
        <OrderConfirmation
          elements={elements}
          onClose={(value) => {
            if (value) {
              dispatch(addOperation(value));
            }
            onClose();
            setValidateOperation(false);
          }}
          operationTotal={getTotal()}
          type={OperationType.purchase}
        />
      </ModalDialog>

      <ModalDialog
        active={productFormVisible}
        title='Confirmation'
        onClose={() => setProductFormVisible(false)}
      >
        <ProductForm onClose={(value) => closeForm(value)} isPurchase />
      </ModalDialog>
    </>
  );
}
