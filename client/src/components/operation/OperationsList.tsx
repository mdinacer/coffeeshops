import {format} from 'date-fns';
import {locale} from '../../app/layout/App';
import {Operation} from '../../app/models/operation';
import {OperationType} from '../../app/models/OperationType';
import ResponsiveTable from '../common/ResponsiveTable';
import ResponsiveTableRow from '../common/ResponsiveTableRow';

interface Props {
  operations: Operation[];
  type: string;
  onSelect: (operation: Operation) => void;
}

export default function OperationsList({ operations, type, onSelect }: Props) {
  return (
    <ResponsiveTable
      headers={[
        'date',
        type === OperationType[1] ? 'client' : 'fournisseur',
        'total',
        'payé',
        'reste',
      ]}
    >
      {operations.map((operation, index) => (
        <ResponsiveTableRow
          key={operation.id}
          cells={[
            {
              title: 'date',
              value: format(new Date(operation.date), 'PPP', {
                locale: locale,
              }),
            },
            {
              title: type === OperationType[1] ? 'client' : 'fournisseur',
              value: operation?.agentName || 'non fournis',
            },

            {
              title: 'total',
              value: operation.total.toFixed(2),
              align: 'right',
            },
            {
              title: 'payé',
              value: operation.paid.toFixed(2),
              align: 'right',
            },
            {
              title: 'reste',
              value: operation.remain.toFixed(2),
              align: 'right',
            },
          ]}
          onClick={() => onSelect(operation)}
        />
      ))}
    </ResponsiveTable>
  );
}
