import CsLineIcons from "cs-line-icons/CsLineIcons";
import React, { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap";


const Statistics = (props) => {

    const [data, setData] = useState(false)

    useEffect(() => {
        setData(props)
    }, [])

    return (
        <>
            <div className="mb-5">
                <Row className="g-2">
                    <Col sm="6">
                        <Card className="sh-11 hover-scale-up cursor-pointer">
                            <Card.Body className="h-100 py-3 align-items-center">
                                <Row className="g-0 h-100 align-items-center">
                                    <Col xs="4" className="pe-3">
                                        <div className=' d-flex justify-content-center align-items-center'>
                                            <div className="bg-info sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                                                <CsLineIcons icon="user" className="text-white" />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs="8">
                                        <Row className="gx-2 d-flex align-content-center">
                                            <Col xs="12" className="col-12 d-flex">
                                                <div className="d-flex align-items-center lh-1-25">Usuários Ativos</div>
                                            </Col>
                                            <Col xs="12" className="col-12">
                                                <div className='w-100 d-flex justify-content-center align-items-center'>
                                                    <div className="cta-2 text-primary">{data ? data.activeUsers : false}</div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm="6">
                        <Card className="sh-11 hover-scale-up cursor-pointer">
                            <Card.Body className="h-100 py-3 align-items-center">
                                <Row className="g-0 h-100 align-items-center">
                                    <Col xs="4" className="pe-3">
                                        <div className=' d-flex justify-content-center align-items-center'>
                                            <div className="bg-warning sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                                                <CsLineIcons icon="dollar" className="text-white" />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs="8">
                                        <Row className="gx-2 d-flex align-content-center">
                                            <Col xs="12" className="col-12 d-flex">
                                                <div className="d-flex align-items-center justify-content-center text-center lh-1-25">Pagamentos Pendentes</div>
                                            </Col>
                                            <Col xs="12" className="col-12">
                                                <div className='w-100 d-flex justify-content-center align-items-center'>
                                                    <div className="cta-2 text-primary">{data ? data.pendingPayment : false}</div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm="6">
                        <Card className="sh-11 hover-scale-up cursor-pointer">
                            <Card.Body className="h-100 py-3 align-items-center">
                                <Row className="g-0 h-100 align-items-center">
                                    <Col xs="4" className="pe-3">
                                        <div className=' d-flex justify-content-center align-items-center'>
                                            <div className="bg-danger sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                                                <CsLineIcons icon="slash" className="text-white" />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs="8">
                                        <Row className="gx-2 d-flex align-content-center">
                                            <Col xs="12" className="col-12 d-flex">
                                                <div className="d-flex align-items-center justify-content-center text-center lh-1-25">Pagamentos Reprovados</div>
                                            </Col>
                                            <Col xs="12" className="col-12">
                                                <div className='w-100 d-flex justify-content-center align-items-center'>
                                                    <div className="cta-2 text-primary">{data ? data.reprovedPayment : false}</div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm="6">
                        <Card className="sh-11 hover-scale-up cursor-pointer">
                            <Card.Body className="h-100 py-3 align-items-center">
                                <Row className="g-0 h-100 align-items-center">
                                    <Col xs="4" className="pe-3">
                                        <div className=' d-flex justify-content-center align-items-center'>
                                            <div className="bg-success sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                                                <CsLineIcons icon="check-circle" className="text-white" />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs="8">
                                        <Row className="gx-2 d-flex align-content-center">
                                            <Col xs="12" className="col-12 d-flex">
                                                <div className="d-flex align-items-center justify-content-center text-center lh-1-25">Pagamentos Concluídos</div>
                                            </Col>
                                            <Col xs="12" className="col-12">
                                                <div className='w-100 d-flex justify-content-center align-items-center'>
                                                    <div className="cta-2 text-primary">{data ? data.approvedPayment : false}</div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Statistics;

