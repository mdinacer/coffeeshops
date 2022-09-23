import { useState } from 'react';
import { Table } from '../../app/models/order';

interface Props {
  tables: Table[];
  tablesLoaded: boolean;
  selectedTable?: number;
  onSelect: (tableId: number) => void;
}

export default function OrderTablesList({
  tables,
  tablesLoaded,
  selectedTable,
  onSelect,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const handleSelect = (value: number) => {
    onSelect(value);
    setExpanded(false);
  };
  return (
    <div className='  overflow-hidden bg-stone-200 px-5'>
      {tablesLoaded ? (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className=' w-full  py-1 font-Primary text-xl font-thin  uppercase'
        >
          Tables
        </button>
      ) : (
        <p className=' w-full  py-1 font-Primary text-xl font-thin  uppercase'>
          Chargement...
        </p>
      )}

      {expanded && (
        <div className='grid grid-cols-4 gap-4 py-5'>
          {tables.map((table, index) =>
            table.id === 0 ? (
              <div key={table.id} className=' relative  col-span-4 w-full'>
                <button
                  onClick={() => handleSelect(0)}
                  type='button'
                  className={`flex h-10 w-full snap-center  items-center justify-center rounded-full py-0 px-3 transition-all hover:bg-red-700 hover:text-stone-100  ${
                    selectedTable === 0
                      ? 'bg-red-500 text-stone-100'
                      : 'bg-stone-300'
                  } ${table.active && ' border-2 border-red-500'}  `}
                >
                  <span className=' font-Primary text-base font-thin uppercase'>
                    Comptoir
                  </span>
                </button>
              </div>
            ) : (
              <TableItem
                key={index}
                isSelected={selectedTable === table.id}
                table={table}
                onSelect={handleSelect}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

const buttonStyle =
  'h-10 w-full rounded-full flex items-center justify-center hover:bg-red-700 transition-all hover:text-stone-100 ';

interface TableItemProps {
  table: Table;
  isSelected: boolean;
  onSelect: (tableId: number) => void;
}
function TableItem({ table, isSelected, onSelect }: TableItemProps) {
  return (
    <div className=' relative h-full w-full'>
      <button
        onClick={() => onSelect(table.id)}
        type='button'
        className={` snap-start  ${
          isSelected ? 'bg-red-500 text-stone-100' : 'bg-stone-300'
        } ${buttonStyle} ${table.active && ' border-2 border-red-600'}  `}
      >
        <span className=' font-Primary text-lg  uppercase'>{table.id}</span>
      </button>
    </div>
  );
}
