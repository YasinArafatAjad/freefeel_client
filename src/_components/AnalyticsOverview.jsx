import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure/useAxiosSecure";

const useAnalyticsData = (endpoint, queryKey) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await axiosSecure.get(endpoint);
      return res?.data?.rows || res?.data || [];
    },
    refetchOnWindowFocus: true,
    refetchInterval: endpoint.includes("realtime") ? 10000 : false, // Auto-refresh realtime data
  });
};

const AnalyticsOverview = () => {
  const { data: activeUsers = [], isPending: loadingUsers, error: errorUsers } =
    useAnalyticsData("/analytics/active-users", "activeUsers");

  const { data: deviceStats = [], isPending: loadingDevices, error: errorDevices } =
    useAnalyticsData("/analytics/device-category", "deviceCategory");

  const { data: topCountries = [], isPending: loadingCountries, error: errorCountries } =
    useAnalyticsData("/analytics/top-countries", "topCountries");

  return (
    <div style={{ padding: "2rem", maxWidth: 600 }}>
      <h2>📊 FreeFeel Analytics Snapshot</h2>

      {/* Active Users */}
      <section style={{ marginBottom: "1rem" }}>
        <h4>👥 Active Users (7 Days)</h4>
        {loadingUsers ? (
          <p>Loading...</p>
        ) : errorUsers ? (
          <p style={{ color: "red" }}>Error: {errorUsers.message}</p>
        ) : (
          <strong>{activeUsers[0]?.metricValues?.[0]?.value || "0"}</strong>
        )}
      </section>

      {/* Devices */}
      <section style={{ marginBottom: "1rem" }}>
        <h4>📱 Device Category Breakdown</h4>
        {loadingDevices ? (
          <p>Loading...</p>
        ) : errorDevices ? (
          <p style={{ color: "red" }}>Error: {errorDevices.message}</p>
        ) : (
          <ul>
            {deviceStats.map((row, idx) => (
              <li key={idx}>
                {row.dimensionValues?.[0]?.value}: {row.metricValues?.[0]?.value}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Top Countries */}
      <section>
        <h4>🌍 Top Countries</h4>
        {loadingCountries ? (
          <p>Loading...</p>
        ) : errorCountries ? (
          <p style={{ color: "red" }}>Error: {errorCountries.message}</p>
        ) : (
          <ul>
            {topCountries.map((row, idx) => (
              <li key={idx}>
                {row.dimensionValues?.[0]?.value}: {row.metricValues?.[0]?.value}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AnalyticsOverview;