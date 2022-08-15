import {format} from 'date-fns';
import {useLocation, useNavigate} from 'react-router-dom';
import {locale} from '../../app/layout/App';
import {Product} from '../../app/models/product';
import ResponsiveTable from '../common/ResponsiveTable';
import ResponsiveTableRow from '../common/ResponsiveTableRow';

interface Props {
  products: Product[];
}

export default function InventoryList({ products = [] }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <ResponsiveTable
      headers={[
        'Désignation',
        'Catégorie',
        'Quantité',
        'Qté Vendu',
        'Stock',
        'Péremption',
      ]}
    >
      {products.map((item) => (
        <ResponsiveTableRow
          key={item.id}
          cells={[
            {
              title: 'Désignation',
              value: item.name,
            },
            {
              title: 'Catégorie',
              value: item.category,
              align: 'left',
            },

            {
              title: 'Quantité',
              value: item.useInventory ? item.quantity : 'N/A',
              align: 'center',
            },
            { title: 'Qté Vendu', value: item.soldQuantity, align: 'center' },
            {
              title: 'Stock',
              value: item.useInventory ? item.inventory : 'N/A',
              align: 'center',
            },
            {
              title: 'Péremption',
              value: item.expiryDate
                ? format(new Date(item.expiryDate), 'PP', { locale: locale })
                : 'N/A',
              align: 'center',
            },
          ]}
          onClick={() =>
            navigate(`/management/products/${item.id}`, {
              state: { from: pathname },
            })
          }
        />
      ))}
    </ResponsiveTable>
  );
}
