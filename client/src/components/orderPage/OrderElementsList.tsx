import {AnimatePresence} from 'framer-motion';
import {OrderElement} from '../../app/models/order';
import OrderElementsListItem from './OrderElementsListItem';

interface Props {
  elements: OrderElement[];
  onRemove: (productId: string) => void;
  setQuantity: (productId: string, operation: 'increase' | 'decrease') => void;
}

export default function OrderElementsList({
  elements,
  onRemove,
  setQuantity,
}: Props) {
  function handleRemoveElement(productId: string) {
    onRemove(productId);
  }

  function handleIncreaseQuantity(productId: string) {
    setQuantity(productId, 'increase');
  }
  function handleDecreaseQuantity(productId: string) {
    setQuantity(productId, 'decrease');
  }

  return (
    <div className=' flex flex-col gap-y-2'>
      <AnimatePresence>
        {elements.map((element, index) => (
          <OrderElementsListItem
            key={element.productId}
            element={element}
            onRemove={handleRemoveElement}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
