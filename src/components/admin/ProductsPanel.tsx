'use client';

import { useEffect, useMemo, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  subcategory: string | null;
  price_cents: number;
  currency: string;
  image_url: string | null;
  active: boolean;
};

const formatMoney = (value: number, currency: string) => {
  const amount = value / 100;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function ProductsPanel() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'Accesorios',
    subcategory: 'Quillas',
    price_cents: 0,
    currency: 'USD',
    image_url: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState({
    name: '',
    description: '',
    category: 'Accesorios',
    subcategory: 'Quillas',
    price_cents: 0,
    currency: 'USD',
    image_url: '',
    active: true,
  });

  useEffect(() => {
    const load = async () => {
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      setProducts(productsData || []);
    };
    load();
  }, [supabase]);

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from('products')
      .insert({
        ...newProduct,
        price_cents: Number(newProduct.price_cents),
      })
      .select('*');
    if (error) {
      setError(error.message);
      return;
    }
    setProducts([...(data || []), ...products]);
    setNewProduct({
      name: '',
      description: '',
      category: 'Accesorios',
      subcategory: 'Quillas',
      price_cents: 0,
      currency: 'USD',
      image_url: '',
    });
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      setError(error.message);
      return;
    }
    setProducts(products.filter((product) => product.id !== id));
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditProduct({
      name: product.name,
      description: product.description || '',
      category: product.category || 'Accesorios',
      subcategory: product.subcategory || '',
      price_cents: product.price_cents,
      currency: product.currency,
      image_url: product.image_url || '',
      active: product.active,
    });
  };

  const cancelEdit = () => setEditingId(null);

  const handleUpdateProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingId) return;
    const { data, error } = await supabase
      .from('products')
      .update({
        ...editProduct,
        price_cents: Number(editProduct.price_cents),
      })
      .eq('id', editingId)
      .select('*')
      .single();
    if (error) {
      setError(error.message);
      return;
    }
    setProducts((prev) => prev.map((p) => (p.id === editingId ? data : p)));
    setEditingId(null);
  };

  return (
    <div className="admin-grid">
      <section className="admin-card">
        <h2>Crear producto</h2>
        <form className="admin-form" onSubmit={handleAddProduct}>
          <input
            placeholder="Nombre"
            value={newProduct.name}
            onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })}
            required
          />
          <input
            placeholder="Descripción"
            value={newProduct.description}
            onChange={(event) => setNewProduct({ ...newProduct, description: event.target.value })}
          />
          <select
            value={newProduct.category}
            onChange={(event) => setNewProduct({ ...newProduct, category: event.target.value })}
          >
            <option>Accesorios</option>
            <option>Tablas</option>
          </select>
          <input
            placeholder="Subcategoría"
            value={newProduct.subcategory}
            onChange={(event) => setNewProduct({ ...newProduct, subcategory: event.target.value })}
          />
          <input
            placeholder="Precio (centavos)"
            type="number"
            value={newProduct.price_cents}
            onChange={(event) => setNewProduct({ ...newProduct, price_cents: Number(event.target.value) })}
          />
          <input
            placeholder="URL imagen"
            value={newProduct.image_url}
            onChange={(event) => setNewProduct({ ...newProduct, image_url: event.target.value })}
          />
          <button type="submit">Agregar producto</button>
        </form>
      </section>

      <section className="admin-card">
        <h2>Productos cargados</h2>
        <div className="admin-list">
          {products.map((product) => (
            <div key={product.id} className="admin-list-item">
              {editingId === product.id ? (
                <form className="admin-form" onSubmit={handleUpdateProduct}>
                  <input
                    placeholder="Nombre"
                    value={editProduct.name}
                    onChange={(event) => setEditProduct({ ...editProduct, name: event.target.value })}
                    required
                  />
                  <input
                    placeholder="Descripción"
                    value={editProduct.description}
                    onChange={(event) => setEditProduct({ ...editProduct, description: event.target.value })}
                  />
                  <select
                    value={editProduct.category}
                    onChange={(event) => setEditProduct({ ...editProduct, category: event.target.value })}
                  >
                    <option>Accesorios</option>
                    <option>Tablas</option>
                  </select>
                  <input
                    placeholder="Subcategoría"
                    value={editProduct.subcategory}
                    onChange={(event) => setEditProduct({ ...editProduct, subcategory: event.target.value })}
                  />
                  <input
                    placeholder="Precio (centavos)"
                    type="number"
                    value={editProduct.price_cents}
                    onChange={(event) => setEditProduct({ ...editProduct, price_cents: Number(event.target.value) })}
                  />
                  <input
                    placeholder="URL imagen"
                    value={editProduct.image_url}
                    onChange={(event) => setEditProduct({ ...editProduct, image_url: event.target.value })}
                  />
                  <label className="admin-checkbox">
                    <input
                      type="checkbox"
                      checked={editProduct.active}
                      onChange={(event) => setEditProduct({ ...editProduct, active: event.target.checked })}
                    />
                    Activo en tienda
                  </label>
                  <div className="admin-actions">
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={cancelEdit} className="ghost">Cancelar</button>
                  </div>
                </form>
              ) : (
                <div className="admin-product-row">
                  <div>
                    <strong>{product.name}</strong>
                    <p>{product.category} · {product.subcategory}</p>
                    <span>{formatMoney(product.price_cents, product.currency)}</span>
                  </div>
                  <div className="admin-actions">
                    <button onClick={() => startEdit(product)}>Editar</button>
                    <button className="danger" onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {error && <p className="admin-error">{error}</p>}
      </section>
    </div>
  );
}
