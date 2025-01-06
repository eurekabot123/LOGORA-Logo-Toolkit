// src/components/home/HistorySection.tsx
import HistoryGrid from './HistoryGrid';

export default function HistorySection() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Recent Logos</h2>
      </div>
      <div className="bg-white rounded-xl p-4 lg:p-6">
        <HistoryGrid />
      </div>
    </div>
  );
}