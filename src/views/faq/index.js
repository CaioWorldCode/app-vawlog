import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';

import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';



const Contact = () => {
    const title = 'FAQ';
    const description = 'FAQ';

    const breadcrumbs = [
        { to: '', text: 'Home' },
        { to: 'faq', text: 'FAQ' },
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


            <Card className="">
                <Card.Body className=" ">

                    <div className='d-flex'>
                        <div>
                            <CsLineIcons icon="phone" className="text-primary" size={22} />
                        </div>
                        <div>
                            <p className="heading text-primary" style={{ marginTop: 1, marginLeft: 5 }}>
                                FAQ - Perguntas frequentes
                            </p>
                        </div>
                    </div>


                    <div>
                        <p className='mt-4 text-bold text-primary mb-0 text-align-left'>Qual é o prazo de entrega para meu pedido?</p>
                        <p className='mt-4 text-medium  mb-0 text-align-left'>O prazo de entrega varia dependendo do produto, do endereço de entrega e do método de envio escolhido. Para obter informações mais precisas sobre o prazo de entrega, consulte a página do produto ou entre em contato conosco.</p>

                        <p className='mt-4 text-bold text-primary mb-0 text-align-left'>Como faço para rastrear meu pedido?</p>
                        <p className='mt-4 text-medium mb-0 text-align-left'>Assim que o seu pedido for enviado, você receberá um e-mail com um link para rastrear o seu pedido. Você também pode acessar a página de status do seu pedido em nossa plataforma.</p>

                        <p className='mt-4 text-bold text-primary mb-0 text-align-left'>Posso cancelar meu pedido?</p>
                        <p className='mt-4 text-medium mb-0 text-align-left'>Sim, você pode cancelar seu pedido, desde que ele ainda não tenha sido processado para envio. Para cancelar seu pedido, entre em contato conosco o mais breve possível.</p>

                        <p className='mt-4 text-bold text-primary mb-0 text-align-left'>Como faço para devolver um produto?</p>
                        <p className='mt-4 text-medium mb-0 text-align-left'>Se você precisar devolver um produto, entre em contato conosco para obter instruções detalhadas.</p>

                        <p className='mt-4 text-bold text-primary mb-0 text-align-left'>Como faço para entrar em contato com o suporte?</p>
                        <p className='mt-4 text-medium mb-0 text-align-left'>Você pode entrar em contato conosco por e-mail, telefone. Todas as informações de contato estão disponíveis na página de contato.</p>


                        <p className='mt-4 text-bold text-primary mb-0 text-align-left'>Como a empresa protege minhas informações pessoais?</p>
                        <p className='mt-4 text-medium mb-0 text-align-left'>A segurança das informações do cliente é uma prioridade máxima para nossa empresa. Nós usamos medidas de segurança adequadas para proteger as informações do cliente, como criptografia de dados e procedimentos de acesso restrito.</p>

                        <p className='mt-4 text-bold text-primary mb-0 text-align-left'>O que devo fazer se tiver problemas com meu pedido ou conta?</p>
                        <p className='mt-4 text-medium mb-0 text-align-left'>Se você tiver problemas com seu pedido ou conta, entre em contato com nossa equipe de suporte ao cliente para obter ajuda. Você pode entrar em contato conosco por telefone, e-mail. Faremos o possível para resolver o problema o mais rápido possível.</p>

                        <p className='mt-4 text-bold text-primary mb-0 text-align-left'>Como faço para entrar em contato com o suporte ao cliente?</p>
                        <p className='mt-4 text-medium mb-0 text-align-left'>Para entrar em contato com nossa equipe de suporte ao cliente, você pode enviar um e-mail ou ligar para o número de suporte ao cliente disponível em nosso site. Nossa equipe de suporte ao cliente está disponível para ajudá-lo com quaisquer dúvidas ou problemas que possa ter.</p>
                    </div>


                </Card.Body>
            </Card>



        </>
    );
};

export default Contact;
