// src/components/Home.jsx

import ExplanationCard from './ExplanationCard'

function Home() {
  return (
    <section className="home">
      <div className="hero-card">
        <span className="hero-badge">Cálculo Numérico Avançado</span>

        <h2>OptiLab — Laboratório de Otimização Numérica</h2>

        <p>
          Uma aplicação web didática para comparar dois tipos de otimização:
          otimização linear e otimização não linear. O objetivo é mostrar como
          equações matemáticas podem ser usadas para resolver problemas reais de
          decisão, custo, produção e eficiência.
        </p>

        <div className="hero-highlight">
          <strong>Objetivo do projeto:</strong>
          <span>
            simular, calcular e visualizar soluções ótimas usando modelos
            matemáticos aplicados em uma interface web simples e interativa.
          </span>
        </div>
      </div>

      <div className="cards-grid">
        <article className="info-card">
          <div className="card-number">01</div>
          <h3>Otimização Linear</h3>
          <p>
            Simula uma fábrica que produz dois produtos. O sistema encontra a
            melhor combinação de produção para maximizar o lucro respeitando
            limites de recursos.
          </p>

          <div className="equation-box">Z = c1x + c2y</div>

          <p className="small-text">
            A solução é encontrada testando pontos viáveis e identificando o
            maior valor da função objetivo.
          </p>
        </article>

        <article className="info-card">
          <div className="card-number">02</div>
          <h3>Otimização Não Linear</h3>
          <p>
            Simula o projeto de uma embalagem cilíndrica. O sistema encontra
            aproximadamente o raio e a altura que minimizam a área total.
          </p>

          <div className="equation-box">A(r) = 2πr² + 2V/r</div>

          <p className="small-text">
            A solução é aproximada por meio de iterações usando derivada e
            gradiente descendente.
          </p>
        </article>
      </div>

      <section className="explanation-section">
        <div className="section-header compact-header">
          <span className="section-tag">Base matemática</span>
          <h2>Como a matemática entra na aplicação?</h2>
          <p>
            O OptiLab foi pensado para mostrar, de forma visual, como modelos
            matemáticos ajudam a tomar decisões melhores em problemas de
            otimização.
          </p>
        </div>

        <div className="explanation-grid">
          <ExplanationCard title="Otimização Linear" tag="Modelo 01">
            <p>
              Usa uma função objetivo para representar o lucro e restrições
              lineares para representar os limites de recursos da fábrica.
            </p>

            <div className="mini-equation">Z = c1x + c2y</div>

            <p>
              O sistema procura o melhor ponto dentro da região viável, ou seja,
              entre as combinações que respeitam todas as restrições.
            </p>
          </ExplanationCard>

          <ExplanationCard title="Otimização Não Linear" tag="Modelo 02">
            <p>
              Usa uma função curva para representar a área total de uma
              embalagem cilíndrica com volume fixo.
            </p>

            <div className="mini-equation">A(r) = 2πr² + 2V/r</div>

            <p>
              Como a função não é uma reta, o sistema usa derivada e gradiente
              descendente para aproximar o valor mínimo.
            </p>
          </ExplanationCard>

          <ExplanationCard title="Diferença entre os métodos" tag="Comparação">
            <p>
              Na otimização linear, a solução é buscada nos vértices da região
              viável. Já na otimização não linear, a solução é aproximada por
              iterações.
            </p>

            <div className="mini-equation">r(k+1) = r(k) - αA&apos;(r(k))</div>

            <p>
              Assim, o projeto compara um problema resolvido por análise de
              pontos com outro resolvido por aproximação numérica.
            </p>
          </ExplanationCard>
        </div>
      </section>

      <div className="explanation-panel">
        <h3>Como a aplicação foi construída?</h3>

        <div className="steps-list">
          <div>
            <strong>1. Interface</strong>
            <span>Criação das telas principais e navegação entre os módulos.</span>
          </div>

          <div>
            <strong>2. Cálculo linear</strong>
            <span>Implementação da função objetivo, restrições e pontos viáveis.</span>
          </div>

          <div>
            <strong>3. Cálculo não linear</strong>
            <span>Implementação da função de área, derivada e gradiente descendente.</span>
          </div>

          <div>
            <strong>4. Visualização</strong>
            <span>Criação dos gráficos, tabelas e explicações para apresentação.</span>
          </div>
        </div>
      </div>

      <section className="presentation-summary">
        <div className="summary-content">
          <span className="section-tag">Resumo final</span>
          <h2>Resumo para apresentação</h2>

          <p>
            O OptiLab é uma aplicação web desenvolvida para demonstrar dois tipos
            de otimização estudados em Cálculo Numérico Avançado: a otimização
            linear e a otimização não linear.
          </p>

          <p>
            Na otimização linear, o sistema simula uma fábrica que produz dois
            produtos e precisa maximizar o lucro. Para isso, utiliza uma função
            objetivo e restrições lineares que representam os limites de recursos.
          </p>

          <p>
            Na otimização não linear, o sistema simula uma embalagem cilíndrica
            com volume fixo e busca minimizar a área total. Para aproximar a
            solução, usa derivada e o método do gradiente descendente.
          </p>

          <p>
            A principal diferença mostrada pelo projeto é que a otimização linear
            busca a solução em vértices da região viável, enquanto a otimização
            não linear usa um processo iterativo para se aproximar do mínimo.
          </p>

          <p>
            Os gráficos ajudam a visualizar o comportamento matemático de cada
            problema, tornando mais fácil entender as restrições, a curva da
            função e o caminho até a solução ótima.
          </p>
        </div>
      </section>
    </section>
  )
}

export default Home