import React from 'react';
import { render } from '@testing-library/react';
import FormEncomienda from './FormEncomienda';

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
