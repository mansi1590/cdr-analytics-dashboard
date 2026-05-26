import { Moon, Sun, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useCDRData } from "./hooks/useCDRData";
import Login from "./Pages/Login";

import {
  calculateKPIs,
  getDurationDistribution,
  getCostByCity,
  getCallsPerHour,
  getCallsByCity,
} from "./lib/analytics";

import {
  KPICards,
  CallDurationChart,
  CallCostChart,
  CallTimelineChart,
  CallsByCityBarChart,
  RecentCallsTable,
  LoadingSkeleton,
  ErrorDisplay,
  DashboardHeader,
} from "./components/dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const { data, loading, error, refetch } = useCDRData();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const pageClass =
    "min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-4 md:p-6 transition-colors duration-300";

  const lastUpdated = new Date().toLocaleTimeString();

  if (loading) {
    return (
      <div className={pageClass}>
        <HeaderActions
          lastUpdated={lastUpdated}
          onRefresh={refetch}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onLogout={handleLogout}
        />
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className={pageClass}>
        <HeaderActions
          lastUpdated={lastUpdated}
          onRefresh={refetch}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onLogout={handleLogout}
        />
        <ErrorDisplay message={error} onRetry={refetch} />
      </div>
    );
  }

  const kpis = calculateKPIs(data);
  const durationDistribution = getDurationDistribution(data);
  const costByCity = getCostByCity(data);
  const callsPerHour = getCallsPerHour(data);
  const callsByCity = getCallsByCity(data);

  return (
    <div className={pageClass}>
      <HeaderActions
        lastUpdated={lastUpdated}
        onRefresh={refetch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
      />

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

function HeaderActions({
  lastUpdated,
  onRefresh,
  darkMode,
  setDarkMode,
  onLogout,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
      <DashboardHeader />

      <div className="flex items-center gap-3 self-end lg:self-auto">
        <p className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
          Last updated: {lastUpdated}
        </p>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>

        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        <button
          onClick={onLogout}
          className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm text-red-600 shadow-sm hover:bg-red-50 dark:border-red-800 dark:bg-slate-900 dark:hover:bg-red-950 transition-colors"
        >
          Logout
        </button>
      </div>
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