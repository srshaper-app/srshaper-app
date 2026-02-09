import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export const createSupabaseServerClient = () => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name) {
          const store = await cookieStore;
          return store.get(name)?.value;
        },
        async set(name, value, options) {
          const store = await cookieStore;
          store.set({ name, value, ...options });
        },
        async remove(name, options) {
          const store = await cookieStore;
          store.set({ name, value: '', ...options });
        },
      },
    }
  );
};
