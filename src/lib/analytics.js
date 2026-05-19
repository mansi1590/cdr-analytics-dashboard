/**
 * Calculate KPI summary metrics
 */
export function calculateKPIs(data) {
  if (!data || data.length === 0) {
    return {
      totalCalls: 0,
      totalCost: 0,
      avgDuration: 0,
      successfulCalls: 0,
      failedCalls: 0,
    };
  }

  const totalCalls = data.length;
  
  const totalCost = data.reduce((sum, call) => {
    return sum + parseFloat(call.callCost || 0);
  }, 0);
  
  const totalDuration = data.reduce((sum, call) => {
    return sum + (call.callDuration || 0);
  }, 0);
  
  const avgDuration = totalDuration / totalCalls;
  
  const successfulCalls = data.filter(call => call.callStatus === true).length;
  const failedCalls = totalCalls - successfulCalls;

  return {
    totalCalls,
    totalCost: totalCost.toFixed(2),
    avgDuration: Math.round(avgDuration),
    successfulCalls,
    failedCalls,
  };
}

/**
 * Get call duration statistics
 */
export function getCallDurationStats(data) {
  if (!data || data.length === 0) {
    return { longest: 0, shortest: 0, average: 0 };
  }

  const durations = data.map(call => call.callDuration || 0);
  const longest = Math.max(...durations);
  const shortest = Math.min(...durations);
  const average = durations.reduce((a, b) => a + b, 0) / durations.length;

  return {
    longest,
    shortest,
    average: Math.round(average),
  };
}

/**
 * Get duration distribution for chart
 */
export function getDurationDistribution(data) {
  const ranges = [
    { label: '0-30s', min: 0, max: 30, count: 0 },
    { label: '31-60s', min: 31, max: 60, count: 0 },
    { label: '61-120s', min: 61, max: 120, count: 0 },
    { label: '121-300s', min: 121, max: 300, count: 0 },
    { label: '300s+', min: 301, max: Infinity, count: 0 },
  ];

  data.forEach(call => {
    const duration = call.callDuration || 0;
    const range = ranges.find(r => duration >= r.min && duration <= r.max);
    if (range) range.count++;
  });

  return ranges.map(({ label, count }) => ({ label, count }));
}

/**
 * Get total cost by city
 */
export function getCostByCity(data) {
  const cityMap = {};

  data.forEach(call => {
    const city = call.city || 'Unknown';
    const cost = parseFloat(call.callCost || 0);
    cityMap[city] = (cityMap[city] || 0) + cost;
  });

  return Object.entries(cityMap)
    .map(([city, cost]) => ({
      city,
      cost: parseFloat(cost.toFixed(2)),
    }))
    .sort((a, b) => b.cost - a.cost);
}

/**
 * Get average cost per call
 */
export function getAverageCostPerCall(data) {
  if (!data || data.length === 0) return 0;
  
  const totalCost = data.reduce((sum, call) => {
    return sum + parseFloat(call.callCost || 0);
  }, 0);
  
  return (totalCost / data.length).toFixed(2);
}

/**
 * Get calls per hour for timeline chart
 */
export function getCallsPerHour(data) {
  const hourMap = Array(24).fill(0);

  data.forEach(call => {
    if (call.callStartTime) {
      const hour = new Date(call.callStartTime).getHours();
      hourMap[hour]++;
    }
  });

  return hourMap.map((count, hour) => ({
    hour: `${hour.toString().padStart(2, '0')}:00`,
    calls: count,
  }));
}

/**
 * Get calls per day for timeline chart
 */
export function getCallsPerDay(data) {
  const dayMap = {};

  data.forEach(call => {
    if (call.callStartTime) {
      const date = new Date(call.callStartTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      dayMap[date] = (dayMap[date] || 0) + 1;
    }
  });

  return Object.entries(dayMap)
    .map(([date, calls]) => ({ date, calls }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Get number of calls by city
 */
export function getCallsByCity(data) {
  const cityMap = {};

  data.forEach(call => {
    const city = call.city || 'Unknown';
    cityMap[city] = (cityMap[city] || 0) + 1;
  });

  return Object.entries(cityMap)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get inbound vs outbound call counts
 */
export function getCallDirectionStats(data) {
  const inbound = data.filter(call => call.callDirection === true).length;
  const outbound = data.filter(call => call.callDirection === false).length;

  return [
    { name: 'Inbound', value: inbound },
    { name: 'Outbound', value: outbound },
  ];
}

/**
 * Format duration in seconds to readable string
 */
export function formatDuration(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

/**
 * Format timestamp to readable string
 */
export function formatDateTime(timestamp) {
  if (!timestamp) return 'N/A';
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
