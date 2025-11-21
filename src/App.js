import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EnviarEncomiendaPage from './pages/EnviarEncomiendaPage';
import ListaEncomiendasPage from './pages/ListaEncomiendasPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Dinobox - Sistema de Encomiendas</h1>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/enviar">Enviar Encomienda</Link></li>
            <li><Link to="/listado">Listar Encomiendas</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/enviar" element={<EnviarEncomiendaPage />} />
          <Route path="/listado" element={<ListaEncomiendasPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
