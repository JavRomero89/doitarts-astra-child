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

  const phone = '34XXXXXXXXX' // <-- pon tu número (prefijo país) sin "+"
  const msg = encodeURIComponent(
    `Hola! Quiero pedir:\n` +
    `Producto: ${tipo}\n` +
    `Tamaño: ${tam}\n` +
    `Texto: ${texto.trim() || '(sin texto)'}\n` +
    `Cantidad: ${cantidad}\n` +
    `Total aprox: ${total}€\n` +
    `Página: ${window.location.href}`
  )

  const wa = `https://wa.me/${phone}?text=${msg}`

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Personaliza tu pedido</h2>

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
          Texto personalizado
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

        <a href={wa} target="_blank" rel="noreferrer" style={{ textAlign: 'center', padding: '12px 14px', borderRadius: 12, fontWeight: 800, textDecoration: 'none', border: '1px solid #111' }}>
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  )
}
