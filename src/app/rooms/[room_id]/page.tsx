import HistoryData from '@/components/HistoryData';
import OverviewData from '@/components/OverviewData';

import { TotalDataset } from '@/lib/types';

export default async function Page({ params }: { params: Promise<{ room_id: string }> }) {
  const { room_id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${room_id}`, {
    method: 'GET',
    cache: 'no-cache',
  });
  const totalDataset = (await res.json()) as TotalDataset;
  return (
    <div className="flex h-full flex-col gap-8 p-8">
      <div>
        <OverviewData totalDataset={totalDataset} />
      </div>
      <div className="overflow-scroll">
        <HistoryData
          agent_action_types={totalDataset.agent_action_types}
          elapsed_times={totalDataset.elapsed_times}
          history={totalDataset.history}
        />
      </div>
    </div>
  );
}
