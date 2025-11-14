export const PriceBreakdown = ({ basePrice, quantity }) => {
  const subtotal = basePrice * quantity
  const commission = basePrice * 0.03
  const total = subtotal + commission

  return (
    <div className="total-section">
      <h3 className="total-title">Monto total</h3>
      <div className="total-row">
        <span className="total-label">Precio Base</span>
        <span className="total-value">{basePrice.toFixed(1)}</span>
      </div>
      <div className="total-row">
        <span className="total-label">Cantidad : x{quantity}</span>
        <span className="total-value">{subtotal.toFixed(1)}</span>
      </div>
      <div className="total-row">
        <span className="total-label">Comisión</span>
        <span className="total-value">{commission.toFixed(1)}</span>
      </div>
      <div className="total-row total-final">
        <span className="total-label">Total</span>
        <span className="total-value">{total.toFixed(1)}</span>
      </div>
    </div>
  )
}
