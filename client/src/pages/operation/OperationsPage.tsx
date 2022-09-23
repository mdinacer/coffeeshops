import { ArrowLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import useOperations from '../../app/hooks/useOperations';
import ListPageLayout from '../../app/layout/ListPageLayout';
import { Operation } from '../../app/models/operation';
import { OperationType } from '../../app/models/OperationType';
import { addOperation, setPageNumber } from '../../app/slices/operationSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import { formatNumber } from '../../app/utils/utils';
import AppButton from '../../components/common/AppButton';
import AppLink from '../../components/common/AppLink';
import CollapsibleMenu from '../../components/common/CollapsibleMenu';
import ModalDialog from '../../components/common/ModalDialog';
import PurchaseOperationForm from '../../components/forms/PurchaseOperationForm';
import OperationDetails from '../../components/operation/OperationDetails';
import OperationsFilters from '../../components/operation/OperationsFilters';
import OperationsList from '../../components/operation/OperationsList';

export default function OperationsPage() {
  const dispatch = useAppDispatch();
  const { operations, metaData } = useOperations();
  const [operationType, setOperationType] = useState(OperationType.sale);
  const [purchaseFormVisible, setPurchaseFormVisible] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(
    null
  );

  async function handlePageChange(page: number) {
    dispatch(setPageNumber(page + 1));
  }
  const getTypeTitle = () => {
    return operationType === OperationType.purchase ? 'Achats' : 'Ventes';
  };

  const operationsTotal = () => getTotal('total');

  const operationsPaidTotal = () => getTotal('paid');

  const operationsRemainTotal = () => getTotal('remain');

  const getTotal = (property: 'total' | 'paid' | 'remain') => {
    if (operations.length > 0) {
      return operations.reduce((sum, current) => sum + current[property], 0);
    }
    return 0;
  };

  return (
    <>
      <ListPageLayout
        title={getTypeTitle()}
        metaData={metaData}
        stats={[
          { title: 'total', value: formatNumber(operationsTotal()) },
          { title: 'payé', value: formatNumber(operationsPaidTotal()) },
          {
            title: 'dettes',
            value: (
              <p
                className={` ${
                  operationsRemainTotal() > 0
                    ? ' font-semibold text-red-500'
                    : 'text-inherit'
                }`}
              >
                <span>{formatNumber(operationsRemainTotal())}</span>
                <span className='font-secondary text-xs uppercase'> DA</span>
              </p>
            ),
          },
        ]}
        onPageChange={handlePageChange}
        filters={
          <CollapsibleMenu title='Filtres'>
            <OperationsFilters
              setOperationType={(value) => setOperationType(value)}
            />
          </CollapsibleMenu>
        }
        list={
          <OperationsList
            operations={operations}
            type={operationType}
            onSelect={(operation) => {
              setSelectedOperation(operation);
            }}
          />
        }
        actionButton={
          operationType === OperationType.sale ? (
            <AppLink
              className=' w-full md:w-auto '
              label={'Aller a la caisse'}
              Icon={ArrowLeftIcon}
              toPath={'/order'}
              genre='primary'
            />
          ) : (
            <AppButton
              className=' w-full md:w-auto'
              label={'Ajouter un achat'}
              Icon={PlusIcon}
              onClick={() => setPurchaseFormVisible(true)}
              genre='primary'
            />
          )
        }
      />

      {purchaseFormVisible && (
        <ModalDialog
          active={purchaseFormVisible}
          title='Ajouter un achat'
          contentStyle='p-5'
        >
          <PurchaseOperationForm
            onClose={(value) => {
              if (value) {
                dispatch(addOperation(value));
              }
              setPurchaseFormVisible(false);
            }}
          />
        </ModalDialog>
      )}

      <ModalDialog
        active={selectedOperation != null}
        title={
          'Détails de' +
          ` ${
            selectedOperation &&
            selectedOperation!.type === OperationType.purchase
              ? "l'Achat"
              : 'la Vente'
          }`
        }
        contentStyle='p-5'
      >
        {selectedOperation && (
          <OperationDetails
            operationId={selectedOperation!.id}
            onClose={() => setSelectedOperation(null)}
          />
        )}
      </ModalDialog>
    </>
  );
}
