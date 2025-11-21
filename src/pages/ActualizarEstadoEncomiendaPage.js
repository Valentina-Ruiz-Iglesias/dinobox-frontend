import React, { useState } from 'react';
import { Container, Form, Button, Spinner, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

function ActualizarEstadoEncomiendaPage() {
  const [codigo, setCodigo] = useState('');
  const [encomienda, setEncomienda] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Buscar encomienda por código
  const handleBuscar = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    setEncomienda(null);
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/encomiendas/codigo/${codigo}`);
      setEncomienda(res.data);
      setNuevoEstado(res.data.estado); // Prellena con el estado existente
    } catch {
      setError('No se encontró la encomienda con ese código.');
    }
    setLoading(false);
  };

  // Actualizar estado
  const handleActualizar = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8080/api/v1/encomiendas/${encomienda.id}`,
        { ...encomienda, estado: nuevoEstado }
      );
      setMensaje('¡Estado actualizado exitosamente!');
      setError('');
      setEncomienda({ ...encomienda, estado: nuevoEstado });
    } catch {
      setError('Error al actualizar el estado.');
      setMensaje('');
    }
    setLoading(false);
  };

  return (
    <Container style={{ maxWidth: 500 }} className="mt-4">
      <h2>Actualizar Estado de Encomienda</h2>

      <Form onSubmit={handleBuscar} className="mb-4">
        <Form.Group controlId="codigo">
          <Form.Label>Código de Seguimiento</Form.Label>
          <Form.Control
            type="text"
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
            required
            placeholder="Ej: 12345"
            disabled={loading}
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" /> : 'Buscar'}
        </Button>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}
      {mensaje && <Alert variant="success">{mensaje}</Alert>}

      {encomienda && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Encomienda: {encomienda.codigoSeguimiento}</Card.Title>
            <Card.Text>
              <strong>Remitente:</strong> {encomienda.remitente}<br />
              <strong>Destinatario:</strong> {encomienda.destinatario}<br />
              <strong>Dirección:</strong> {encomienda.direccion}<br />
              <strong>Estado actual:</strong> {encomienda.estado}
            </Card.Text>
            <Form onSubmit={handleActualizar}>
              <Form.Group controlId="nuevoEstado">
                <Form.Label>Nuevo Estado</Form.Label>
                <Form.Control
                  as="select"
                  value={nuevoEstado}
                  onChange={e => setNuevoEstado(e.target.value)}
                  required
                  disabled={loading}
                >
                  <option value="">Selecciona estado</option>
                  <option value="En Recepción">En Recepción</option>
                  <option value="En Despacho">En Despacho</option>
                  <option value="En Ruta">En Ruta</option>
                  <option value="Entregada">Entregada</option>
                  <option value="Devuelta">Devuelta</option>
                  {/* Agrega más estados según tu sistema */}
                </Form.Control>
              </Form.Group>
              <Button className="mt-3" variant="success" type="submit" disabled={loading || nuevoEstado === ''}>
                {loading ? <Spinner size="sm" /> : 'Actualizar Estado'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default ActualizarEstadoEncomiendaPage;
