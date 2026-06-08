// src/components/LinearChart.jsx

import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
  } from 'chart.js'
  import { Scatter } from 'react-chartjs-2'
  
  ChartJS.register(
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
  )
  
  function toNumber(value) {
    const number = Number(value)
    return Number.isFinite(number) ? number : 0
  }
  
  function isValidPoint(point) {
    return (
      point &&
      Number.isFinite(point.x) &&
      Number.isFinite(point.y) &&
      point.x >= 0 &&
      point.y >= 0
    )
  }
  
  function getIntercepts(a, b, d) {
    const points = []
  
    if (Math.abs(a) > 1e-9) {
      points.push({ x: d / a, y: 0 })
    }
  
    if (Math.abs(b) > 1e-9) {
      points.push({ x: 0, y: d / b })
    }
  
    return points.filter(isValidPoint)
  }
  
  function getChartLimit(params, feasiblePoints, bestPoint) {
    const { a1, b1, d1, a2, b2, d2 } = params
  
    const intercepts = [
      ...getIntercepts(a1, b1, d1),
      ...getIntercepts(a2, b2, d2),
    ]
  
    const allPoints = [
      ...intercepts,
      ...feasiblePoints,
      bestPoint,
    ].filter(isValidPoint)
  
    const maxX = Math.max(...allPoints.map((point) => point.x), 10)
    const maxY = Math.max(...allPoints.map((point) => point.y), 10)
  
    return {
      xMax: Math.ceil(maxX * 1.2),
      yMax: Math.ceil(maxY * 1.2),
    }
  }
  
  function generateRestrictionLine(a, b, d, xMax, yMax) {
    const linePoints = []
  
    // Caso comum: ax + by = d => y = (d - ax) / b
    if (Math.abs(b) > 1e-9) {
      const steps = 40
  
      for (let i = 0; i <= steps; i++) {
        const x = (xMax / steps) * i
        const y = (d - a * x) / b
  
        if (Number.isFinite(y) && y >= 0 && y <= yMax) {
          linePoints.push({ x, y })
        }
      }
  
      return linePoints
    }
  
    // Caso especial: b = 0, então a reta é vertical: x = d / a
    if (Math.abs(a) > 1e-9) {
      const x = d / a
  
      if (Number.isFinite(x) && x >= 0 && x <= xMax) {
        return [
          { x, y: 0 },
          { x, y: yMax },
        ]
      }
    }
  
    return []
  }
  
  function LinearChart({ params, feasiblePoints, bestPoint }) {
    const numericParams = {
      a1: toNumber(params.a1),
      b1: toNumber(params.b1),
      d1: toNumber(params.d1),
      a2: toNumber(params.a2),
      b2: toNumber(params.b2),
      d2: toNumber(params.d2),
    }
  
    const { xMax, yMax } = getChartLimit(
      numericParams,
      feasiblePoints,
      bestPoint,
    )
  
    const restriction1Line = generateRestrictionLine(
      numericParams.a1,
      numericParams.b1,
      numericParams.d1,
      xMax,
      yMax,
    )
  
    const restriction2Line = generateRestrictionLine(
      numericParams.a2,
      numericParams.b2,
      numericParams.d2,
      xMax,
      yMax,
    )
  
    const feasibleData = feasiblePoints
      .filter(isValidPoint)
      .map((point) => ({
        x: point.x,
        y: point.y,
      }))
  
    const bestPointData = isValidPoint(bestPoint)
      ? [
          {
            x: bestPoint.x,
            y: bestPoint.y,
          },
        ]
      : []
  
    const data = {
      datasets: [
        {
          label: 'Restrição 1',
          data: restriction1Line,
          showLine: true,
          pointRadius: 0,
          borderWidth: 3,
          borderColor: '#2563eb',
          backgroundColor: '#2563eb',
        },
        {
          label: 'Restrição 2',
          data: restriction2Line,
          showLine: true,
          pointRadius: 0,
          borderWidth: 3,
          borderColor: '#7c3aed',
          backgroundColor: '#7c3aed',
        },
        {
          label: 'Pontos viáveis',
          data: feasibleData,
          showLine: false,
          pointRadius: 6,
          pointHoverRadius: 8,
          backgroundColor: '#0f172a',
        },
        {
          label: 'Solução ótima',
          data: bestPointData,
          showLine: false,
          pointRadius: 9,
          pointHoverRadius: 11,
          backgroundColor: '#16a34a',
        },
      ],
    }
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Região Viável e Solução Ótima',
        },
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label(context) {
              const x = Number(context.parsed.x).toFixed(2)
              const y = Number(context.parsed.y).toFixed(2)
  
              return `${context.dataset.label}: (${x}, ${y})`
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Produto A (x)',
          },
          min: 0,
          max: xMax,
        },
        y: {
          title: {
            display: true,
            text: 'Produto B (y)',
          },
          min: 0,
          max: yMax,
        },
      },
    }
  
    return (
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <span className="section-tag">Visualização gráfica</span>
            <h3>Gráfico da Otimização Linear</h3>
          </div>
  
          <p>
            O gráfico mostra as restrições, os pontos viáveis e o ponto que gera o
            maior lucro.
          </p>
        </div>
  
        <div className="chart-area">
          <Scatter data={data} options={options} />
        </div>
  
        <div className="chart-explanation">
          <strong>Interpretação:</strong>
          <p>
            A solução ótima em problemas lineares com duas variáveis ocorre em um
            dos vértices da região viável. O gráfico mostra as restrições, os
            pontos possíveis e destaca a solução que maximiza a função objetivo.
          </p>
        </div>
      </div>
    )
  }
  
  export default LinearChart