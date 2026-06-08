// src/components/LinearOptimizer.jsx

import { useState } from 'react'
import { solveLinearOptimization } from '../utils/linearSolver'
import LinearChart from './LinearChart'
import ExplanationCard from './ExplanationCard'

const initialValues = {
  c1: 40,
  c2: 30,
  a1: 2,
  b1: 1,
  d1: 100,
  a2: 1,
  b2: 2,
  d2: 80,
}

function formatNumber(value) {
  if (value === null || value === undefined) return '-'

  return Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}

function LinearOptimizer() {
  const [formData, setFormData] = useState(initialValues)
  const [result, setResult] = useState(() => solveLinearOptimization(initialValues))

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value === '' ? '' : Number(value),
    }))
  }

  function handleCalculate(event) {
    event.preventDefault()

    const solution = solveLinearOptimization(formData)
    setResult(solution)
  }

  return (
    <section className="optimizer-page">
      <div className="section-header">
        <span className="section-tag">Simulação 01</span>
        <h2>Otimização Linear — Fábrica Inteligente</h2>
        <p>
          Este módulo calcula a melhor combinação de produção para maximizar o
          lucro respeitando limites de recursos.
        </p>
      </div>

      <div className="optimizer-layout">
        <div className="optimizer-card">
          <h3>Modelo matemático</h3>

          <div className="equation-preview">
            <span>Função objetivo</span>
            <strong>
              Z = {formData.c1 || 0}x + {formData.c2 || 0}y
            </strong>
          </div>

          <div className="constraints-list">
            <div>
              <span>Restrição 1</span>
              <strong>
                {formData.a1 || 0}x + {formData.b1 || 0}y ≤ {formData.d1 || 0}
              </strong>
            </div>

            <div>
              <span>Restrição 2</span>
              <strong>
                {formData.a2 || 0}x + {formData.b2 || 0}y ≤ {formData.d2 || 0}
              </strong>
            </div>

            <div>
              <span>Não negatividade</span>
              <strong>x ≥ 0 e y ≥ 0</strong>
            </div>
          </div>

          <div className="teaching-note">
            <strong>Onde entra a matemática?</strong>
            <p>
              O sistema calcula os vértices da região viável, testa quais pontos
              respeitam as restrições e substitui cada ponto na função objetivo
              para encontrar o maior lucro.
            </p>
          </div>
        </div>

        <form className="optimizer-card form-card" onSubmit={handleCalculate}>
          <h3>Parâmetros da simulação</h3>

          <div className="form-section">
            <h4>Função objetivo</h4>

            <div className="form-grid">
              <label className="input-group">
                <span>Lucro Produto A c1</span>
                <input
                  type="number"
                  name="c1"
                  value={formData.c1}
                  onChange={handleChange}
                />
              </label>

              <label className="input-group">
                <span>Lucro Produto B c2</span>
                <input
                  type="number"
                  name="c2"
                  value={formData.c2}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="form-section">
            <h4>Restrição 1: a1x + b1y ≤ d1</h4>

            <div className="form-grid three-columns">
              <label className="input-group">
                <span>a1</span>
                <input
                  type="number"
                  name="a1"
                  value={formData.a1}
                  onChange={handleChange}
                />
              </label>

              <label className="input-group">
                <span>b1</span>
                <input
                  type="number"
                  name="b1"
                  value={formData.b1}
                  onChange={handleChange}
                />
              </label>

              <label className="input-group">
                <span>d1</span>
                <input
                  type="number"
                  name="d1"
                  value={formData.d1}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="form-section">
            <h4>Restrição 2: a2x + b2y ≤ d2</h4>

            <div className="form-grid three-columns">
              <label className="input-group">
                <span>a2</span>
                <input
                  type="number"
                  name="a2"
                  value={formData.a2}
                  onChange={handleChange}
                />
              </label>

              <label className="input-group">
                <span>b2</span>
                <input
                  type="number"
                  name="b2"
                  value={formData.b2}
                  onChange={handleChange}
                />
              </label>

              <label className="input-group">
                <span>d2</span>
                <input
                  type="number"
                  name="d2"
                  value={formData.d2}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <button className="primary-action" type="submit">
            Calcular solução ótima
          </button>
        </form>
      </div>

      <section className="explanation-section">
  <div className="section-header compact-header">
    <span className="section-tag">Explicação matemática</span>
    <h2>Como funciona a otimização linear?</h2>
    <p>
      Este módulo mostra como uma função objetivo e restrições lineares podem ser
      usadas para encontrar a melhor decisão de produção.
    </p>
  </div>

  <div className="explanation-grid">
    <ExplanationCard title="Função objetivo" tag="Lucro">
      <p>
        A função objetivo representa o lucro total da fábrica. O sistema tenta
        encontrar os valores de x e y que tornam esse lucro o maior possível.
      </p>
      <div className="mini-equation">Z = c1x + c2y</div>
    </ExplanationCard>

    <ExplanationCard title="Restrições" tag="Limites">
      <p>
        As restrições representam os recursos disponíveis, como matéria-prima,
        tempo de máquina ou capacidade de produção.
      </p>
      <div className="mini-equation">ax + by ≤ d</div>
    </ExplanationCard>

    <ExplanationCard title="Região viável" tag="Possibilidades">
      <p>
        A região viável é o conjunto de pontos que respeitam todas as
        restrições. Cada ponto representa uma possível combinação de produção.
      </p>
    </ExplanationCard>

    <ExplanationCard title="Solução ótima" tag="Resultado">
      <p>
        Em problemas lineares com duas variáveis, a melhor solução ocorre em um
        dos vértices da região viável. Por isso, o sistema testa os pontos
        candidatos e escolhe o maior valor de Z.
      </p>
    </ExplanationCard>
  </div>
</section>

      {result.error && (
        <div className="error-box">
          <strong>Atenção:</strong> {result.error}
        </div>
      )}

      {result.bestPoint && (
        <div className="result-card">
          <div>
            <span>Produto A ideal</span>
            <strong>{formatNumber(result.bestPoint.x)} unidades</strong>
          </div>

          <div>
            <span>Produto B ideal</span>
            <strong>{formatNumber(result.bestPoint.y)} unidades</strong>
          </div>

          <div>
            <span>Lucro máximo</span>
            <strong>R$ {formatNumber(result.maxProfit)}</strong>
          </div>
        </div>
      )}

        {result.feasiblePoints.length > 0 && (
        <LinearChart
        params={formData}
         feasiblePoints={result.feasiblePoints}
         bestPoint={result.bestPoint}
         />
        )}
      <div className="optimizer-card">
        <h3>Pontos viáveis analisados</h3>

        {result.feasiblePoints.length > 0 ? (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>x — Produto A</th>
                  <th>y — Produto B</th>
                  <th>Z — Lucro</th>
                </tr>
              </thead>

              <tbody>
                {result.feasiblePoints.map((point, index) => (
                  <tr
                    key={`${point.x}-${point.y}-${index}`}
                    className={
                      result.bestPoint &&
                      point.x === result.bestPoint.x &&
                      point.y === result.bestPoint.y
                        ? 'best-row'
                        : ''
                    }
                  >
                    <td>{formatNumber(point.x)}</td>
                    <td>{formatNumber(point.y)}</td>
                    <td>R$ {formatNumber(point.z)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-message">
            Nenhum ponto viável encontrado com os valores atuais.
          </p>
        )}
      </div>

      <div className="teaching-note wide-note">
        <strong>Explicação para apresentação</strong>
        <p>
          Em problemas de otimização linear com duas variáveis, a solução ótima
          ocorre em um dos vértices da região viável. Por isso, o sistema calcula
          os pontos candidatos, testa quais respeitam as restrições e escolhe
          aquele que gera o maior lucro.
        </p>
      </div>
    </section>
  )
}

export default LinearOptimizer