import { EventProps, LineChart } from "@tremor/react";
import { FunctionComponent, useState } from "react";

interface GraphComponentProps {}

type PropertiesMapped<T> = {
  [Property in keyof T] : T[Property]
}

interface ChartData<T> {
  mapped: PropertiesMapped<T>
  date: string
}
const GraphComponent: FunctionComponent<GraphComponentProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  
  const [ _, setValue] = useState<EventProps>(null)
  //const chartdata: ChartData[] = []
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl">Actividad de la semana</h1>
        <LineChart
          className="h-80"
          data={chartdata}
          index="date"
          categories={["SemiAnalysis", "The Pragmatic Engineer"]}
          colors={["indigo", "rose", "blue"]}
          yAxisWidth={60}
          onValueChange={(v) => setValue(v)}
        />
      </div>
    </>
  );
};

export default GraphComponent;
