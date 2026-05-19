import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useCDRData } from "./hooks/useCDRData";

import {
  calculateKPIs,
  getCallDurationStats,
  getDurationDistribution,
  getCostByCity,
  getAverageCostPerCall,
  getCallsPerHour,
  getCallsByCity,
} from "./lib/analytics";

import {
  KPICards,
  CallDurationStats,
  CallDurationChart,
  CallCostChart,
  CostSummary,
  CallTimelineChart,
  CallsByCityPieChart,
  CallsByCityBarChart,
  RecentCallsTable,
  LoadingSkeleton,
  ErrorDisplay,
  DashboardHeader,
} from "./components/dashboard";

function App() {
  const { data, loading, error, refetch } = useCDRData();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const pageClass =
    "min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 md:p-6 transition-colors duration-300";

  if (loading) {
    return (
      <div className={pageClass} >
        <DashboardHeader  />

        <div className="flex justify-end mb-4">
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (



      <div className={pageClass}>
      

        <div className="flex justify-end mb-4">
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <ErrorDisplay message={error} onRetry={refetch} />
      </div>
    );
  }

  const kpis = calculateKPIs(data);
  const durationStats = getCallDurationStats(data);
  const durationDistribution = getDurationDistribution(data);
  const costByCity = getCostByCity(data);
  const avgCost = getAverageCostPerCall(data);
  const callsPerHour = getCallsPerHour(data);
  const callsByCity = getCallsByCity(data);

  const lastUpdated = new Date().toLocaleTimeString();

  return (
    <div className={pageClass}>
     <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

  {/* Left Side */}
  <DashboardHeader />

  {/* Right Side */}
  <div className="flex items-center gap-4 self-end lg:self-auto">

    <p className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
      Last updated: {lastUpdated}
    </p>

    <button
      onClick={refetch}
      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
    >
      Refresh
    </button>

    <ThemeToggle
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />

  </div>

</div>

      <section className="mb-6">
        <KPICards kpis={kpis} />
      </section>

      <section className="mb-6">
    

        <div className="grid md:grid-cols-2 gap-6">
         
          <CallDurationChart data={durationDistribution} />
          <CallCostChart data={costByCity} />
        </div>
      </section>



      <section className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Call Activity Timeline
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <CallTimelineChart data={callsPerHour} title="Calls per Hour" />
         <CallsByCityBarChart data={callsByCity} />
        </div>
      </section>



      <section className="mb-6">
        <RecentCallsTable data={data} />
      </section>


    </div>
  );
}

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      <span>{darkMode ? "Light" : "Dark"}</span>
    </button>
  );
}

export default App;