import { getWeekMovements } from "@/api/movementsServiceHandler";
import { Movement } from "@/types/movementTypes";
import { Token } from "@/types/userTypes";
import moment from "moment";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function mapChartDataMovements(accessToken: Token) {
  const movements: Movement[] = await getWeekMovements(accessToken)
  const dates = new Set();
  const services = new Set<string>();
  const data = [];
  for (const movement of movements) {
    const momentObj = moment(movement.end);
    dates.add(momentObj.format("YYYY-MM-DD"));
    services.add(movement.service!.description!);
    data.push({
      serviceCode: movement.service!.description!,
      date: momentObj.format("YYYY-MM-DD"),
    });
  }

  const counteredData = [];
  for (const date of dates) {
    const byDate = data.filter((item) => item.date === date);
    const servicesType = [...services] as const;
    type ServiceCounts = Record<typeof servicesType[number], number>;

    const initial: ServiceCounts = {}

    for(const serv of services) {
      initial[serv] = 0
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count = byDate.reduce((acc: ServiceCounts , current) => {
      if(!acc[current.serviceCode]) {
        acc[current.serviceCode] = 1
      } else {
        acc[current.serviceCode]++
      }
      return acc
    }, initial);
    const toMutate = moment(date as string)
    counteredData.push({
      date: toMutate.format('MMM D'),
      ...count
    });
  }
  return {services: [...services], dates: [...dates], data: counteredData }
}

export function getRandomColor(): string {
  const colors = [
    '#070736', 
    '#0d0d6b', 
    '#1414a1', 
    '#1a1ad6', 
    '#4545e8', 
    '#6a6aed', 
    '#8f8ff1', 
    '#b5b5f6', 
    '#dadafa',
    '#0e241f',
    '#1b483e',
    '#296d5d',
    '#37917c',
    '#45b69c',
    '#68c6b0',
    '#8ed4c4',
    '#b4e2d7',
    '#333333',
    '#666666',
    '#999999',
    '#cccccc',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}