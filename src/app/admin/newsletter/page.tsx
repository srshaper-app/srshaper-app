import { AdminShell } from '@/components/admin/AdminShell';
import { NewsletterPanel } from '@/components/admin/NewsletterPanel';

export default function NewsletterPage() {
  return (
    <AdminShell title="Newsletter">
      <NewsletterPanel />
    </AdminShell>
  );
}
