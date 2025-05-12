// src/pages/Analytics.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useEffect, useState } from 'react';
import { database } from '../firebase/database';
import { ref, get } from 'firebase/database';

type ChartData = { date: string; joined: number };

const Analytics = () => {
  const [userData, setUserData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);

    try {
      const snap = await get(ref(database, 'users'));
      const raw = snap.val();

      if (!raw || typeof raw !== 'object') {
        setError('사용자 정보가 없습니다.');
        setUserData([]);
        setLoading(false);
        return;
      }

      const stats: Record<string, number> = {};

      Object.values(raw).forEach((user: any) => {
        const ts = Number(user.createdAt);
        if (!ts || isNaN(ts)) return;

        const date = new Date(ts).toISOString().split('T')[0];
        stats[date] = (stats[date] || 0) + 1;
      });

      const formatted: ChartData[] = Object.entries(stats).map(
        ([date, joined]) => ({ date, joined })
      );

      if (formatted.length === 0) {
        setError('정상적인 정보가 없습니다.');
      }

      setUserData(formatted);
    } catch (err) {
      console.error(err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      setUserData([]);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 16 }}>
        통계
      </h1>

      <button
        onClick={handleFetch}
        className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-500"
      >
        최신화
      </button>

      {loading && <p style={{ marginTop: 20 }}>통계 정보를 계산 중입니다...</p>}

      {error && !loading && (
        <p style={{ marginTop: 20, color: 'gray' }}>{error}</p>
      )}

      {!loading && !error && userData.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h2>일별 가입자 수</h2>
          <LineChart width={800} height={300} data={userData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="joined" stroke="#8884d8" />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default Analytics;
