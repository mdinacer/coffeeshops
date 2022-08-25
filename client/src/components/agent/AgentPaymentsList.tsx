import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import { locale } from '../../app/layout/App';
import { ShopPayment } from '../../app/models/shopPayment';
import { formatNumber } from '../../app/utils/utils';
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
        console.log(result);
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
  }, [agentId, fetchPayments, paymentsLoaded, paymentsLoading]);

  return (
    <div className=' flex flex-auto flex-col overflow-hidden'>
      {payments.length > 0 && (
        <p className=' mb-3 flex-initial font-Primary text-2xl font-thin uppercase '>
          Paiements
        </p>
      )}

      {paymentsLoaded && payments.length > 0 && (
        <ResponsiveTable
          headers={['date', 'montant', 'description']}
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
                  value: formatNumber(element.amount),
                  align: 'right',
                },

                {
                  title: 'description',
                  value: (
                    <span className=' text-sm'>{element.description}</span>
                  ),
                  align: 'left',
                },
              ]}
            />
          ))}
        />
      )}
    </div>
  );
}
