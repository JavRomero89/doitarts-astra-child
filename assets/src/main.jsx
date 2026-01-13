import React from 'react'
import ReactDOM from 'react-dom/client'
import ProductCustomizer from './ProductCustomizer.jsx'

const el = document.getElementById('doitarts-react-root')
if (el) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <ProductCustomizer config={window.DOITARTS || {}} />
    </React.StrictMode>
  )
}
