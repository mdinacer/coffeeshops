import {format, formatDuration, intervalToDuration} from 'date-fns';
import {locale} from '../../app/layout/App';
import {ProductBatch} from '../../app/models/ProductBatch';
import ResponsiveTable from '../common/ResponsiveTable';
import ResponsiveTableRow from '../common/ResponsiveTableRow';

interface Props {
  batches: ProductBatch[];
}

export default function ProductBatchList({ batches }: Props) {
  return (
    <ResponsiveTable
      headers={[
        'acquisition',
        'péremption',
        'quantité',
        'qte vendu',
        'qte perdu',
        'stock',
        'état',
      ]}
    >
      {batches.map((batch, index) => (
        <ResponsiveTableRow
          key={batch.id}
          cells={[
            {
              title: 'acquisition',
              value: formatDate(batch.date),
              align: 'center',
            },
            {
              title: 'péremption',
              value: batch.soldOut
                ? 'N/A'
                : getExpiryDistance(batch.expiryDate),
              align: 'center',
            },

            {
              title: 'quantité',
              value: batch.quantity,
              align: 'center',
            },
            {
              title: 'qte vendu',
              value: batch.soldQuantity,
              align: 'center',
            },
            {
              title: 'qte perdu',
              value: batch.lossQuantity,
              align: 'center',
            },
            {
              title: 'stock',
              value: batch.remain,
              align: 'center',
            },
            {
              title: 'état',
              value: batch.soldOut
                ? 'épuisé'
                : batch.active
                ? 'Actif'
                : 'Stock',
              align: 'center',
            },
          ]}
        />
      ))}

      {/* <TableColumnItem title={'Acquisition'} value={formatDate(batch.date)} />
        <TableColumnItem
          title={'Péremption'}
          value={batch.soldOut ? 'N/A' : getExpiryDistance(batch.expiryDate)}
        />

        <TableColumnItem title={'Quantité'} value={batch.quantity} />
        <TableColumnItem title={'Vendu'} value={batch.soldQuantity} />
        <TableColumnItem title={'Perte'} value={batch.lossQuantity} />
        <TableColumnItem title={'Stock'} value={batch.remain} />
        <TableColumnItem
          title={'état'}
          value={batch.soldOut ? 'épuisé' : batch.active ? 'Actif' : 'Stock'}
          valueStyle='uppercase'
        /> */}
    </ResponsiveTable>
    // <div className='flex flex-col h-full flex-1'>
    //   <ListHeader />

    //   <div className='flex-auto h-full max-h-[50vh] md:max-h-max  overflow-y-auto overflow-x-hidden'>
    //     <div className='grid gap-2 h-auto text-center'>
    //       {batches.map((batch, index) => (
    //         <ListItem batch={batch} key={index} />
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
}

function formatDate(value: Date | string) {
  return format(new Date(value), 'dd/MM/yy', {
    locale: locale,
  });
}

function getExpiryDistance(value: Date | null) {
  if (!value) {
    return 'N/A';
  }

  if (value > new Date()) {
    return 'Périmé';
  }

  return formatDuration(
    intervalToDuration({
      start: new Date(),
      end: new Date(value),
    }),
    {
      format: ['months', 'days'],
      zero: false,
      delimiter: ' - ',
      locale,
    }
  );
}
