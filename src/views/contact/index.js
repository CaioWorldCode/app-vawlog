import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';

import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';



const Contact = () => {
    const title = 'Contato';
    const description = 'Contato';

    const breadcrumbs = [
        { to: '', text: 'Home' },
        { to: 'contact', text: 'Contato' },
    ]


    useEffect(() => {
        // loadDashboard()
    }, [])


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


            <Card className="">
                <Card.Body className=" ">

                    <div className='d-flex'>
                        <div>
                            <CsLineIcons icon="phone" className="text-primary" size={22} />
                        </div>
                        <div>
                            <p className="heading text-primary" style={{ marginTop: 1, marginLeft: 5 }}>
                                Ficou com dúvidas? Precisa de ajuda? Entre em contato conosco!
                            </p>
                        </div>
                    </div>

                    <div>
                        <div style={{ marginLeft: 20 }}>
                            <CsLineIcons icon="pin" className="text-primary" size={22} /> Localização

                            <div className='ml-4' style={{ marginLeft: 60 }}>
                                <p className="text-medium mb-0 mt-2">CEP: 06709-015</p>
                                <p className="text-medium mb-0 mt-2">Endereço: Rua Serra de Bragança</p>
                                <p className="text-medium mb-0 mt-2">Cidade: São Paulo-SP</p>
                                <p className="text-medium mb-0 mt-2">Bairro: Vila Gomes Cardim</p>
                            </div>


                            <div style={{ marginTop: 25 }}>
                                <p className="text-medium mb-0 mt-2">
                                    <CsLineIcons icon="phone" className="text-primary" size={22} /> Telefone 1: (11) 1234-5678
                                </p>

                                <p className="text-medium mb-0 mt-2">
                                    <CsLineIcons icon="phone" className="text-primary" size={22} /> Telefone 2: (11) 9876-5432
                                </p>

                                <p className="text-medium mb-0 mt-2">
                                    <CsLineIcons icon="email" className="text-primary" size={22} /> E-mail: contato@minhaempresa.com.br
                                </p>


                                <div class="mt-4">
                                    <a href="#" className='ml-2'>
                                        <CsLineIcons icon="facebook" className="text-primary ml-2" size={22} />
                                    </a>

                                    <a href="#" className='ml-2'>
                                        <CsLineIcons icon="instagram" className="text-primary ml-2" size={22} />
                                    </a>

                                    <a href="#" className='ml-2'>
                                        <CsLineIcons icon="twitter" className="text-primary ml-2" size={22} />
                                    </a>

                                    <a href="#" className='ml-2'>
                                        <CsLineIcons icon="youtube" className="text-primary ml-2" size={22} />
                                    </a>
                                </div>
                            </div>
                        </div>


                    </div>

                </Card.Body>
            </Card>



        </>
    );
};

export default Contact;
