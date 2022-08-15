import {ShopAgent} from '../../app/models/shopAgent';
import ResponsiveTable from '../common/ResponsiveTable';
import ResponsiveTableRow from '../common/ResponsiveTableRow';

interface Props {
  agents: ShopAgent[];
  onSelect: (agent: ShopAgent) => void;
}

export default function AgentsList({ agents, onSelect }: Props) {
  return (
    <ResponsiveTable headers={['Nom', 'Total', 'Payé', 'Dettes']}>
      {agents.map((item, index) => (
        <ResponsiveTableRow
          key={index}
          cells={[
            { title: 'Name', value: item.name },
            { title: 'Total', value: item.total.toFixed(2), align: 'right' },
            { title: 'Payé', value: item.paid.toFixed(2), align: 'right' },
            { title: 'Dettes', value: item.debt.toFixed(2), align: 'right' },
          ]}
          onClick={() => onSelect(item)}
        />
      ))}
    </ResponsiveTable>
  );
}
