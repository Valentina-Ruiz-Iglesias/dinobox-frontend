import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

function ConsultaEncomiendaPage() {
  const [codigo, setCodigo] = useState("");
  const [encomienda, setEncomienda] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setEncomienda(null);
    setError('');
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/encomiendas/codigo/${codigo}`);
      if (res.data) {
        setEncomienda(res.data);
      } else {
        setError('No se encontró la encomienda.');
      }
    } catch (err) {
      setError('No se encontró la encomienda.');
    }
    setLoading(false);
  }

  return (
    <Container className="mt-4" style={{ maxWidth: 500 }}>
      <h2>Consulta por Código de Seguimiento</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="formCodigo">
          <Form.Label>Código de Seguimiento</Form.Label>
          <Form.Control
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ej: 12345"
            required
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Consultar'}
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      {encomienda && (
        <Card>
          <Card.Body>
            <Card.Title>
              Estado: {encomienda.estado}
            </Card.Title>
            <Card.Text>
              <strong>Remitente:</strong> {encomienda.remitente}<br />
              <strong>Destinatario:</strong> {encomienda.destinatario}<br />
              <strong>Dirección:</strong> {encomienda.direccion}<br />
              <strong>Código:</strong> {encomienda.codigoSeguimiento}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default ConsultaEncomiendaPage;
