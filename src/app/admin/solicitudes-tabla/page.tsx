import { AdminShell } from '@/components/admin/AdminShell';
import { CustomBoardRequestsPanel } from '@/components/admin/CustomBoardRequestsPanel';

export default function SolicitudesTablaPage() {
  return (
    <AdminShell title="Solicitudes de tablas personalizadas">
      <CustomBoardRequestsPanel />
    </AdminShell>
  );
}
