import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { crearEncomienda } from '../services/encomiendaService';

function FormEncomienda({ onSuccess }) {
  const [form, setForm] = useState({
    remitente: '',
    destinatario: '',
    direccion: '',
    codigoSeguimiento: '',
    estado: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [erroresCampo, setErroresCampo] = useState({});
  const [loading, setLoading] = useState(false);

  function validarCampos() {
    const nuevosErrores = {};
    if (form.remitente.trim().length < 3) {
      nuevosErrores.remitente = 'El remitente debe tener al menos 3 caracteres.';
    }
    if (form.destinatario.trim().length === 0) {
      nuevosErrores.destinatario = 'El destinatario es obligatorio.';
    }
    if (form.direccion.trim().length < 8) {
      nuevosErrores.direccion = 'La dirección debe ser más específica.';
    }
    if (!/^\d{5,}$/.test(form.codigoSeguimiento)) {
      nuevosErrores.codigoSeguimiento = 'El código debe tener solo números y al menos 5 dígitos.';
    }
    if (!form.estado) {
      nuevosErrores.estado = 'El estado es obligatorio.';
    }
    return nuevosErrores;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErroresCampo({ ...erroresCampo, [e.target.name]: undefined });
    setError('');
    setMensaje('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensaje('');
    setError('');
    const nuevosErrores = validarCampos();
    setErroresCampo(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setError('Corrige los errores antes de enviar.');
      return;
    }

    setLoading(true);
    try {
      await crearEncomienda(form);
      setMensaje('¡Encomienda enviada con éxito!');
      setForm({
        remitente: '',
        destinatario: '',
        direccion: '',
        codigoSeguimiento: '',
        estado: ''
      });
      setErroresCampo({});
      if (onSuccess) { onSuccess(); }
    } catch (err) {
      setError('Ocurrió un error al guardar la encomienda. Intenta después.');
    }
    setLoading(false);
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Form.Group className="mb-3" controlId="remitente">
        <Form.Label>Remitente</Form.Label>
        <Form.Control
          name="remitente"
          value={form.remitente}
          onChange={handleChange}
          isInvalid={!!erroresCampo.remitente}
          disabled={loading}
        />
        <Form.Control.Feedback type="invalid">
          {erroresCampo.remitente}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="destinatario">
        <Form.Label>Destinatario</Form.Label>
        <Form.Control
          name="destinatario"
          value={form.destinatario}
          onChange={handleChange}
          isInvalid={!!erroresCampo.destinatario}
          disabled={loading}
        />
        <Form.Control.Feedback type="invalid">
          {erroresCampo.destinatario}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="direccion">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          isInvalid={!!erroresCampo.direccion}
          disabled={loading}
        />
        <Form.Control.Feedback type="invalid">
          {erroresCampo.direccion}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="codigoSeguimiento">
        <Form.Label>Código de Seguimiento</Form.Label>
        <Form.Control
          name="codigoSeguimiento"
          value={form.codigoSeguimiento}
          onChange={handleChange}
          isInvalid={!!erroresCampo.codigoSeguimiento}
          disabled={loading}
        />
        <Form.Control.Feedback type="invalid">
          {erroresCampo.codigoSeguimiento}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="estado">
        <Form.Label>Estado</Form.Label>
        <Form.Control
          name="estado"
          value={form.estado}
          onChange={handleChange}
          isInvalid={!!erroresCampo.estado}
          disabled={loading}
        />
        <Form.Control.Feedback type="invalid">
          {erroresCampo.estado}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="d-grid mb-3">
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Enviando...
            </>
          ) : (
            'Enviar encomienda'
          )}
        </Button>
      </div>
      {mensaje && <Alert variant="success">{mensaje}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
    </Form>
  );
}

export default FormEncomienda;
