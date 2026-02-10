import { AdminShell } from '@/components/admin/AdminShell';
import { OrderDetail } from '@/components/admin/OrderDetail';

export default function PedidoDetallePage({ params }: { params: { id: string } }) {
  return (
    <AdminShell title="Detalle de pedido">
      <OrderDetail orderId={params.id} />
    </AdminShell>
  );
}
