'use client';

import { useEffect, useMemo, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { parseProductImageUrls, serializeProductImageUrls, getPrimaryProductImage } from '@/lib/productImages';

const ACCESSORY_OPTIONS = ['Quillas', 'Leashes', 'Grips', 'Fundas', 'Wax'] as const;
const QUILLAS_TYPE_OPTIONS = ['Single', 'Twin', 'Thruster', 'Quad'] as const;
const TABLE_MODEL_OPTIONS = ['Princess', 'Gentleman', 'Gangster', 'Shark Attack'] as const;
const SURF_SKATE_OPTIONS = ['Surfskates', 'Decks', 'Ejes', 'Ruedas', 'Bushings', 'Rodamientos', 'Accesorios'] as const;
const CATEGORY_OPTIONS = ['Accesorios', 'Tablas', 'Surf Skate'] as const;

const CURRENCY = 'EUR';

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
  stock: number | null;
};

const formatMoney = (value: number) => {
  const amount = value / 100;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: CURRENCY,
    maximumFractionDigits: 2,
  }).format(amount);
};

const parseEuroInputToCents = (raw: string) => {
  const trimmed = raw.trim();
  if (!trimmed) return 0;

  // Accept both "50,50" and "50.50". If comma is used, dots are treated as thousands separators.
  const normalized = trimmed.includes(',')
    ? trimmed.replace(/\./g, '').replace(',', '.')
    : trimmed;

  const value = Number(normalized);
  if (!Number.isFinite(value) || value < 0) return null;
  return Math.round(value * 100);
};

const getSubcategoryOptions = (category: string) => {
  if (category === 'Accesorios') return [...ACCESSORY_OPTIONS];
  if (category === 'Tablas') return [...TABLE_MODEL_OPTIONS];
  if (category === 'Surf Skate') return [...SURF_SKATE_OPTIONS];
  return [];
};

const normalizeSubcategoryForForm = (category: string, raw: string | null) => {
  const safe = raw || '';
  if (category === 'Accesorios') {
    if (safe === 'Quillas') {
      return { subcategory: 'Quillas', finType: QUILLAS_TYPE_OPTIONS[0] };
    }
    const prefix = 'Quillas - ';
    if (safe.startsWith(prefix)) {
      const maybeType = safe.slice(prefix.length).trim();
      const finType = QUILLAS_TYPE_OPTIONS.includes(maybeType as (typeof QUILLAS_TYPE_OPTIONS)[number])
        ? maybeType
        : QUILLAS_TYPE_OPTIONS[0];
      return { subcategory: 'Quillas', finType };
    }
    return {
      subcategory: ACCESSORY_OPTIONS.includes(safe as (typeof ACCESSORY_OPTIONS)[number])
        ? safe
        : ACCESSORY_OPTIONS[0],
      finType: QUILLAS_TYPE_OPTIONS[0],
    };
  }

  if (category === 'Surf Skate') {
    return {
      subcategory: SURF_SKATE_OPTIONS.includes(safe as (typeof SURF_SKATE_OPTIONS)[number])
        ? safe
        : SURF_SKATE_OPTIONS[0],
      finType: QUILLAS_TYPE_OPTIONS[0],
    };
  }

  return {
    subcategory: TABLE_MODEL_OPTIONS.includes(safe as (typeof TABLE_MODEL_OPTIONS)[number])
      ? safe
      : TABLE_MODEL_OPTIONS[0],
    finType: QUILLAS_TYPE_OPTIONS[0],
  };
};

const buildSubcategoryForSave = (category: string, subcategory: string, finType: string) => {
  if (category === 'Accesorios' && subcategory === 'Quillas') {
    const safeType = QUILLAS_TYPE_OPTIONS.includes(finType as (typeof QUILLAS_TYPE_OPTIONS)[number])
      ? finType
      : QUILLAS_TYPE_OPTIONS[0];
    return `Quillas - ${safeType}`;
  }
  return subcategory;
};

export function ProductsPanel() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'Accesorios',
    subcategory: 'Quillas',
    quillas_type: 'Single',
    price_eur: '0',
    image_urls: [] as string[],
    stock: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState({
    name: '',
    description: '',
    category: 'Accesorios',
    subcategory: 'Quillas',
    quillas_type: 'Single',
    price_eur: '0',
    image_urls: [] as string[],
    active: true,
    stock: 0,
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

  const uploadImage = async (file: File) => {
    setUploading(true);
    setError(null);
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type || 'image/jpeg',
      });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return '';
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    setUploading(false);
    return data.publicUrl;
  };

  const uploadImages = async (files: File[]) => {
    const uploaded: string[] = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if (!url) continue;
      uploaded.push(url);
    }
    return uploaded;
  };

  const displaySubcategory = (raw: string | null) => {
    if (!raw) return '';
    return raw.replace('Quillas - ', 'Quillas · ');
  };

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    const priceCents = parseEuroInputToCents(newProduct.price_eur);
    if (priceCents === null) {
      setError('Precio no válido. Usa formato como 50,50 o 50.50.');
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        name: newProduct.name,
        description: newProduct.description,
        category: newProduct.category,
        subcategory: buildSubcategoryForSave(
          newProduct.category,
          newProduct.subcategory,
          newProduct.quillas_type
        ),
        price_cents: priceCents,
        currency: CURRENCY,
        image_url: serializeProductImageUrls(newProduct.image_urls),
        active: true,
        stock: Number(newProduct.stock) || 0,
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
      quillas_type: 'Single',
      price_eur: '0',
      image_urls: [],
      stock: 0,
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
    const normalized = normalizeSubcategoryForForm(product.category || 'Accesorios', product.subcategory);

    setEditingId(product.id);
    setEditProduct({
      name: product.name,
      description: product.description || '',
      category: product.category || 'Accesorios',
      subcategory: normalized.subcategory,
      quillas_type: normalized.finType,
      price_eur: (product.price_cents / 100).toFixed(2).replace('.', ','),
      image_urls: parseProductImageUrls(product.image_url),
      active: product.active,
      stock: product.stock ?? 0,
    });
  };

  const cancelEdit = () => setEditingId(null);

  const handleUpdateProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingId) return;
    const priceCents = parseEuroInputToCents(editProduct.price_eur);
    if (priceCents === null) {
      setError('Precio no válido. Usa formato como 50,50 o 50.50.');
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .update({
        name: editProduct.name,
        description: editProduct.description,
        category: editProduct.category,
        subcategory: buildSubcategoryForSave(
          editProduct.category,
          editProduct.subcategory,
          editProduct.quillas_type
        ),
        price_cents: priceCents,
        currency: CURRENCY,
        image_url: serializeProductImageUrls(editProduct.image_urls),
        active: editProduct.active,
        stock: Number(editProduct.stock) || 0,
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
          <div className="admin-form-row">
            <label>Nombre</label>
            <input
              placeholder="Nombre"
              value={newProduct.name}
              onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })}
              required
            />
          </div>
          <div className="admin-form-row">
            <label>Descripción</label>
            <textarea
              placeholder="Descripción"
              value={newProduct.description}
              onChange={(event) => setNewProduct({ ...newProduct, description: event.target.value })}
            />
          </div>
          <div className="admin-form-grid">
            <div className="admin-form-row">
              <label>Categoría</label>
              <select
                value={newProduct.category}
                onChange={(event) => {
                  const category = event.target.value;
                  const normalized = normalizeSubcategoryForForm(category, newProduct.subcategory);
                  setNewProduct({
                    ...newProduct,
                    category,
                    subcategory: normalized.subcategory,
                    quillas_type: normalized.finType,
                  });
                }}
              >
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-row">
              <label>Subcategoría</label>
              <select
                value={newProduct.subcategory}
                onChange={(event) => {
                  const subcategory = event.target.value;
                  setNewProduct({
                    ...newProduct,
                    subcategory,
                    quillas_type:
                      subcategory === 'Quillas' ? newProduct.quillas_type : QUILLAS_TYPE_OPTIONS[0],
                  });
                }}
              >
                {getSubcategoryOptions(newProduct.category).map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            {newProduct.category === 'Accesorios' && newProduct.subcategory === 'Quillas' ? (
              <div className="admin-form-row">
                <label>Tipo de quilla</label>
                <select
                  value={newProduct.quillas_type}
                  onChange={(event) => setNewProduct({ ...newProduct, quillas_type: event.target.value })}
                >
                  {QUILLAS_TYPE_OPTIONS.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ) : null}
          </div>
          <div className="admin-form-grid">
            <div className="admin-form-row">
              <label>Precio (EUR)</label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="50,50"
                value={newProduct.price_eur}
                onChange={(event) => setNewProduct({ ...newProduct, price_eur: event.target.value })}
              />
            </div>
            <div className="admin-form-row">
              <label>Moneda</label>
              <input value={CURRENCY} disabled />
            </div>
            <div className="admin-form-row">
              <label>Stock</label>
              <input
                type="number"
                min="0"
                step="1"
                value={newProduct.stock}
                onChange={(event) => setNewProduct({ ...newProduct, stock: Number(event.target.value) })}
              />
            </div>
          </div>
          <div className="admin-form-row">
            <label>Imágenes del producto</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={async (event) => {
                const files = event.target.files ? Array.from(event.target.files) : [];
                if (!files.length) return;
                const urls = await uploadImages(files);
                if (urls.length) {
                  setNewProduct({
                    ...newProduct,
                    image_urls: Array.from(new Set([...newProduct.image_urls, ...urls])),
                  });
                }
              }}
            />
            {uploading && <span>Subiendo imágenes...</span>}
            {newProduct.image_urls.length > 0 && (
              <div className="admin-image-grid">
                {newProduct.image_urls.map((url) => (
                  <div key={url} className="admin-image-chip">
                    <img className="admin-image-preview" src={url} alt="Preview" />
                    <button
                      type="button"
                      className="admin-btn ghost"
                      onClick={() =>
                        setNewProduct({
                          ...newProduct,
                          image_urls: newProduct.image_urls.filter((img) => img !== url),
                        })
                      }
                    >
                      Quitar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="admin-btn">Agregar producto</button>
        </form>
      </section>

      <section className="admin-card">
        <h2>Productos cargados</h2>
        <div className="admin-list">
          {products.map((product) => (
            <div key={product.id} className="admin-list-item">
              {editingId === product.id ? (
                <form className="admin-form" onSubmit={handleUpdateProduct}>
                  <div className="admin-form-row">
                    <label>Nombre</label>
                    <input
                      placeholder="Nombre"
                      value={editProduct.name}
                      onChange={(event) => setEditProduct({ ...editProduct, name: event.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-row">
                    <label>Descripción</label>
                    <textarea
                      placeholder="Descripción"
                      value={editProduct.description}
                      onChange={(event) => setEditProduct({ ...editProduct, description: event.target.value })}
                    />
                  </div>
                  <div className="admin-form-grid">
                    <div className="admin-form-row">
                      <label>Categoría</label>
                      <select
                        value={editProduct.category}
                        onChange={(event) => {
                          const category = event.target.value;
                          const normalized = normalizeSubcategoryForForm(category, editProduct.subcategory);
                          setEditProduct({
                            ...editProduct,
                            category,
                            subcategory: normalized.subcategory,
                            quillas_type: normalized.finType,
                          });
                        }}
                      >
                        {CATEGORY_OPTIONS.map((category) => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div className="admin-form-row">
                      <label>Subcategoría</label>
                      <select
                        value={editProduct.subcategory}
                        onChange={(event) => {
                          const subcategory = event.target.value;
                          setEditProduct({
                            ...editProduct,
                            subcategory,
                            quillas_type:
                              subcategory === 'Quillas' ? editProduct.quillas_type : QUILLAS_TYPE_OPTIONS[0],
                          });
                        }}
                      >
                        {getSubcategoryOptions(editProduct.category).map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    {editProduct.category === 'Accesorios' && editProduct.subcategory === 'Quillas' ? (
                      <div className="admin-form-row">
                        <label>Tipo de quilla</label>
                        <select
                          value={editProduct.quillas_type}
                          onChange={(event) => setEditProduct({ ...editProduct, quillas_type: event.target.value })}
                        >
                          {QUILLAS_TYPE_OPTIONS.map((opt) => (
                            <option key={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    ) : null}
                  </div>
                  <div className="admin-form-grid">
                    <div className="admin-form-row">
                      <label>Precio (EUR)</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="50,50"
                        value={editProduct.price_eur}
                        onChange={(event) => setEditProduct({ ...editProduct, price_eur: event.target.value })}
                      />
                    </div>
                    <div className="admin-form-row">
                      <label>Moneda</label>
                      <input value={CURRENCY} disabled />
                    </div>
                    <div className="admin-form-row">
                      <label>Stock</label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={editProduct.stock}
                        onChange={(event) => setEditProduct({ ...editProduct, stock: Number(event.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="admin-form-row">
                    <label>Imágenes del producto</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={async (event) => {
                        const files = event.target.files ? Array.from(event.target.files) : [];
                        if (!files.length) return;
                        const urls = await uploadImages(files);
                        if (urls.length) {
                          setEditProduct({
                            ...editProduct,
                            image_urls: Array.from(new Set([...editProduct.image_urls, ...urls])),
                          });
                        }
                      }}
                    />
                    {editProduct.image_urls.length > 0 && (
                      <div className="admin-image-grid">
                        {editProduct.image_urls.map((url) => (
                          <div key={url} className="admin-image-chip">
                            <img className="admin-image-preview" src={url} alt="Preview" />
                            <button
                              type="button"
                              className="admin-btn ghost"
                              onClick={() =>
                                setEditProduct({
                                  ...editProduct,
                                  image_urls: editProduct.image_urls.filter((img) => img !== url),
                                })
                              }
                            >
                              Quitar
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <label className="admin-checkbox">
                    <input
                      type="checkbox"
                      checked={editProduct.active}
                      onChange={(event) => setEditProduct({ ...editProduct, active: event.target.checked })}
                    />
                    Activo en tienda
                  </label>
                  <div className="admin-actions">
                    <button type="submit" className="admin-btn">Guardar</button>
                    <button type="button" onClick={cancelEdit} className="admin-btn ghost">Cancelar</button>
                  </div>
                </form>
              ) : (
                <div className="admin-product-row">
                  <div>
                    <strong>{product.name}</strong>
                    <p>{product.category} · {displaySubcategory(product.subcategory)}</p>
                    <span>{formatMoney(product.price_cents)}</span>
                    <p>Stock: {product.stock ?? 0}</p>
                  </div>
                  <img
                    className="admin-image-preview mini"
                    src={getPrimaryProductImage(product.image_url)}
                    alt={product.name}
                  />
                  <div className="admin-actions">
                    <button className="admin-btn ghost" onClick={() => startEdit(product)}>Editar</button>
                    <button className="admin-btn danger" onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
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
