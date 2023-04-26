import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';

import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

import api from 'services/api';
import ChartLogsMonth from './chartLogsMonth';
import ChartLogsDays from './chartLogsDays';
import ChartOrdersMonth from './chartOrdersMonth';
import ChartOrdersDays from './chartOrdersDays';
import ChartNewOrganizationsMonth from './chartNewOrganizationsMonth';
import ChartNewOrganizationsDays from './chartNewOrganizationsDays';
import ChartOrdersByStatusMonth from './chartOrdersByStatusMonth';
import ChartOrdersByStatusDays from './chartOrdersByStatusDays';
import ChartOrdersByTypeMonth from './chartOrdersByTypeMonth';

const DashboardsAnalytic = () => {
    const title = 'Analytic Dashboard';
    const description = 'Analytic Dashboard';

    const breadcrumbs = [
        { to: '', text: 'Home' },
        { to: 'dashboards', text: 'Dashboards' },
    ]

    const [loading, setLoading] = useState(false)
    const [totalOrders, setTotalOrders] = useState(0)
    const [totalOrdersPending] = useState(0)
    const [totalOrdersFinished] = useState(0)
    const [totalOrdersLate] = useState(0)




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

            {loading
                ? <>
                    <div className="align-items-center">
                        <Spinner as="span" animation="border" size="md" />

                        <div>Carregando...</div>
                    </div>
                </>
                : <>
                    <Card className="">
                        <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                            <CsLineIcons icon="info-hexagon" className="text-info" size={50} />
                            <p className="heading mb-0">
                                Bem-vindo ao nosso sistema de acompanhamento de ordem de coleta e status de pedidos!
                            </p>

                            <p className="text-medium mb-0 text-muted">
                                Com nossa plataforma, você poderá acompanhar todas as etapas do processo de coleta, desde a criação da ordem até a entrega final do produto. Além disso, você terá acesso em tempo real ao status de cada pedido, permitindo que você mantenha seus clientes informados sobre o andamento de seus pedidos.
                            </p>
                        </Card.Body>
                    </Card>

                    <Row className='mt-4'>
                        <Col xs={3}>
                            <Card className="">
                                <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                                    <div className='d-flex'>
                                        <div>
                                            <CsLineIcons icon="archive" className="text-danger" size={22} />
                                        </div>
                                        <div>
                                            <p className="heading" style={{ marginTop: 1, marginLeft: 5 }}>
                                                Ordens de coleta
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-medium mb-0 text-muted">
                                        {totalOrders}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3}>
                            <Card className="">
                                <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                                    <div className='d-flex'>
                                        <div>
                                            <CsLineIcons icon="notification" className="text-warning" size={22} />
                                        </div>
                                        <div>
                                            <p className="heading" style={{ marginTop: 1, marginLeft: 5 }}>
                                                Ordens pendentes
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-medium mb-0 text-muted">
                                        {totalOrdersPending}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3}>
                            <Card className="">
                                <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                                    <div className='d-flex'>
                                        <div>
                                            <CsLineIcons icon="alarm" className="text-warning" size={22} />
                                        </div>
                                        <div>
                                            <p className="heading" style={{ marginTop: 1, marginLeft: 5 }}>
                                                Ordens atrasadas
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-medium mb-0 text-muted">
                                        {totalOrdersLate}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3}>
                            <Card className="">
                                <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                                    <div className='d-flex'>
                                        <div>
                                            <CsLineIcons icon="check-circle" className="text-success" size={22} />
                                        </div>
                                        <div>
                                            <p className="heading" style={{ marginTop: 1, marginLeft: 5 }}>
                                                Ordens finalizadas
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-medium mb-0 text-muted">
                                        {totalOrdersFinished}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className='mt-4'>
                        <Col xs={6}>
                            <Card className="">
                                <Card.Body className=" ">
                                    <div className='d-flex'>
                                        <div>
                                            <CsLineIcons icon="triangle" className="text-secondary" size={22} />
                                        </div>
                                        <div>
                                            <p className="heading" style={{ marginTop: 1, marginLeft: 5 }}>
                                                Informações importantes
                                            </p>
                                        </div>
                                    </div>


                                    <p className="mt-4 text-medium mb-0 text-align-left">Prezado(a) cliente,</p>

                                    <p className='mt-4 text-medium mb-0 text-align-left'>Gostaríamos de informá-lo(a) que, apesar de nossos melhores esforços, pode haver atrasos em seu pedido devido a motivos padronizados de logística que podem afetar o tempo de entrega.</p>

                                    <p className='mt-4 text-medium mb-0 text-align-left'>Algumas das razões mais comuns que podem levar a atrasos em seu pedido incluem, mas não se limitam a:</p>

                                    <ul>
                                        <li className='mt-4 text-medium mb-0 text-align-left'>Problemas de transporte: podem ocorrer atrasos no transporte devido a questões climáticas, tráfego, acidentes ou greves, entre outros fatores.</li>
                                        <li className='mt-4 text-medium mb-0 text-align-left'>Problemas de estoque: em algumas ocasiões, podemos enfrentar problemas de estoque com alguns dos itens em seu pedido, o que pode atrasar a entrega.</li>
                                        <li className='mt-4 text-medium mb-0 text-align-left'>Problemas com o endereço: se houver algum erro no endereço de entrega fornecido, o pedido pode ser devolvido ou atrasado na entrega.</li>
                                    </ul>

                                    <p className='mt-4 text-medium mb-0 text-align-left'>No entanto, queremos tranquilizá-lo(a) de que estamos trabalhando arduamente para minimizar quaisquer atrasos e garantir que seu pedido chegue até você o mais rápido possível. Caso haja algum problema ou imprevisto no processamento ou entrega do seu pedido, entraremos em contato imediatamente para informá-lo(a).</p>

                                    <p className='mt-4 text-medium mb-0 text-align-left'>Agradecemos sua compreensão e estamos à disposição para quaisquer dúvidas ou informações adicionais.</p>

                                    <p className='mt-4 text-medium mb-0 text-align-left'>Atenciosamente,</p>
                                    <p className='mt-4 text-medium mb-0 text-align-left'>Equipe de Vawlog.</p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={6}>
                            <Card className="">
                                <Card.Body className=" ">
                                    <div className='d-flex'>
                                        <div>
                                            <CsLineIcons icon="question-hexagon" className="text-primary" size={22} />
                                        </div>
                                        <div>
                                            <p className="heading" style={{ marginTop: 1, marginLeft: 5 }}>
                                                Perguntas frequentes
                                            </p>
                                        </div>
                                    </div>

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


                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            }



        </>
    );
};

export default DashboardsAnalytic;
