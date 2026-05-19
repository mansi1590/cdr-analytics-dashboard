import { Phone } from 'lucide-react';

export function DashboardHeader() {
  return (
    <div className="flex items-center gap-3">
      
      <div className="p-2 bg-blue-600 rounded-lg">
        <Phone className="h-6 w-6 text-white" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Call Analytics Dashboard
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Monitor call activity, costs, and performance
        </p>
      </div>

    </div>
  );
}