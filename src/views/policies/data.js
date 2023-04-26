import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';

import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';



const Data = () => {
    const title = 'Privacidade de dados';
    const description = 'Privacidade de dados';

    const breadcrumbs = [
        { to: '', text: 'Home' },
        { to: 'policies', text: 'Políticas' },
        { to: 'privacity', text: 'Dados' },
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
                            <CsLineIcons icon="triangle" className="text-primary" size={22} />
                        </div>
                        <div>
                            <p className="heading text-primary" style={{ marginTop: 1, marginLeft: 5 }}>
                                Política de Privacidade de Dados do Portal Vawlog
                            </p>
                        </div>
                    </div>

                   
                    
                    <p className="text-medium mb-0 mt-4 ">A Política de Privacidade de Dados do Portal Vawlog ("Política") descreve como a Vawlog coleta, utiliza e protege as informações pessoais dos usuários do portal Vawlog ("Portal"). Ao utilizar o Portal, você concorda com a coleta, utilização e proteção de suas informações pessoais conforme descrito nesta Política.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Coleta de Informações Pessoais</h2>
                    <p className="text-medium mb-0 mt-4 ">A Vawlog coleta informações pessoais dos usuários do Portal, como nome, endereço de e-mail, número de telefone e outras informações relevantes para a utilização do Portal. Estas informações são coletadas apenas quando fornecidas voluntariamente pelo usuário.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Utilização de Informações Pessoais</h2>
                    <p className="text-medium mb-0 mt-4 ">A Vawlog utiliza as informações pessoais coletadas para fornecer serviços e suporte aos usuários do Portal. As informações também podem ser utilizadas para melhorar os serviços e produtos da Vawlog, bem como para comunicações de marketing relacionadas aos serviços e produtos da empresa. A Vawlog não compartilha informações pessoais dos usuários com terceiros, exceto quando exigido por lei.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Proteção de Informações Pessoais</h2>
                    <p className="text-medium mb-0 mt-4 ">A Vawlog toma medidas técnicas e organizacionais adequadas para proteger as informações pessoais dos usuários do Portal contra perda, uso indevido, acesso não autorizado ou divulgação. A Vawlog utiliza medidas de segurança, como criptografia e controles de acesso, para proteger as informações pessoais dos usuários.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Cookies</h2>
                    <p className="text-medium mb-0 mt-4 ">O Portal pode utilizar cookies para melhorar a experiência do usuário. Cookies são arquivos de texto que são armazenados no computador do usuário para facilitar a navegação e personalização do Portal. O usuário pode optar por desativar os cookies nas configurações do seu navegador.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Alterações na Política</h2>
                    <p className="text-medium mb-0 mt-4 ">A Vawlog pode atualizar esta Política a qualquer momento. O uso contínuo do Portal após quaisquer alterações nesta Política constitui a aceitação dessas alterações.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Contato</h2>
                    <p className="text-medium mb-0 mt-4 ">Se você tiver dúvidas ou comentários sobre esta Política, entre em contato conosco através do e-mail: contato@vawlog.com.</p>
                </Card.Body>
            </Card>



        </>
    );
};

export default Data;
