import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';

import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';



const Regulation = () => {
    const title = 'Regulamento';
    const description = 'Regulamento';

    const breadcrumbs = [
        { to: '', text: 'Home' },
        { to: 'policies', text: 'Políticas' },
        { to: 'regulation', text: 'Regulamento' },
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
                                Regulamento da Empresa Vawlog
                            </p>
                        </div>
                    </div>

                    <p className="text-medium mb-0 mt-4">O Regulamento da Empresa Vawlog ("Regulamento") estabelece as regras e diretrizes para todos os funcionários, contratados e prestadores de serviço da empresa ("Funcionários") e é aplicável a todas as operações e atividades da Vawlog.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Conduta Profissional</h2>
                    <p className="text-medium mb-0 mt-4">Todos os Funcionários devem seguir os mais altos padrões de ética e conduta profissional em todas as interações relacionadas à Vawlog. Isso inclui:</p>
                    <ul className="text-medium mb-0 mt-4">
                        <li>Respeitar os direitos e dignidade de todos os indivíduos, incluindo clientes, colegas de trabalho e concorrentes;</li>
                        <li>Não divulgar informações confidenciais da empresa, clientes ou parceiros de negócios;</li>
                        <li>Evitar conflitos de interesse;</li>
                        <li>Seguir todas as leis e regulamentações aplicáveis.</li>
                    </ul>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Uso de Recursos da Empresa</h2>
                    <p className="text-medium mb-0 mt-4">Todos os Funcionários devem usar os recursos da empresa, como equipamentos de escritório, sistemas de informação e outros ativos, apenas para fins comerciais legítimos e em conformidade com as políticas e procedimentos da empresa. O uso não autorizado desses recursos é proibido.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Assédio e Discriminação</h2>
                    <p className="text-medium mb-0 mt-4">A Vawlog não tolera assédio ou discriminação de qualquer tipo. Isso inclui, mas não se limita a, assédio sexual, comentários ofensivos sobre raça, gênero, orientação sexual, religião ou deficiência. Todos os Funcionários devem tratar os outros com respeito e dignidade.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Consequências de Violações</h2>
                    <p className="text-medium mb-0 mt-4">A violação deste Regulamento pode resultar em medidas disciplinares, incluindo advertências, suspensão ou demissão, conforme determinado pela empresa.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Alterações no Regulamento</h2>
                    <p className="text-medium mb-0 mt-4">A Vawlog pode atualizar este Regulamento a qualquer momento. A continuação do emprego ou prestação de serviços após quaisquer alterações neste Regulamento constitui a aceitação dessas alterações.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Contato</h2>
                    <p className="text-medium mb-0 mt-4">Se você tiver dúvidas ou comentários sobre este Regulamento, entre em contato conosco através do e-mail: contato@vawlog.com.</p>
                </Card.Body>
            </Card>



        </>
    );
};

export default Regulation;
