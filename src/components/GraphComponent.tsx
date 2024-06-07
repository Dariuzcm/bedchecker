/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStore } from "@/store/store";
import { ChartProps, Line } from 'react-chartjs-2';
import { getRandomColor, mapChartDataMovements } from "@/utils/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataset,
  ChartOptions,
} from "chart.js";
import { FunctionComponent, useEffect, useState } from "react";


interface GraphComponentProps {}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Actividad de la semana',
      fullSize: true,
      
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const GraphComponent: FunctionComponent<GraphComponentProps> = () => {
  const { user } = useStore((state) => ({
    user: state.user,
  }));

  const [chartdata, setChartdata] = useState<ChartProps['data']>({
    datasets: []
  });

  async function init() {
    const { services, dates , data } = await mapChartDataMovements(user.token!);

    const dataMap: ChartProps['data'] = {
      labels: dates,
      datasets: generateDatasets(data, services)      
    }
    setChartdata(dataMap)
  }

  const generateDatasets = (data: any, services: any) => {
    const datasets = []
    for (const service of services) {
      const dataOfService = []
      for (const d of data) {
        dataOfService.push(d[service])
      }
      const color = getRandomColor()
      const dataset: ChartDataset = {
        label: service,
        data: dataOfService,
        borderColor: color,
        backgroundColor: color,
      }
      datasets.push(dataset)
    }
    return datasets
  }
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col max-w-[700px] self-center w-full h-1/2">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*@ts-ignore */}
        <Line options={options} data={chartdata} />
      </div>
    </>
  );
};

export default GraphComponent;
