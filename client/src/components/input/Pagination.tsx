import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { MetaData } from '../../app/models/pagination';

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function Pagination({ metaData, onPageChange }: Props) {
  const { currentPage, totalCount, totalPages, pageSize } = metaData;
  const [pageNumber, setPageNumber] = useState(currentPage);

  function handlePageChange(page: number) {
    setPageNumber(page);
    onPageChange(page);
  }

  return (
    <div className='h-auto w-full border-b-4 border-b-stone-400 px-5 pt-1'>
      {metaData && (
        <div className='flex flex-col items-center justify-between gap-y-2 lg:flex-row lg:gap-y-0'>
          <p className='font-Primary text-lg font-thin lg:text-xl'>
            Affichage de {(currentPage - 1) * pageSize + 1} {' à '}
            {currentPage * pageSize > totalCount
              ? totalCount
              : currentPage * pageSize}{' '}
            sur {totalCount} articles
          </p>

          {metaData && (
            <ReactPaginate
              forcePage={pageNumber}
              className='flex w-auto flex-row items-center gap-x-3 py-2 '
              pageClassName='font-thin'
              activeClassName='font-normal bg-stone-500 rounded-md text-stone-100'
              pageLinkClassName={'p-2 font-Primary  text-inherit text-xl'}
              breakLabel='...'
              nextLabel={<ChevronRightIcon className='h-6 w-6' />}
              onPageChange={({ selected }) => {
                handlePageChange(selected);
              }}
              pageRangeDisplayed={3}
              pageCount={totalPages}
              previousLabel={<ChevronLeftIcon className='h-6 w-6' />}
            />
          )}
        </div>
      )}
    </div>
  );
}
