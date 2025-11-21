import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FormEncomienda from './FormEncomienda';

describe('FormEncomienda - Validación de errores', function() {
  it('muestra mensaje de error al enviar con campos vacíos', function() {
    render(<FormEncomienda />);
    const boton = screen.getByRole('button', { name: /enviar encomienda/i });
    fireEvent.click(boton);

    expect(screen.getByText(/Corrige los errores antes de enviar/i)).toBeTruthy();
  });
});
