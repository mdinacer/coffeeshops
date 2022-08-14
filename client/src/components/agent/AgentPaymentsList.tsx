import { format } from 'date-fns';
import { useState, useEffect, useCallback } from 'react';
import agent from '../../app/api/agent';
import { locale } from '../../app/layout/App';
import { ShopPayment } from '../../app/models/shopPayment';
import ResponsiveTable from '../common/ResponsiveTable';
import ResponsiveTableRow from '../common/ResponsiveTableRow';

interface Props {
  agentId: string;
}

export default function AgentPaymentsList({ agentId }: Props) {
  const [payments, setPayments] = useState<ShopPayment[]>([]);
  const [paymentsLoaded, setPaymentsLoaded] = useState(false);
  const [paymentsLoading, setPaymentsLoading] = useState(false);

  const fetchPayments = useCallback(async (id: string) => {
    setPaymentsLoading(true);

    try {
      const result = await agent.Payments.list(id);
      if (result) {
        setPayments(result);
      }
      setPaymentsLoaded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setPaymentsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!paymentsLoaded && !paymentsLoading && agentId) {
      fetchPayments(agentId);
    }
  }, [agentId, paymentsLoaded, paymentsLoading]);

  return (
    <div className=' flex-auto flex flex-col overflow-hidden'>
      <p className=' font-Primary text-2xl uppercase font-thin mb-3 flex-initial '>
        Paiements
      </p>

      {paymentsLoaded && payments.length > 0 && (
        <ResponsiveTable
          headers={['date', 'montant']}
          children={payments.map((element, index) => (
            <ResponsiveTableRow
              key={element.id}
              cells={[
                {
                  title: 'article',
                  value: format(new Date(element.date), 'PP', {
                    locale: locale,
                  }),
                  align: 'center',
                },
                {
                  title: 'montant',
                  value: element.amount.toFixed(2),
                  align: 'right',
                },
              ]}
            />
          ))}
        />
      )}
    </div>
  );
}
