// src/components/NonlinearOptimizer.jsx

import { useEffect, useState } from 'react'
import { solveNonlinearOptimization } from '../utils/nonlinearSolver'
import IterationTable from './IterationTable'
import NonlinearChart from './NonlinearChart'
import ExplanationCard from './ExplanationCard'

const initialValues = {
  volume: 1000,
  raioInicial: 3,
  alpha: 0.01,
  iteracoes: 30,
}

function formatNumber(value) {
  if (value === null || value === undefined) return '-'

  return Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  })
}

function NonlinearOptimizer() {
  const [formData, setFormData] = useState(initialValues)
  const [result, setResult] = useState(() =>
    solveNonlinearOptimization(initialValues),
  )

  const [isAnimating, setIsAnimating] = useState(false)
  const [animationIndex, setAnimationIndex] = useState(result.iterations.length)

  useEffect(() => {
    if (!isAnimating) return

    if (result.iterations.length === 0) {
      setIsAnimating(false)
      return
    }

    const interval = setInterval(() => {
      setAnimationIndex((currentIndex) => {
        const nextIndex = currentIndex + 1

        if (nextIndex >= result.iterations.length) {
          setIsAnimating(false)
          return result.iterations.length
        }

        return nextIndex
      })
    }, 350)

    return () => clearInterval(interval)
  }, [isAnimating, result.iterations.length])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value === '' ? '' : Number(value),
    }))
  }

  function handleCalculate(event) {
    event.preventDefault()

    const solution = solveNonlinearOptimization(formData)

    setResult(solution)
    setIsAnimating(false)
    setAnimationIndex(solution.iterations.length)
  }

  function handleStartAnimation() {
    if (result.iterations.length === 0) return

    setAnimationIndex(0)
    setIsAnimating(true)
  }

  function handleResetAnimation() {
    setIsAnimating(false)
    setAnimationIndex(0)
  }

  const animatedIterations = result.iterations.slice(0, animationIndex)

  const showBestPoint =
    !result.error &&
    result.bestRadius &&
    animationIndex >= result.iterations.length

  return (
    <section className="optimizer-page">
      <div className="section-header">
        <span className="section-tag">Simulação 02</span>
        <h2>Otimização Não Linear — Embalagem Otimizada</h2>
        <p>
          Este módulo usa gradiente descendente para encontrar o raio que
          minimiza a área total de uma embalagem cilíndrica com volume fixo.
        </p>
      </div>

      <div className="optimizer-layout">
        <div className="optimizer-card">
          <h3>Modelo matemático</h3>

          <div className="equations-grid">
            <div className="equation-preview">
              <span>Volume do cilindro</span>
              <strong>V = πr²h</strong>
            </div>

            <div className="equation-preview">
              <span>Altura isolada</span>
              <strong>h = V / πr²</strong>
            </div>

            <div className="equation-preview">
              <span>Função de área</span>
              <strong>A(r) = 2πr² + 2V/r</strong>
            </div>

            <div className="equation-preview">
              <span>Derivada</span>
              <strong>A&apos;(r) = 4πr - 2V/r²</strong>
            </div>

            <div className="equation-preview full-equation">
              <span>Gradiente descendente</span>
              <strong>r(k+1) = r(k) - α · A&apos;(r(k))</strong>
            </div>
          </div>

          <div className="teaching-note">
            <strong>Onde entra a matemática?</strong>
            <p>
              A aplicação calcula a área da embalagem para um raio inicial e usa
              a derivada para decidir se o raio deve aumentar ou diminuir. A cada
              iteração, o raio é ajustado para tentar reduzir a área total.
            </p>
          </div>
        </div>

        <form className="optimizer-card form-card" onSubmit={handleCalculate}>
          <h3>Parâmetros da simulação</h3>

          <div className="form-section">
            <h4>Dados da embalagem</h4>

            <div className="form-grid">
              <label className="input-group">
                <span>Volume V</span>
                <input
                  type="number"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  min="0"
                  step="any"
                />
              </label>

              <label className="input-group">
                <span>Raio inicial</span>
                <input
                  type="number"
                  name="raioInicial"
                  value={formData.raioInicial}
                  onChange={handleChange}
                  min="0"
                  step="any"
                />
              </label>
            </div>
          </div>

          <div className="form-section">
            <h4>Configuração do método numérico</h4>

            <div className="form-grid">
              <label className="input-group">
                <span>Taxa de aprendizado α</span>
                <input
                  type="number"
                  name="alpha"
                  value={formData.alpha}
                  onChange={handleChange}
                  min="0"
                  step="any"
                />
              </label>

              <label className="input-group">
                <span>Número de iterações</span>
                <input
                  type="number"
                  name="iteracoes"
                  value={formData.iteracoes}
                  onChange={handleChange}
                  min="1"
                  step="1"
                />
              </label>
            </div>
          </div>

          <button className="primary-action" type="submit">
            Calcular otimização não linear
          </button>
        </form>
      </div>

      <section className="explanation-section">
        <div className="section-header compact-header">
          <span className="section-tag">Explicação matemática</span>
          <h2>Como funciona a otimização não linear?</h2>
          <p>
            Este módulo usa uma função não linear e um método iterativo para
            aproximar o menor valor da área da embalagem.
          </p>
        </div>

        <div className="explanation-grid">
          <ExplanationCard title="Volume fixo" tag="Condição">
            <p>
              O volume representa uma condição do problema. A embalagem precisa
              manter esse volume, mesmo que o raio e a altura sejam ajustados.
            </p>
            <div className="mini-equation">V = πr²h</div>
          </ExplanationCard>

          <ExplanationCard title="Área total" tag="Função">
            <p>
              A área total representa a quantidade de material usado na
              embalagem. Como queremos gastar menos material, essa é a função que
              será minimizada.
            </p>
            <div className="mini-equation">A(r) = 2πr² + 2V/r</div>
          </ExplanationCard>

          <ExplanationCard title="Derivada" tag="Direção">
            <p>
              A derivada indica se a área está aumentando ou diminuindo em
              determinado valor de raio. Ela orienta o próximo passo do método
              numérico.
            </p>
            <div className="mini-equation">A&apos;(r) = 4πr - 2V/r²</div>
          </ExplanationCard>

          <ExplanationCard title="Gradiente descendente" tag="Iteração">
            <p>
              O gradiente descendente ajusta o raio aos poucos. A cada iteração,
              o sistema usa a derivada para tentar se aproximar do menor valor
              da área.
            </p>
            <div className="mini-equation">r(k+1) = r(k) - αA&apos;(r(k))</div>
          </ExplanationCard>
        </div>
      </section>

      {result.error && (
        <div className="error-box">
          <strong>Atenção:</strong> {result.error}
        </div>
      )}

      {!result.error && result.bestRadius && (
        <div className="result-card nonlinear-result">
          <div>
            <span>Melhor raio</span>
            <strong>{formatNumber(result.bestRadius)} cm</strong>
          </div>

          <div>
            <span>Melhor altura</span>
            <strong>{formatNumber(result.bestHeight)} cm</strong>
          </div>

          <div>
            <span>Menor área</span>
            <strong>{formatNumber(result.minArea)} cm²</strong>
          </div>

          <div>
            <span>Última derivada</span>
            <strong>{formatNumber(result.lastDerivative)}</strong>
          </div>
        </div>
      )}

      {result.iterations.length > 0 && (
        <div className="animation-controls">
          <button
            type="button"
            className="secondary-action"
            onClick={handleStartAnimation}
            disabled={isAnimating}
          >
            {isAnimating ? 'Animando...' : 'Animar gradiente descendente'}
          </button>

          <button
            type="button"
            className="secondary-action outline"
            onClick={handleResetAnimation}
          >
            Reiniciar animação
          </button>
        </div>
      )}

      {result.iterations.length > 0 && (
        <NonlinearChart
          volume={formData.volume}
          iterations={animatedIterations}
          bestRadius={showBestPoint ? result.bestRadius : null}
          minArea={showBestPoint ? result.minArea : null}
        />
      )}

      <div className="optimizer-card">
        <h3>Tabela de iterações</h3>
        <IterationTable iterations={result.iterations} />
      </div>

      <div className="teaching-note wide-note">
        <strong>Explicação para apresentação</strong>
        <p>
          Diferente da otimização linear, aqui a função não forma uma reta, mas
          uma curva. Por isso usamos um método iterativo que ajusta o raio aos
          poucos usando a derivada da função. Quando a derivada se aproxima de
          zero, significa que estamos próximos de um ponto de mínimo.
        </p>
      </div>
    </section>
  )
}

export default NonlinearOptimizer