<Row>
<Col lg="6">
    {/* Stats Start */}
    <div className="d-flex">
        <Dropdown>
            <Dropdown.Toggle className="small-title p-0 align-top h-auto me-2" variant="link">
                Hoje
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>Semanal</Dropdown.Item>
                <Dropdown.Item>Mensal</Dropdown.Item>
                <Dropdown.Item>Anual</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <h2 className="small-title">Relatórios</h2>
    </div>
    <div className="mb-5">
        <Row className="g-2">
            <Col sm="6">
                <Card className="sh-11 hover-scale-up cursor-pointer">
                    <Card.Body className="h-100 py-3 align-items-center">
                        <Row className="g-0 h-100 align-items-center">
                            <Col xs="auto" className="pe-3">
                                <div className="bg-gradient-light sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="navigate-diagonal" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <Row className="gx-2 d-flex align-content-center">
                                    <Col xs="12" className="col-12 d-flex">
                                        <div className="d-flex align-items-center lh-1-25">Ordens de coleta</div>
                                    </Col>
                                    <Col xl="auto" className="col-12">
                                        <div className="cta-2 text-primary">0</div>
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
                            <Col xs="auto" className="pe-3">
                                <div className="bg-gradient-light sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="check" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <Row className="gx-2 d-flex align-content-center">
                                    <Col xs="12" className="col-12 d-flex">
                                        <div className="d-flex align-items-center lh-1-25">Finalizadas</div>
                                    </Col>
                                    <Col xl="auto" className="col-12">
                                        <div className="cta-2 text-primary">0</div>
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
                            <Col xs="auto" className="pe-3">
                                <div className="bg-gradient-light sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="alarm" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <Row className="gx-2 d-flex align-content-center">
                                    <Col xs="12" className="col-12 d-flex">
                                        <div className="d-flex align-items-center lh-1-25">Ordens pendentes</div>
                                    </Col>
                                    <Col xl="auto" className="col-12">
                                        <div className="cta-2 text-primary">0</div>
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
                            <Col xs="auto" className="pe-3">
                                <div className="bg-gradient-light sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="sync-horizontal" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <Row className="gx-2 d-flex align-content-center">
                                    <Col xs="12" className="col-12 d-flex">
                                        <div className="d-flex align-items-center lh-1-25">Ordens atrasadas</div>
                                    </Col>
                                    <Col xl="auto" className="col-12">
                                        <div className="cta-2 text-primary">0</div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
    {/* Stats End */}

    {/* Sales Start */}
    <h2 className="small-title">Sales</h2>
    <Card className="mb-5 sh-40">
        <Card.Body>
            <ChartCustomHorizontalTooltip />
        </Card.Body>
    </Card>
    {/* Sales End */}
</Col>

<Col lg="6" className="mb-5">
    <div className="d-flex justify-content-between">
        <h2 className="small-title">Ordens de coleta</h2>
        <Button variant="background-alternate" size="xs" className="btn-icon btn-icon-end p-0 text-small">
            <span className="align-bottom">Visualizar todas</span> <CsLineIcons icon="chevron-right" className="align-middle" size="12" />
        </Button>
    </div>
    <div className="mb-n2">
        {orders.map((row, index) => {
            return (
                <Card className="mb-2 sh-10 sh-md-8" key={index}>
                    <Card.Body className="pt-0 pb-0 h-100">
                        <Row className="w-100 h-100">
                            <Col xs="2" className='h-100'>
                                <div className='d-flex align-items-center h-100'>
                                    {row.num}
                                </div>
                            </Col>
                            <Col xs="5" className='h-100'>
                                <div className='d-flex align-items-center  h-100'>
                                    {row.name}
                                </div>
                            </Col>

                            <Col xs="2" className='h-100'>
                                <div className='d-flex align-items-center h-100'>
                                    <Badge bg={`outline-${row.status === 'Pendente' ? 'warning' : 'info'}`} className="me-1">
                                        {row.status}
                                    </Badge>
                                </div>
                            </Col>

                            <Col xs="3" className='h-100'>
                                <div className='d-flex align-items-center h-100'>
                                    {row.date}
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )
        })}
    </div>
</Col>
</Row>

<Row>
{/* Logs Start */}
<Col xl="6" className="mb-5">
    <h2 className="small-title">Últimas atividades</h2>
    <Card className="sh-40 h-xl-100-card">
        <Card.Body className="mb-n2 scroll-out h-100">
            <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: 'leave' }, overflowBehavior: { x: 'hidden', y: 'scroll' } }} className="h-100">
                {history.map((row, index) => {
                    return (
                        <Row className="g-0 mb-2" key={index}>
                            <Col xs="auto">
                                <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                                    <div className="sh-3">
                                        <CsLineIcons icon={row.icon} className="text-primary align-top" />
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                                    <div className="d-flex flex-column">
                                        <div className="text-alternate mt-n1 lh-1-25">{row.text}</div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs="auto">
                                <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                                    <div className="text-muted ms-2 mt-n1 lh-1-25">{row.date}</div>
                                </div>
                            </Col>
                        </Row>
                    )
                })}
            </OverlayScrollbarsComponent>
        </Card.Body>
    </Card>
</Col>
{/* Logs End */}

{/* Progress Start */}
<Col xl="6" className="mb-5">
    <h2 className="small-title">Controle de ordens de coleta</h2>
    <Row className="g-2">
        <Col md="6">
            <Card className="sh-13">
                <Card.Body className="py-0 d-flex align-items-center">
                    <ChartSmallDoughnutChart1 />
                </Card.Body>
            </Card>
        </Col>
        <Col md="6">
            <Card className="sh-13">
                <Card.Body className="py-0 d-flex align-items-center">
                    <ChartSmallDoughnutChart2 />
                </Card.Body>
            </Card>
        </Col>
        <Col md="6">
            <Card className="sh-13">
                <Card.Body className="py-0 d-flex align-items-center">
                    <ChartSmallDoughnutChart3 />
                </Card.Body>
            </Card>
        </Col>
        <Col md="6">
            <Card className="sh-13">
                <Card.Body className="py-0 d-flex align-items-center">
                    <ChartSmallDoughnutChart4 />
                </Card.Body>
            </Card>
        </Col>
        <Col md="6">
            <Card className="sh-13">
                <Card.Body className="py-0 d-flex align-items-center">
                    <ChartSmallDoughnutChart5 />
                </Card.Body>
            </Card>
        </Col>
        <Col md="6">
            <Card className="sh-13">
                <Card.Body className="py-0 d-flex align-items-center">
                    <ChartSmallDoughnutChart6 />
                </Card.Body>
            </Card>
        </Col>
    </Row>
</Col>
{/* Progress End */}
</Row>