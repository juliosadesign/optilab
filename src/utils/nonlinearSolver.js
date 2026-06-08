// src/utils/nonlinearSolver.js

const EPSILON = 1e-9

function isValidNumber(value) {
  return Number.isFinite(value) && !Number.isNaN(value)
}

function round(value, decimals = 6) {
  if (!isValidNumber(value)) return 0
  return Number(value.toFixed(decimals))
}

function calculateArea(radius, volume) {
  return 2 * Math.PI * radius ** 2 + (2 * volume) / radius
}

function calculateDerivative(radius, volume) {
  return 4 * Math.PI * radius - (2 * volume) / radius ** 2
}

function calculateHeight(radius, volume) {
  return volume / (Math.PI * radius ** 2)
}

export function solveNonlinearOptimization(params) {
  const volume = Number(params.volume)
  const initialRadius = Number(params.raioInicial)
  const alpha = Number(params.alpha)
  const maxIterations = Number(params.iteracoes)

  if (
    !isValidNumber(volume) ||
    !isValidNumber(initialRadius) ||
    !isValidNumber(alpha) ||
    !isValidNumber(maxIterations)
  ) {
    return {
      iterations: [],
      bestRadius: null,
      bestHeight: null,
      minArea: null,
      lastDerivative: null,
      error: 'Preencha todos os campos com valores numéricos válidos.',
    }
  }

  if (volume <= 0 || initialRadius <= 0 || alpha <= 0 || maxIterations <= 0) {
    return {
      iterations: [],
      bestRadius: null,
      bestHeight: null,
      minArea: null,
      lastDerivative: null,
      error: 'Todos os valores devem ser positivos.',
    }
  }

  let radius = initialRadius
  const iterations = []

  for (let k = 0; k < maxIterations; k++) {
    const area = calculateArea(radius, volume)
    const derivative = calculateDerivative(radius, volume)
    const height = calculateHeight(radius, volume)

    if (
      !isValidNumber(area) ||
      !isValidNumber(derivative) ||
      !isValidNumber(height)
    ) {
      return {
        iterations,
        bestRadius: null,
        bestHeight: null,
        minArea: null,
        lastDerivative: null,
        error:
          'O cálculo gerou um valor inválido. Tente reduzir a taxa de aprendizado.',
      }
    }

    iterations.push({
      k,
      radius: round(radius),
      height: round(height),
      area: round(area),
      derivative: round(derivative),
    })

    const nextRadius = radius - alpha * derivative

    if (!isValidNumber(nextRadius) || nextRadius <= EPSILON) {
      return {
        iterations,
        bestRadius: null,
        bestHeight: null,
        minArea: null,
        lastDerivative: round(derivative),
        error:
          'O raio ficou menor ou igual a zero. Tente usar uma taxa de aprendizado menor.',
      }
    }

    radius = nextRadius
  }

  const bestIteration = iterations.reduce((best, current) => {
    return current.area < best.area ? current : best
  }, iterations[0])

  const lastIteration = iterations[iterations.length - 1]

  return {
    iterations,
    bestRadius: bestIteration.radius,
    bestHeight: bestIteration.height,
    minArea: bestIteration.area,
    lastDerivative: lastIteration.derivative,
    error: null,
  }
}