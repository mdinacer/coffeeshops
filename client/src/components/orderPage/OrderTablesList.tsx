import {Table} from '../../app/models/order';

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
        <div className=' flex flex-row items-center w-max max-w-none  gap-3'>
          {tables.map((table, index) =>
            table.id === 0 ? (
              <div key={table.id} className=' relative  w-full'>
                <button
                  onClick={() => onSelect(0)}
                  type='button'
                  className={`w-full h-10 py-0 snap-center  rounded-full flex items-center justify-center   hover:bg-gray-600 transition-all hover:text-white px-3  ${
                    selectedTable === 0
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-300'
                  } ${table.active && ' border-red-500 border-4'}  `}
                >
                  <span className=' font-Primary uppercase font-thin text-base'>
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
  'h-10 w-10 rounded-full flex items-center justify-center   hover:bg-gray-600 transition-all hover:text-white ';

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
          isSelected ? 'bg-gray-900 text-white' : 'bg-gray-300'
        } ${buttonStyle} ${table.active && ' border-gray-900 border-4'}  `}
      >
        <span className=' font-Primary uppercase font-thin text-lg'>
          {table.id}
        </span>
      </button>
    </div>
  );
}
