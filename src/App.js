import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import EnviarEncomiendaPage from './pages/EnviarEncomiendaPage';
import ListaEncomiendasPage from './pages/ListaEncomiendasPage';
import ConsultaEncomiendaPage from './pages/ConsultaEncomiendaPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="primary" variant="dark" expand="md">
        <Container>
          <Navbar.Brand>Dinobox</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/enviar">Enviar Encomienda</Nav.Link>
            <Nav.Link as={Link} to="/listado">Listar Encomiendas</Nav.Link>
            <Nav.Link as={Link} to="/consulta">Consulta por Código</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/enviar" element={<EnviarEncomiendaPage />} />
          <Route path="/listado" element={<ListaEncomiendasPage />} />
          <Route path="/consulta" element={<ConsultaEncomiendaPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
