import { PlusIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import useOperations from '../../app/hooks/useOperations';
import ListPageLayout from '../../app/layout/ListPageLayout';
import { Operation } from '../../app/models/operation';
import { OperationType } from '../../app/models/OperationType';
import {
  addOperation,
  setOperationParams,
  setPageNumber,
} from '../../app/slices/operationSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import AppButton from '../../components/common/AppButton';
import AppDialog from '../../components/common/AppDialog';
import AppLink from '../../components/common/AppLink';
import CollapsibleMenu from '../../components/common/CollapsibleMenu';
import ModalDialog from '../../components/common/ModalDialog';
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
    console.log(page + 1);

    dispatch(setPageNumber(page + 1));
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
    dispatch(setOperationParams(initParams()));
  }, [dispatch]);
  return (
    <>
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
              className=' w-full md:w-auto '
              label={'Ajouter une vente'}
              Icon={PlusIcon}
              toPath={'/order'}
              genre='info'
              noHover
              rounded
            />
          ) : (
            <AppButton
              className=' w-full md:w-auto'
              label={'Ajouter un achat'}
              Icon={PlusIcon}
              onClick={() => setPurchaseFormVisible(true)}
              genre='info'
              noHover
              rounded
            />
          )
        }
      />

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

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 10,
    orderBy: 'dateDesc',
    showcase: undefined,
  };
}
