import React, { useMemo, useState } from 'react'

export default function ProductCustomizer({ config }) {
  const [size, setSize] = useState('M')
  const [theme, setTheme] = useState('Cumpleaños')
  const [text, setText] = useState('')
  const [qty, setQty] = useState(1)

  const basePrice = 12.99
  const sizeExtra = useMemo(() => {
    if (size === 'S') return 0
    if (size === 'M') return 2
    if (size === 'L') return 5
    return 0
  }, [size])

  const textExtra = useMemo(() => (text.trim().length > 0 ? 1.5 : 0), [text])
  const total = useMemo(() => (basePrice + sizeExtra + textExtra) * Math.max(1, qty), [basePrice, sizeExtra, textExtra, qty])

  const phone = (config?.whatsAppPhone || '').replace(/\D/g, '')
  const productId = config?.productId || ''
  const currency = config?.currencySymbol || '€'

  const message = useMemo(() => {
    const lines = [
      `Hola, quiero personalizar un producto (ID: ${productId}).`,
      `Tamaño: ${size}`,
      `Tema: ${theme}`,
      `Texto: ${text.trim() ? text.trim() : '(sin texto)'}`,
      `Cantidad: ${qty}`,
      `Total aprox: ${total.toFixed(2)} ${currency}`
    ]
    return encodeURIComponent(lines.join('\n'))
  }, [productId, size, theme, text, qty, total, currency])

  const waLink = phone ? `https://wa.me/${phone}?text=${message}` : null

  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, padding: 16, marginTop: 12 }}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Personaliza tu pedido</div>

      <div style={{ display: 'grid', gap: 10 }}>
        <label>
          <div style={{ fontSize: 13, marginBottom: 4 }}>Tamaño</div>
          <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 10 }}>
            <option value="S">S (sin extra)</option>
            <option value="M">M (+2)</option>
            <option value="L">L (+5)</option>
          </select>
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 4 }}>Tema</div>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 10 }}>
            <option>Cumpleaños</option>
            <option>Bautizo</option>
            <option>Boda</option>
            <option>Baby Shower</option>
          </select>
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 4 }}>Texto personalizado</div>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ej: Sofía, 5 años" style={{ width: '100%', padding: 10, borderRadius: 10 }} />
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Si añades texto: +1.5</div>
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 4 }}>Cantidad</div>
          <input type="number" min="1" value={qty} onChange={(e) => setQty(parseInt(e.target.value || '1', 10))} style={{ width: '100%', padding: 10, borderRadius: 10 }} />
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
          <div style={{ fontSize: 13, opacity: 0.8 }}>Total aproximado</div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{total.toFixed(2)} {currency}</div>
        </div>

        {waLink ? (
          <a href={waLink} target="_blank" rel="noreferrer" style={{ display: 'inline-block', textAlign: 'center', padding: '12px 14px', borderRadius: 12, fontWeight: 800, textDecoration: 'none', border: '1px solid #111' }}>
            Pedir por WhatsApp
          </a>
        ) : (
          <div style={{ fontSize: 12, opacity: 0.75 }}>
            Configura <b>whatsAppPhone</b> en `functions.php` para activar el botón.
          </div>
        )}
      </div>
    </div>
  )
}
