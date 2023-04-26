import React from 'react';
import { Row, Col, Spinner, Dropdown, InputGroup, FormControl, Card, Alert, Button, Modal, Form as FormBootstrap } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import api from 'services/api';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2'


const Component = () => {
    const title = 'Negado';
    const description = 'Negado';

    const breadcrumbs = [
        { to: '', text: 'Home' },
    ]

    return (
        <>
            <HtmlHead title={title} description={description} />
            {/* Title and Top Buttons Start */}
            <div className="page-title-container">
                <Row>
                    {/* Title Start */}
                    <Col md="7">
                        <h1 className="mb-0 pb-0 display-4">{title}</h1>
                        <BreadcrumbList items={breadcrumbs} />
                    </Col>
                    {/* Title End */}
                </Row>
            </div>
            {/* Title and Top Buttons End */}

            <Row className='mt-5'>
                <Col xs={12} xxl={12}>
                    <Row className="g-2 mb-5">
                        <Col sm="12" xxl="12">
                            <Card className="sh-19">
                                <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                                    <CsLineIcons icon="error-hexagon" className="text-danger" size={45} />
                                    <p className="heading mb-0">
                                        Acesso negado!
                                    </p>

                                    <p className="text-medium mb-4 text-muted">
                                        Você não possui permissão para acessar este conteúdo, entre em contato com o administrador do sistemas para solicitar acesso.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>


        </>
    );
};

export default Component;
