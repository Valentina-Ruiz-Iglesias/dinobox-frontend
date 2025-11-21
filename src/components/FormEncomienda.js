import React, { useState } from 'react';
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
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label>
        Remitente:
        <input
          name="remitente"
          value={form.remitente}
          onChange={handleChange}
          required
        />
        {erroresCampo.remitente && <span style={{ color: 'red' }}>{erroresCampo.remitente}</span>}
      </label><br />
      <label>
        Destinatario:
        <input
          name="destinatario"
          value={form.destinatario}
          onChange={handleChange}
          required
        />
        {erroresCampo.destinatario && <span style={{ color: 'red' }}>{erroresCampo.destinatario}</span>}
      </label><br />
      <label>
        Dirección:
        <input
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          required
        />
        {erroresCampo.direccion && <span style={{ color: 'red' }}>{erroresCampo.direccion}</span>}
      </label><br />
      <label>
        Código seguimiento:
        <input
          name="codigoSeguimiento"
          value={form.codigoSeguimiento}
          onChange={handleChange}
          required
        />
        {erroresCampo.codigoSeguimiento && <span style={{ color: 'red' }}>{erroresCampo.codigoSeguimiento}</span>}
      </label><br />
      <label>
        Estado:
        <input
          name="estado"
          value={form.estado}
          onChange={handleChange}
          required
        />
        {erroresCampo.estado && <span style={{ color: 'red' }}>{erroresCampo.estado}</span>}
      </label><br />
      <button type="submit">Enviar encomienda</button>
      {mensaje && <p style={{ color: 'green', fontWeight: 'bold' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default FormEncomienda;
