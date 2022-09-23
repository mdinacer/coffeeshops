import { useCallback, useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import { ShopStats, StatsElement } from '../../app/models/shopStats';
import { useAppSelector } from '../../app/store/configureStore';
import { formatNumber } from '../../app/utils/utils';
import Layout from '../../components/Layout';
import ShopDetailsHeader from '../../components/shop/ShopDetailsHeader';
import {
  ShopStatsBarChart,
  ShopStatsPieChart,
} from '../../components/shop/ShopStatsChart';

export default function ShopManagerPage() {
  const { shop } = useAppSelector((state) => state.shop);
  const [shopStats, setShopStats] = useState<ShopStats | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const result = await agent.Shops.fetchStats();
      setShopStats(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (shop && shop.id) {
      fetchStats();
    }
  }, [shop]);

  if (!shop) return <div>No Shop</div>;
  return (
    <Layout className=' flex flex-col items-stretch gap-y-10 overflow-auto'>
      <ShopDetailsHeader
        name={shop.name}
        tablesCount={shop.tablesCount}
        productsCount={shop.productsCount}
        operationsCount={shop.operationsCount}
      />
      {/* <div className='my-5 rounded bg-stone-100 p-5 dark:bg-stone-600 '>
        <p className=' font-Primary text-2xl font-thin uppercase'>
          Propriétaire
        </p>
      </div> */}

      <div className=' flex flex-col items-stretch gap-10 rounded-2xl bg-stone-100 p-6'>
        <div>
          <p className=' font-Secondary text-3xl uppercase'>Achats</p>
        </div>
        <div className=' grid grid-cols-3 gap-10'>
          <div className=' flex w-full flex-row justify-between'>
            <p>Total</p>
            <p>{formatNumber(fakeStats.purchases.total)} Da</p>
          </div>

          <div className=' flex w-full flex-row justify-between'>
            <p>Payé</p>
            <p>{formatNumber(fakeStats.purchases.paid)} Da</p>
          </div>

          <div className=' flex w-full flex-row justify-between'>
            <p>Dettes Fournisseur</p>
            <p>{formatNumber(fakeStats.purchases.dues)} Da</p>
          </div>
        </div>
      </div>

      <div className=' flex flex-col items-stretch gap-10 rounded-2xl bg-stone-100 p-6'>
        <div>
          <p className=' font-Secondary text-3xl uppercase'>Ventes</p>
        </div>
        <div className=' grid grid-cols-3 gap-10'>
          <div className=' flex w-full flex-row justify-between'>
            <p>Total</p>
            <p>{formatNumber(fakeStats.sales.total)} Da</p>
          </div>

          <div className=' flex w-full flex-row justify-between'>
            <p>Payé</p>
            <p>{formatNumber(fakeStats.sales.paid)} Da</p>
          </div>

          <div className=' flex w-full flex-row justify-between'>
            <p>Dettes Clients</p>
            <p>{formatNumber(fakeStats.sales.dues)} Da</p>
          </div>
        </div>
      </div>

      <div className=' flex flex-col items-stretch gap-10 rounded-2xl bg-stone-100 p-6'>
        <div>
          <p className=' font-Secondary text-3xl uppercase'>Balance</p>
        </div>
        <div className=' grid grid-cols-5 gap-10'>
          <div className=' flex w-full flex-row justify-between'>
            <p>Revenu</p>
            <p>{formatNumber(fakeStats.sales.paid)} Da</p>
          </div>

          <div className=' flex w-full flex-row justify-between'>
            <p>Dette a payer</p>
            <p>{formatNumber(fakeStats.purchases.dues)} Da</p>
          </div>

          <div className=' flex w-full flex-row justify-between'>
            <p>Charges</p>
            <p>{formatNumber(fakeStats.charges)} Da</p>
          </div>

          <div className=' flex w-full flex-row justify-between'>
            <p>Pertes</p>
            <p>{formatNumber(fakeStats.loss)} Da</p>
          </div>

          <div className=' flex w-full flex-row justify-between'>
            <p>Balance</p>
            <p>
              {formatNumber(
                fakeStats.sales.paid -
                  (fakeStats.purchases.dues +
                    fakeStats.charges +
                    fakeStats.loss)
              )}{' '}
              Da
            </p>
          </div>
        </div>
      </div>

      {shopStats && (
        <>
          <div className='mt-10 grid grid-cols-1 gap-3'>
            <ChartContainer title='Journalier' element={shopStats.weekly}>
              <ShopStatsPieChart title='Journalier' element={shopStats.daily} />
            </ChartContainer>
            <ChartContainer title='Hebdomadaire' element={shopStats.weekly}>
              <ShopStatsBarChart element={shopStats.weekly} />
            </ChartContainer>
            <ChartContainer title='Mensuel' element={shopStats.monthly}>
              <ShopStatsBarChart element={shopStats.monthly} />
            </ChartContainer>
            <ChartContainer title='Annuel' element={shopStats.annual}>
              <ShopStatsBarChart element={shopStats.annual} />
            </ChartContainer>
          </div>
        </>
      )}
    </Layout>
  );
}

const fakeStats = {
  purchases: {
    total: 1000000,
    paid: 550000,
    dues: 1000000 - 550000,
  },
  sales: {
    total: 1560000,
    paid: 1480000,
    dues: 1560000 - 1480000,
  },
  charges: 230000,
  loss: 12000,
};

interface ContainerProps {
  title: string;
  children: React.ReactNode;
  element: StatsElement;
}

function ChartContainer({ title, children, element }: ContainerProps) {
  return (
    <div className='overflow-hidden  rounded text-stone-800'>
      <div className=' bg flex-initial  px-5 py-2'>
        <p className=' text-center font-Primary text-2xl font-thin uppercase'>
          {title}
        </p>
      </div>
      <div className='  '>
        <div className=' flex flex-col items-stretch '>
          <div className=' flex-auto bg-stone-300 p-3 '>{children}</div>
        </div>

        <div className=' grid flex-initial gap-2 py-2 md:grid-cols-3'>
          <div className=' overflow-hidden rounded-sm bg-stone-300 p-6 '>
            <p className=' font-Primary text-2xl '>Caisse</p>
            <p className=' inline-flex w-full items-end justify-between'>
              <span className=' font-Primary text-lg uppercase'>Entrées</span>
              <span className=' font-Primary text-xl font-thin'>
                {formatNumber(element.totalIncoming)}
              </span>
            </p>
            <p className=' inline-flex w-full items-center justify-between'>
              <span className=' font-Primary text-lg uppercase'>Sorties</span>
              <span className=' font-Primary text-xl font-thin'>
                {formatNumber(element.totalOutgoing)}
              </span>
            </p>

            <p className=' inline-flex w-full items-center justify-between'>
              <span className=' font-Primary text-lg uppercase'>Balance</span>
              <span className=' font-Primary text-xl font-thin'>
                {formatNumber(element.totalIncoming - element.totalOutgoing)}
              </span>
            </p>
          </div>
          <OperationsTotal
            title={'Achats'}
            total={element.totalPurchases}
            paid={element.totalPurchasesPaid}
          />

          <OperationsTotal
            title={'Ventes'}
            total={element.totalSales}
            paid={element.totalSalesPaid}
          />
        </div>
      </div>
    </div>
  );
}

function OperationsTotal({
  title,
  total,
  paid,
}: {
  title: string;
  total: number;
  paid: number;
}) {
  return (
    <div className=' overflow-hidden rounded-sm bg-stone-300 p-6 '>
      <p className=' font-Primary text-2xl '>{title}</p>
      <p className=' inline-flex w-full items-end justify-between'>
        <span className=' font-Primary text-lg uppercase'>Total</span>
        <span className=' font-Primary text-xl font-thin'>
          {formatNumber(total)}
        </span>
      </p>
      <p className=' inline-flex w-full items-center justify-between'>
        <span className=' font-Primary text-lg uppercase'>Payé</span>
        <span className=' font-Primary text-xl font-thin'>
          {formatNumber(paid)}
        </span>
      </p>

      <p className=' inline-flex w-full items-center justify-between'>
        <span className=' font-Primary text-lg uppercase'>Dettes</span>
        <span className=' font-Primary text-xl font-thin'>
          {formatNumber(total - paid)}
        </span>
      </p>
    </div>
  );
}
