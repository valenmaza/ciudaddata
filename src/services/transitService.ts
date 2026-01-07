export type TransitRoute = {
  line: string;
  mode: 'bus' | 'metro';
  status: 'operational' | 'delayed' | 'closed';
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const getRoutes = async (city: string): Promise<TransitRoute[]> => {
  await wait(500);
  const defaultRoutes: TransitRoute[] = [
    { line: '1A', mode: 'bus', status: 'operational' },
    { line: '2B', mode: 'metro', status: 'delayed' },
    { line: '3C', mode: 'bus', status: 'operational' }
  ];
  return defaultRoutes.map((r) => ({ ...r, line: `${r.line}-${city.toUpperCase()}` }));
};

export const getETA = async (stopId: string): Promise<{ stopId: string; etaMinutes: number }> => {
  await wait(100);
  const etaMinutes = Math.floor(Math.random() * 15) + 1;
  return { stopId, etaMinutes };
};