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
  return (
    <>
      {tablesLoaded ? (
        <div className=' flex w-max max-w-none flex-row items-center  gap-3'>
          {tables.map((table, index) =>
            table.id === 0 ? (
              <div key={table.id} className=' relative  w-full'>
                <button
                  onClick={() => onSelect(0)}
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
                onSelect={onSelect}
              />
            )
          )}
        </div>
      ) : (
        <div className='w-full '>
          <p>Chargement des tables</p>
        </div>
      )}
    </>
  );
}

const buttonStyle =
  'h-10 w-10 rounded-full flex items-center justify-center hover:bg-red-700 transition-all hover:text-stone-100 ';

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
        <span className=' font-Primary text-lg font-thin uppercase'>
          {table.id}
        </span>
      </button>
    </div>
  );
}
