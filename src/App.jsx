import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import LinearOptimizer from './components/LinearOptimizer'
import NonlinearOptimizer from './components/NonlinearOptimizer'

function App() {
  const [activePage, setActivePage] = useState('home')

  function renderPage() {
    if (activePage === 'home') {
      return <Home />
    }

    if (activePage === 'linear') {
      return <LinearOptimizer />
    }

    if (activePage === 'nonlinear') {
      return <NonlinearOptimizer />
    }

    return <Home />
  }

  return (
    <div className="app">
      <Navbar activePage={activePage} onChangePage={setActivePage} />

      <main className="main-content">{renderPage()}</main>
    </div>
  )
}

export default App