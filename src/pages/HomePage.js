import React from 'react';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';

function HomePage() {
  return (
    <div style={{ background: '#eef5fc', minHeight: '90vh' }}>
      <Container className="py-5">
        <Row className="justify-content-center mb-4">
          <Col md={10} lg={8}>
            <Card className="shadow-lg">
              <Card.Body className="text-center py-5">
                <Card.Title as="h1" className="display-4 fw-bold mb-3 text-primary">
                  Bienvenido a Dinobox
                </Card.Title>
                <Card.Text as="h4" className="mb-4 text-secondary">
                  La forma más simple y segura de gestionar <span className="text-success">encomiendas</span> online.
                </Card.Text>
                <div className="mb-3">
                  <Badge bg="success" className="fs-5 px-4 py-2">
                    ¡Estamos para servirles!
                  </Badge>
                </div>
                <Card.Text className="mb-4 lead">
                  Con Dinobox puedes:
                </Card.Text>
                <Row className="justify-content-center">
                  <Col xs={12} md={4} className="mb-3">
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Title className="text-info">Enviar encomiendas</Card.Title>
                        <Card.Text>Registra y gestiona tus envíos de manera ágil y confiable.</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={12} md={4} className="mb-3">
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Title className="text-info">Consulta y seguimiento</Card.Title>
                        <Card.Text>Haz seguimiento en tiempo real con tu <b>código único</b> de seguimiento.</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={12} md={4} className="mb-3">
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Title className="text-info">Actualiza el estado</Card.Title>
                        <Card.Text>Nuestro personal autorizado siempre actualizara los estados para mantenerles informados.</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <div className="mt-4 text-muted">
              Proyecto integrador | &copy; {new Date().getFullYear()} Dinobox
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
