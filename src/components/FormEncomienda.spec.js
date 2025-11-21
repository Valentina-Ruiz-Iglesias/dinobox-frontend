import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FormEncomienda from './FormEncomienda';

// Test 1: Renderiza todos los campos
describe('FormEncomienda', function() {
  it('should render the form with all fields', function() {
    const { getByLabelText } = render(<FormEncomienda />);
    expect(getByLabelText(/Remitente/i)).toBeDefined();
    expect(getByLabelText(/Destinatario/i)).toBeDefined();
    expect(getByLabelText(/Dirección/i)).toBeDefined();
    expect(getByLabelText(/Código de Seguimiento/i)).toBeDefined();
    expect(getByLabelText(/Estado/i)).toBeDefined();
  });
});

// Test 2: Validación de remitente
describe('FormEncomienda - Validación remitente', function() {
  it('muestra error si el remitente es muy corto', function() {
    render(<FormEncomienda />);
    const input = screen.getByLabelText(/Remitente/i);
    fireEvent.change(input, { target: { value: 'A' } }); // Demasiado corto

    const boton = screen.getByRole('button', { name: /enviar encomienda/i });
    fireEvent.click(boton);

    expect(screen.getByText(/El remitente debe tener al menos 3 caracteres/i)).toBeTruthy();
  });
});
