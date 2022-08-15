import {PlusIcon} from '@heroicons/react/solid';
import {useEffect, useState} from 'react';
import useOperations from '../../app/hooks/useOperations';
import ListPageLayout from '../../app/layout/ListPageLayout';
import {Operation} from '../../app/models/operation';
import {OperationType} from '../../app/models/OperationType';
import {addOperation} from '../../app/slices/operationSlice';
import {setPageNumber, setProductParams} from '../../app/slices/shopSlice';
import {useAppDispatch} from '../../app/store/configureStore';
import AppButton from '../../components/common/AppButton';
import AppDialog from '../../components/common/AppDialog';
import AppLink from '../../components/common/AppLink';
import CollapsibleMenu from '../../components/common/CollapsibleMenu';
import PurchaseOperationForm from '../../components/forms/PurchaseOperationForm';
import OperationDetails from '../../components/operation/OperationDetails';
import OperationsFilters from '../../components/operation/OperationsFilters';
import OperationsList from '../../components/operation/OperationsList';

export default function OperationsPage() {
  const dispatch = useAppDispatch();
  const { operations, metaData, operationType } = useOperations();
  const [purchaseFormVisible, setPurchaseFormVisible] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(
    null
  );

  async function handlePageChange(page: number) {
    dispatch(setPageNumber({ pageNumber: page + 1 }));
  }
  const getTypeTitle = () => {
    return operationType === OperationType[0] ? 'Achats' : 'Ventes';
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

  useEffect(() => {
    dispatch(setProductParams(initParams()));
  }, [dispatch]);
  return (
    <ListPageLayout
      title={getTypeTitle()}
      metaData={metaData}
      stats={[
        { title: 'total', value: operationsTotal().toFixed(2) },
        { title: 'payé', value: operationsPaidTotal().toFixed(2) },
        { title: 'dettes', value: operationsRemainTotal().toFixed(2) },
      ]}
      onPageChange={handlePageChange}
      filters={
        <CollapsibleMenu title='Filtres'>
          <OperationsFilters />
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
        operationType === OperationType[1] ? (
          <AppLink
            className=' w-full md:w-auto'
            label={'Ajouter une vente'}
            Icon={PlusIcon}
            toPath={'/order'}
          />
        ) : (
          <AppButton
            className=' w-full md:w-auto'
            label={'Ajouter un achat'}
            Icon={PlusIcon}
            onClick={() => setPurchaseFormVisible(true)}
          />
        )
      }
      dialogVisible={purchaseFormVisible || !!selectedOperation}
      dialogContent={
        <>
          {purchaseFormVisible && (
            <AppDialog buttonsVisible={false} className=''>
              <PurchaseOperationForm
                onClose={(value) => {
                  if (value) {
                    dispatch(addOperation(value));
                  }
                  setPurchaseFormVisible(false);
                }}
              />
            </AppDialog>
          )}

          {selectedOperation && (
            <AppDialog className=' max-w-lg'>
              <OperationDetails
                operationId={selectedOperation.id}
                onClose={() => setSelectedOperation(null)}
              />
            </AppDialog>
          )}
        </>
      }
    />
  );
}

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'dateDesc',
    showcase: undefined,
  };
}
