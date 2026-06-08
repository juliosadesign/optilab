function Navbar({ activePage, onChangePage }) {
    return (
      <header className="navbar">
        <div className="navbar-logo">
          <div className="logo-icon">Σ</div>
          <div>
            <h1>OptiLab</h1>
            <span>Otimização Numérica</span>
          </div>
        </div>
  
        <nav className="navbar-menu">
          <button
            className={activePage === 'home' ? 'nav-button active' : 'nav-button'}
            onClick={() => onChangePage('home')}
          >
            Início
          </button>
  
          <button
            className={activePage === 'linear' ? 'nav-button active' : 'nav-button'}
            onClick={() => onChangePage('linear')}
          >
            Otimização Linear
          </button>
  
          <button
            className={
              activePage === 'nonlinear' ? 'nav-button active' : 'nav-button'
            }
            onClick={() => onChangePage('nonlinear')}
          >
            Otimização Não Linear
          </button>
        </nav>
      </header>
    )
  }
  
  export default Navbar