import {
  CheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
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
  const actionColor = (action: number) => {
    switch (action) {
      case 0:
        return ' text-green-700';
      case 1:
        return ' text-orange-500';
      case 2:
        return ' text-red-700';
    }
  };
  return (
    <ResponsiveTable headers={['', 'date', 'action', 'élément', 'utilisateur']}>
      {elements.map((item) => (
        <ResponsiveTableRow
          key={item.id}
          cells={[
            {
              title: '',
              value: (
                <div className={' inline-flex h-full items-center gap-x-2'}>
                  {item.action > 0 ? (
                    <ExclamationTriangleIcon
                      className={'h-6 w-6' + actionColor(item.action)}
                    />
                  ) : (
                    <CheckIcon
                      className={'h-6 w-6' + actionColor(item.action)}
                    />
                  )}
                </div>
              ),
              align: 'center',
            },
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
