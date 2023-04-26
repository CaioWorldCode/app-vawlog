import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';

import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';



const Privacy = () => {
    const title = 'Políticas de Uso';
    const description = 'Políticas de Uso';

    const breadcrumbs = [
        { to: '', text: 'Home' },
        { to: 'policies', text: 'Políticas' },
        { to: 'usage', text: 'Uso' },
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

                               Política de Uso do Portal Vawlog
                            </p>
                        </div>
                    </div>

                    <p className="text-medium mb-0 mt-4 "> A Política de Uso do Portal Vawlog ("Política") descreve os termos e condições sob os quais você pode acessar e utilizar o portal Vawlog ("Portal"). Ao utilizar o Portal, você concorda em cumprir esta Política. Se você não concorda com os termos desta Política, por favor, não utilize o Portal.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Conteúdo</h2>
                    <p className="text-medium mb-0 mt-4">Todo o conteúdo disponibilizado no Portal é de propriedade exclusiva da Vawlog. Nenhum conteúdo do Portal pode ser copiado, reproduzido, distribuído ou modificado sem autorização expressa da Vawlog.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Privacidade</h2>
                    <p className="text-medium mb-0 mt-4">A Vawlog coleta informações pessoais dos usuários do Portal apenas quando estas informações são fornecidas voluntariamente pelo usuário. As informações coletadas serão utilizadas apenas para a finalidade específica para a qual foram fornecidas.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Responsabilidade do Usuário</h2>
                    <p className="text-medium mb-0 mt-4">O usuário é responsável por todas as ações realizadas em sua conta no Portal, incluindo o conteúdo publicado. O usuário deve cumprir todas as leis e regulamentos aplicáveis ao utilizar o Portal.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Limitação de Responsabilidade</h2>
                    <p className="text-medium mb-0 mt-4">A Vawlog não se responsabiliza por quaisquer danos diretos ou indiretos decorrentes do uso ou incapacidade de uso do Portal, incluindo danos causados por vírus ou outros componentes prejudiciais.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Alterações na Política</h2>
                    <p className="text-medium mb-0 mt-4">A Vawlog pode atualizar esta Política a qualquer momento. O uso contínuo do Portal após quaisquer alterações nesta Política constitui a aceitação dessas alterações.</p>

                    <h2 className="text-medium mb-0 mt-4 text-primary">Contato</h2>
                    <p className="text-medium mb-0 mt-4">Se você tiver dúvidas ou comentários sobre esta Política, entre em contato conosco através do e-mail: contato@vawlog.com.</p>
                </Card.Body>
            </Card>



        </>
    );
};

export default Privacy;
