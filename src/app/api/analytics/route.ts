import { NextResponse } from 'next/server';
import { createGa4Client } from '@/lib/ga4';

export async function GET() {
  if (!process.env.GA4_PROPERTY_ID || !process.env.GA4_CLIENT_EMAIL || !process.env.GA4_PRIVATE_KEY) {
    return NextResponse.json({ error: 'GA4 no configurado' }, { status: 400 });
  }

  const client = createGa4Client();
  const [response] = await client.runReport({
    property: `properties/${process.env.GA4_PROPERTY_ID}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    metrics: [
      { name: 'activeUsers' },
      { name: 'screenPageViews' },
      { name: 'averageEngagementTime' },
      { name: 'sessions' },
    ],
  });

  const row = response.rows?.[0];
  const values = row?.metricValues || [];

  return NextResponse.json({
    uniqueVisitors: Number(values[0]?.value || 0),
    totalImpressions: Number(values[1]?.value || 0),
    avgEngagementTimeSeconds: Number(values[2]?.value || 0),
    sessions: Number(values[3]?.value || 0),
  });
}
