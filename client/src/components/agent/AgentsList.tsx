import { ShopAgent } from '../../app/models/shopAgent';
import { formatNumber } from '../../app/utils/utils';
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
            { title: 'Total', value: formatNumber(item.total), align: 'right' },
            { title: 'Payé', value: formatNumber(item.paid), align: 'right' },
            { title: 'Dettes', value: formatNumber(item.debt), align: 'right' },
          ]}
          onClick={() => onSelect(item)}
        />
      ))}
    </ResponsiveTable>
  );
}
