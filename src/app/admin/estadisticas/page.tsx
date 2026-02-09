import { AdminShell } from '@/components/admin/AdminShell';
import { StatsPanel } from '@/components/admin/StatsPanel';

export default function EstadisticasPage() {
  return (
    <AdminShell title="Estadísticas">
      <StatsPanel />
    </AdminShell>
  );
}
