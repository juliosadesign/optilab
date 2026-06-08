// src/components/IterationTable.jsx

function formatNumber(value) {
    if (value === null || value === undefined) return '-'
  
    return Number(value).toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    })
  }
  
  function IterationTable({ iterations }) {
    if (!iterations || iterations.length === 0) {
      return (
        <p className="empty-message">
          Nenhuma iteração foi gerada com os valores atuais.
        </p>
      )
    }
  
    return (
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>k</th>
              <th>Raio r</th>
              <th>Altura h</th>
              <th>Área A(r)</th>
              <th>Derivada A&apos;(r)</th>
            </tr>
          </thead>
  
          <tbody>
            {iterations.map((iteration) => (
              <tr key={iteration.k}>
                <td>{iteration.k}</td>
                <td>{formatNumber(iteration.radius)}</td>
                <td>{formatNumber(iteration.height)}</td>
                <td>{formatNumber(iteration.area)}</td>
                <td>{formatNumber(iteration.derivative)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  export default IterationTable
  