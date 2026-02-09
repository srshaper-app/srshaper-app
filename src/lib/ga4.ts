import { BetaAnalyticsDataClient } from '@google-analytics/data';

export const createGa4Client = () => {
  const clientEmail = process.env.GA4_CLIENT_EMAIL!;
  const privateKey = process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, '\n')!;

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
  });
};
