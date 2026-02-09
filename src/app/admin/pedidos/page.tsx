import { AdminShell } from '@/components/admin/AdminShell';
import { OrdersPanel } from '@/components/admin/OrdersPanel';

export default function PedidosPage() {
  return (
    <AdminShell title="Pedidos">
      <OrdersPanel />
    </AdminShell>
  );
}
