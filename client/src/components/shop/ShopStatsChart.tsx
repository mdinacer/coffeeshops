import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { StatsElement } from '../../app/models/shopStats';
import { format } from 'date-fns';
import { locale } from '../../app/layout/App';
//import faker from 'faker';

interface Props {
  title?: string;
  element: StatsElement;
}

const green = 'rgb(34 197 94)';
const red = 'rgb(239 68 68)';
const blue = 'rgb(14 165 233)';

export function ShopStatsBarChart({ title, element }: Props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = element.elementData.map((e) => {
    switch (element.title) {
      case 'Annual':
        return format(new Date(e.date), 'MMM', { locale });

      case 'Weekly':
        return format(new Date(e.date), 'dd MMM', { locale });

      case 'Daily':
        return format(new Date(e.date), 'PPPP', { locale });

      default:
        return format(new Date(e.date), 'dd/MM', { locale });
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Entrées',
        data: element.elementData.map((e) => e.incoming),
        borderColor: green,
        backgroundColor: green,
        tension: 0.2,
      },
      {
        label: 'Balance',
        data: element.elementData.map((e) => e.incoming - e.outgoing),
        borderColor: blue,
        backgroundColor: blue,
        tension: 0.2,
      },
      {
        label: 'Sorties',
        data: element.elementData.map((e) => e.outgoing * -1),
        borderColor: red,
        backgroundColor: red,
        tension: 0.2,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: title || element.title,
      },
    },
  };
  return <Bar options={options} data={data} className={'  max-h-[25vh]'} />;
}

export function ShopStatsPieChart({ title, element }: Props) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const labels = ['Sorties', 'Entrées'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Entrées',
        data: element.elementData.map((e) => [e.outgoing, e.incoming]).flat(2),
        backgroundColor: [red, green],
        borderColor: [red, green],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} className={'h-auto max-h-[25vh]'} />;
}
