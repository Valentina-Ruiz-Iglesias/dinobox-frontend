import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function ListaEncomiendasPage() {
  const [encomiendas, setEncomiendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8080/api/v1/encomiendas')
      .then(response => {
        setEncomiendas(response.data);
        setError('');
      })
      .catch(() => setError('No se pudo cargar la lista de encomiendas.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status" />
        <p>Cargando la lista de encomiendas...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Lista de Encomiendas</h2>
      {encomiendas.length === 0 ? (
        <Alert variant="info">No hay encomiendas registradas.</Alert>
      ) : (
        <ListGroup>
          {encomiendas.map(e => (
            <ListGroup.Item key={e.id} className="mb-2">
              <strong>Código:</strong> {e.codigoSeguimiento} <br />
              <strong>Remitente:</strong> {e.remitente} <br />
              <strong>Destinatario:</strong> {e.destinatario} <br />
              <strong>Dirección:</strong> {e.direccion} <br />
              <strong>Estado:</strong> {e.estado}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default ListaEncomiendasPage;
