import { AdminShell } from '@/components/admin/AdminShell';
import { OrderDetail } from '@/components/admin/OrderDetail';

export default async function PedidoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminShell title="Detalle de pedido">
      <OrderDetail orderId={id} />
    </AdminShell>
  );
}
