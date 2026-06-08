// src/utils/linearSolver.js

const EPSILON = 1e-9

function isValidNumber(value) {
  return Number.isFinite(value) && !Number.isNaN(value)
}

function round(value, decimals = 6) {
  if (!isValidNumber(value)) return 0
  return Number(value.toFixed(decimals))
}

function createPoint(x, y) {
  if (!isValidNumber(x) || !isValidNumber(y)) {
    return null
  }

  return {
    x: round(x),
    y: round(y),
  }
}

function removeDuplicatePoints(points) {
  const map = new Map()

  points.forEach((point) => {
    if (!point) return

    const key = `${round(point.x, 5)}-${round(point.y, 5)}`
    map.set(key, point)
  })

  return Array.from(map.values())
}

function calculateZ(point, c1, c2) {
  return c1 * point.x + c2 * point.y
}

function isFeasible(point, params) {
  const { a1, b1, d1, a2, b2, d2 } = params

  const restriction1 = a1 * point.x + b1 * point.y
  const restriction2 = a2 * point.x + b2 * point.y

  return (
    point.x >= -EPSILON &&
    point.y >= -EPSILON &&
    restriction1 <= d1 + EPSILON &&
    restriction2 <= d2 + EPSILON
  )
}

function getAxisIntersections(a, b, d) {
  const points = []

  // Interseção com o eixo x: y = 0
  if (Math.abs(a) > EPSILON) {
    points.push(createPoint(d / a, 0))
  }

  // Interseção com o eixo y: x = 0
  if (Math.abs(b) > EPSILON) {
    points.push(createPoint(0, d / b))
  }

  return points
}

function getRestrictionsIntersection(a1, b1, d1, a2, b2, d2) {
  const determinant = a1 * b2 - a2 * b1

  if (Math.abs(determinant) <= EPSILON) {
    return null
  }

  const x = (d1 * b2 - d2 * b1) / determinant
  const y = (a1 * d2 - a2 * d1) / determinant

  return createPoint(x, y)
}

export function solveLinearOptimization(params) {
  const numericParams = {
    c1: Number(params.c1),
    c2: Number(params.c2),
    a1: Number(params.a1),
    b1: Number(params.b1),
    d1: Number(params.d1),
    a2: Number(params.a2),
    b2: Number(params.b2),
    d2: Number(params.d2),
  }

  const { c1, c2, a1, b1, d1, a2, b2, d2 } = numericParams

  const values = Object.values(numericParams)

  if (values.some((value) => !isValidNumber(value))) {
    return {
      candidates: [],
      feasiblePoints: [],
      bestPoint: null,
      maxProfit: 0,
      error: 'Preencha todos os campos com valores numéricos válidos.',
    }
  }

  const candidates = [
    createPoint(0, 0),
    ...getAxisIntersections(a1, b1, d1),
    ...getAxisIntersections(a2, b2, d2),
    getRestrictionsIntersection(a1, b1, d1, a2, b2, d2),
  ]

  const uniqueCandidates = removeDuplicatePoints(candidates)

  const feasiblePoints = uniqueCandidates
    .filter((point) => isFeasible(point, numericParams))
    .map((point) => ({
      ...point,
      z: round(calculateZ(point, c1, c2)),
    }))

  if (feasiblePoints.length === 0) {
    return {
      candidates: uniqueCandidates,
      feasiblePoints: [],
      bestPoint: null,
      maxProfit: 0,
      error: 'Nenhum ponto viável foi encontrado para essas restrições.',
    }
  }

  const bestPoint = feasiblePoints.reduce((best, current) => {
    return current.z > best.z ? current : best
  }, feasiblePoints[0])

  return {
    candidates: uniqueCandidates,
    feasiblePoints,
    bestPoint,
    maxProfit: bestPoint.z,
    error: null,
  }
}