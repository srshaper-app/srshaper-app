import { AdminShell } from '@/components/admin/AdminShell';
import { CouponsPanel } from '@/components/admin/CouponsPanel';

export default function CuponesPage() {
  return (
    <AdminShell title="Cupones">
      <CouponsPanel />
    </AdminShell>
  );
}
