import { AdminShell } from '@/components/admin/AdminShell';
import { ProductsPanel } from '@/components/admin/ProductsPanel';

export default function ProductosPage() {
  return (
    <AdminShell title="Productos">
      <ProductsPanel />
    </AdminShell>
  );
}
