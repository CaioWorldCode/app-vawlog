import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';

import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';



const Cookies = () => {
    const title = 'Políticas de Cookies';
    const description = 'Políticas de Cookies';

    const breadcrumbs = [
        { to: '', text: 'Home' },
        { to: 'policies', text: 'Políticas' },
        { to: 'cookies', text: 'Cookies' },
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
                            <CsLineIcons icon="triangle" className="text-primary" size={22} />
                        </div>
                        <div>
                            <p className="heading text-primary" style={{ marginTop: 1, marginLeft: 5 }}>
                                Política de Cookies do Portal Vawlog
                            </p>
                        </div>
                    </div>

                    <p className="text-medium mb-0 mt-4">A Política de Cookies do Portal Vawlog ("Política") descreve como a Vawlog utiliza cookies em seu portal ("Portal"). Ao utilizar o Portal, você concorda com o uso de cookies conforme descrito nesta Política.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">O que são Cookies?</h2>
                    <p className="text-medium mb-0 mt-4">Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando você visita um site. Eles são usados para lembrar suas preferências de navegação e melhorar sua experiência no site.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Tipos de Cookies Utilizados</h2>
                    <p className="text-medium mb-0 mt-4">A Vawlog utiliza os seguintes tipos de cookies em seu Portal:</p>
                    <ul className="text-medium mb-0 mt-4">
                        <li>Cookies Necessários: são essenciais para o funcionamento do Portal e permitem que você navegue pelo site e use seus recursos.</li>
                        <li>Cookies de Desempenho: coletam informações sobre como os usuários usam o Portal, como quais páginas são visitadas com mais frequência, para melhorar o desempenho do site.</li>
                        <li>Cookies de Funcionalidade: lembram suas preferências de navegação e permitem que o site forneça recursos personalizados.</li>
                        <li>Cookies de Publicidade: são usados para exibir anúncios relevantes para você com base em suas preferências de navegação.</li>
                    </ul>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Gerenciando Cookies</h2>
                    <p className="text-medium mb-0 mt-4">Você pode gerenciar ou desativar os cookies nas configurações do seu navegador. No entanto, isso pode afetar a funcionalidade do Portal.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Alterações na Política</h2>
                    <p className="text-medium mb-0 mt-4">A Vawlog pode atualizar esta Política a qualquer momento. O uso contínuo do Portal após quaisquer alterações nesta Política constitui a aceitação dessas alterações.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Contato</h2>
                    <p className="text-medium mb-0 mt-4">Se você tiver dúvidas ou comentários sobre esta Política, entre em contato conosco através do e-mail: contato@vawlog.com.</p>
                </Card.Body>
            </Card>



        </>
    );
};

export default Cookies;
