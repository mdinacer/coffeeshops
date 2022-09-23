import { format } from 'date-fns';
import { locale } from '../../app/layout/App';
import { HistoryElement } from '../../app/models/historyElement';
import ResponsiveTable from '../common/ResponsiveTable';
import ResponsiveTableRow from '../common/ResponsiveTableRow';

interface Props {
  elements: HistoryElement[];
  onSelect: (element: HistoryElement) => void;
}

export default function HistoryElementsList({ elements, onSelect }: Props) {
  return (
    <ResponsiveTable
      fixed
      headers={['date', 'action', 'élément', 'utilisateur']}
    >
      {elements.map((item) => (
        <ResponsiveTableRow
          key={item.id}
          cells={[
            {
              title: 'Date',
              value: item.date
                ? format(new Date(item.date), 'PPpp', { locale })
                : '',
              align: 'center',
            },
            {
              title: 'action',
              value: item.actionName,
              align: 'center',
            },
            {
              title: 'élément',
              value: item.entityName,
              align: 'center',
            },

            { title: 'utilisateur', value: item.username, align: 'center' },
          ]}
          onClick={() => onSelect(item)}
        />
      ))}
    </ResponsiveTable>
  );
}
