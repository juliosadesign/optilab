// src/components/NonlinearChart.jsx

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
  
  function calculateArea(radius, volume) {
    return 2 * Math.PI * radius ** 2 + (2 * volume) / radius
  }
  
  function isValidPoint(point) {
    return (
      point &&
      Number.isFinite(point.x) &&
      Number.isFinite(point.y) &&
      point.x > 0 &&
      point.y > 0
    )
  }
  
  function generateCurvePoints(volume, iterations, bestRadius) {
    const validRadii = iterations
      .map((item) => Number(item.radius))
      .filter((radius) => Number.isFinite(radius) && radius > 0)
  
    if (Number.isFinite(Number(bestRadius)) && Number(bestRadius) > 0) {
      validRadii.push(Number(bestRadius))
    }
  
    const maxRadius = Math.max(...validRadii, 8)
    const startRadius = 0.5
    const endRadius = Math.max(maxRadius * 1.4, 8)
    const steps = 120
  
    const points = []
  
    for (let i = 0; i <= steps; i++) {
      const radius = startRadius + ((endRadius - startRadius) / steps) * i
      const area = calculateArea(radius, volume)
  
      const point = {
        x: radius,
        y: area,
      }
  
      if (isValidPoint(point)) {
        points.push(point)
      }
    }
  
    return points
  }
  
  function NonlinearChart({ volume, iterations, bestRadius, minArea }) {
    const numericVolume = toNumber(volume)
  
    const curvePoints = generateCurvePoints(
      numericVolume,
      iterations,
      bestRadius,
    )
  
    const iterationPoints = iterations
      .map((item) => ({
        x: Number(item.radius),
        y: Number(item.area),
      }))
      .filter(isValidPoint)
  
    const bestPoint =
      Number.isFinite(Number(bestRadius)) && Number.isFinite(Number(minArea))
        ? [
            {
              x: Number(bestRadius),
              y: Number(minArea),
            },
          ]
        : []
  
    const data = {
      datasets: [
        {
          label: 'Curva A(r)',
          data: curvePoints,
          showLine: true,
          pointRadius: 0,
          borderWidth: 3,
          borderColor: '#2563eb',
          backgroundColor: '#2563eb',
        },
        {
          label: 'Iterações do gradiente',
          data: iterationPoints,
          showLine: true,
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 2,
          borderColor: '#7c3aed',
          backgroundColor: '#7c3aed',
        },
        {
          label: 'Melhor ponto encontrado',
          data: bestPoint,
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
          text: 'Curva da Função Não Linear e Gradiente Descendente',
        },
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label(context) {
              const radius = Number(context.parsed.x).toFixed(4)
              const area = Number(context.parsed.y).toFixed(4)
  
              return `${context.dataset.label}: r = ${radius}, A(r) = ${area}`
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Raio r',
          },
          min: 0,
        },
        y: {
          title: {
            display: true,
            text: 'Área A(r)',
          },
          min: 0,
        },
      },
    }
  
    return (
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <span className="section-tag">Visualização gráfica</span>
            <h3>Gráfico da Otimização Não Linear</h3>
          </div>
  
          <p>
            O gráfico mostra a curva da área total da embalagem e o caminho feito
            pelo gradiente descendente.
          </p>
        </div>
  
        <div className="chart-area">
          <Scatter data={data} options={options} />
        </div>
  
        <div className="chart-explanation">
          <strong>Interpretação:</strong>
          <p>
            Diferente da otimização linear, a função não linear forma uma curva. O
            gradiente descendente usa a derivada para caminhar pela curva em busca
            de um ponto onde a área seja mínima.
          </p>
        </div>
      </div>
    )
  }
  
  export default NonlinearChart