import React, { useMemo, useState } from 'react'

export default function ProductCustomizer() {
  const [tipo, setTipo] = useState('Topper')
  const [texto, setTexto] = useState('')
  const [tam, setTam] = useState('Mediano')
  const [cantidad, setCantidad] = useState(1)

  const total = useMemo(() => {
    const base = tipo === 'Piñata' ? 25 : 12
    const extraTam = tam === 'Grande' ? 6 : tam === 'Mediano' ? 3 : 0
    const extraTexto = texto.trim() ? 2 : 0
    return (base + extraTam + extraTexto) * Math.max(1, cantidad)
  }, [tipo, tam, texto, cantidad])

  const addToCart = () => {
    const form = document.querySelector('form.cart')
    if (!form) return alert('Abre esto dentro de una página de producto')

    // cantidad
    const qtyInput = form.querySelector('input.qty')
    if (qtyInput) qtyInput.value = String(Math.max(1, cantidad))

    // crea/actualiza campos ocultos para WooCommerce (van por POST)
    const put = (name, value) => {
      let input = form.querySelector(`input[name="${name}"]`)
      if (!input) {
        input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        form.appendChild(input)
      }
      input.value = value
    }

    put('doitarts_tipo', tipo)
    put('doitarts_tam', tam)
    put('doitarts_texto', texto)
    put('doitarts_total_aprox', String(total))

    const btn = form.querySelector('button.single_add_to_cart_button')
    if (btn) btn.click()
  }

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>Personaliza tu pedido</h3>

      <div style={{ display: 'grid', gap: 10 }}>
        <label>
          Producto
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 10 }}>
            <option>Topper</option>
            <option>Piñata</option>
          </select>
        </label>

        <label>
          Tamaño
          <select value={tam} onChange={(e) => setTam(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 10 }}>
            <option>Pequeño</option>
            <option>Mediano</option>
            <option>Grande</option>
          </select>
        </label>

        <label>
          Texto
          <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Ej: Sofía 5 años" style={{ width: '100%', padding: 10, borderRadius: 10 }} />
        </label>

        <label>
          Cantidad
          <input type="number" min="1" value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value || '1', 10))} style={{ width: '100%', padding: 10, borderRadius: 10 }} />
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800 }}>
          <span>Total aprox</span>
          <span>{total}€</span>
        </div>

        <button type="button" onClick={addToCart} style={{ padding: '12px 14px', borderRadius: 12, fontWeight: 800 }}>
          Añadir al carrito
        </button>
      </div>
    </div>
  )
}
