const stats = [
  { label: "Total Revenue", value: "৳1.2M", change: "+12%" },
  { label: "Orders", value: "842", change: "+6%" },
  { label: "Active Chats", value: "18", change: "+4" },
  { label: "Low Stock", value: "5", change: "-2" },
];

const chartPoints = [12, 30, 24, 40, 32, 46, 38, 52];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Admin Overview</p>
        <h1 className="mt-2 font-serif text-4xl text-navy">Dashboard</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-gold/20 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-navy/60">{stat.label}</p>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-semibold text-navy">{stat.value}</span>
              <span className="text-xs font-semibold text-emerald-600">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-gold/20 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-navy">Sales Momentum</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-navy/60">Last 8 weeks</span>
        </div>
        <div className="mt-6 h-48 w-full">
          <svg viewBox="0 0 400 120" className="h-full w-full">
            <defs>
              <linearGradient id="goldWave" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="#1B2A4A"
              strokeWidth="3"
              points={chartPoints.map((point, index) => `${index * 55},${120 - point}`).join(" ")}
            />
            <polygon
              fill="url(#goldWave)"
              points={`0,120 ${chartPoints
                .map((point, index) => `${index * 55},${120 - point}`)
                .join(" ")} 385,120`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
