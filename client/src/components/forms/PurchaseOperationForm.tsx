import {PlusCircleIcon} from '@heroicons/react/solid';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useCallback, useEffect, useState} from 'react';
import {FieldValues, useForm} from 'react-hook-form';
import agent from '../../app/api/agent';
import {Operation} from '../../app/models/operation';
import {OperationElement} from '../../app/models/OperationElement';
import {OperationType} from '../../app/models/OperationType';
import {Product, ProductSmall} from '../../app/models/product';
import {addOperation} from '../../app/slices/operationSlice';
import {useAppDispatch} from '../../app/store/configureStore';
import {OperationValidationSchema} from '../../app/validation/operationValidationSchema';
import AppButton from '../common/AppButton';
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
  } = useForm({
    mode: 'all',
    resolver: yupResolver(OperationValidationSchema),
  });

  function handleRemoveElement(productId: string) {
    const index = elements.findIndex((e) => e.productId === productId);
    console.log(index, productId, elements);

    if (index === -1) return;
    const list = elements.filter((e) => e.productId !== productId);
    setElements(list);
  }

  const productsList = () => {
    return products.map((p) => ({ title: p.name, value: p.id }));
  };

  const fetchProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      const result: ProductSmall[] = await agent.Products.listAll();
      setProducts(result);

      setProductsLoaded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  const closeForm = (product: Product | undefined) => {
    setProductFormVisible(false);
  };

  useEffect(() => {
    if (operation && !isDirty) {
      const item = {};
      reset(item);
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
        expiryDate,
      };

      setElements((prev) => [...prev, item]);
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

  useEffect(() => {
    if (!productsLoaded) {
      fetchProducts();
    }
  }, [productsLoaded]);

  if (productsLoading)
    return (
      <div className='h-40 max-w-lg w-full flex items-center justify-center'>
        <p className=' text-3xl uppercase opacity-40 font-Primary font-thin'>
          Chargement des données
        </p>
      </div>
    );

  if (productFormVisible)
    return <ProductForm onClose={(value) => closeForm(value)} />;

  if (validateOperation)
    return (
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
    );

  return (
    <div className='flex flex-col items-stretch gap-y-5 max-w-lg '>
      <form
        onSubmit={handleSubmit(submitData)}
        className='flex flex-col gap-y-4 w-full bg-gray-200 rounded-2xl px-5 py-5'
      >
        <div className=' w-full '>
          <DropDown
            label={'Article'}
            items={productsList()}
            onChange={(item) => {
              setValue('productId', item.value);
            }}
            className=' flex-auto'
            selectedValue={watch('productId')}
            button={
              <button
                type='button'
                onClick={() => setProductFormVisible(true)}
                title={`Ajouter un article`}
                className='h-full w-full flex items-center justify-center px-2'
              >
                <PlusCircleIcon className='w-6 h-6' />
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
          label={`prix`}
          name={'price'}
        />

        <AppDatePicker
          label={'péremption'}
          minDate={new Date()}
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
          genre='secondary'
          disabled={!isValid || !isDirty || isSubmitting}
          label={'Ajouter'}
        />
      </form>
      <div className=' flex-auto flex flex-col overflow-hidden select-none'>
        <p className=' font-Primary text-2xl uppercase font-thin mb-3 flex-initial '>
          éléments
        </p>

        <div className='flex-auto h-[30vh]  overflow-y-auto overflow-x-hidden'>
          <ResponsiveTable
            headers={['article', 'quantité', 'total']}
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
                    value: element.total.toFixed(2),
                    align: 'right',
                  },
                ]}
                onClick={() => handleRemoveElement(element.productId)}
              />
            ))}
          />
        </div>
      </div>
      <div className=' w-full grid grid-cols-2 gap-x-5'>
        <AppButton
          disabled={elements.length === 0}
          label='Enregistrer'
          onClick={() => setValidateOperation(true)}
        />
        <AppButton label='Fermer' onClick={() => onClose()} genre='secondary' />
      </div>
    </div>
  );
}
