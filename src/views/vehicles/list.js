import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner, Dropdown, InputGroup, FormControl, Card, Alert, Button, Modal, Form as FormBootstrap } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import moment from 'moment';
import pt from 'date-fns/locale/pt';
import DatePicker from 'react-datepicker';
import api from 'services/api';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import PaginationTable from 'helpers/pagination';
import formatField from 'helpers/formatField';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import ReactSelect from 'react-select';


const Component = () => {
    const title = 'Veículos';
    const description = 'Veículos';

    const breadcrumbs = [
        { to: '', text: 'Home' },
        { to: 'vehicles', text: 'Veículos' },
    ]

    const columns = [
        { name: 'Id', acessor: 'id', column: 'id' },
        { name: 'Status', acessor: '', column: '', format: 'vehicle_status' },
        { name: 'Tipo', acessor: '', column: '', format: 'vehicle_type' },
        { name: 'Fabricante', acessor: 'manufacturer', column: 'manufacturer' },
        { name: 'Model', acessor: 'model', column: 'model' },
        { name: 'Ano', acessor: 'year', column: 'year' },
        { name: 'Data', acessor: 'created_at', column: 'created_at' },
        { name: '', acessor: 'custom', column: 'custom' },
    ]

    const [modalNewRegister, setModalNewRegister] = useState(false)
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(true)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [order, setOrder] = useState(false)
    const [orderBy, setOrderBy] = useState('asc')
    const [data, setData] = useState(false)
    const [total, setTotal] = useState(false)
    const [searchField, setSearchField] = useState('')
    const [paginationConfig, setPaginationConfig] = useState({
        page: 1
    })

    const [modalEditRegister, setModalEditRegister] = useState(false)
    const [modalViewRegister, setModalViewRegister] = useState(false)

    const [idEdit, setIdEdit] = useState(false)
    const [loadingIdData, setLoadingIdData] = useState(false)
    const [idData, setIdData] = useState(false)

    const loadData = async (pageLimit, page) => {
        document.body.classList.add('spinner')

        pageLimit = limit

        try {
            let url = `/api/v1/private/vehicles?order=${orderBy}&limit=${pageLimit}&page=${page}&search=${searchField}`

            if (startDate && endDate) {
                url += `&start=${moment(startDate).format('YYYY-MM-DD')}&end=${moment(endDate).format('YYYY-MM-DD')}`
            }

            if (order) {
                url += `&order=${orderBy}&order_by=${order}`
            }

            const response = await api.get(url)

            setData(response.data.data)
            setTotal(response.data.total)

            setPaginationConfig({
                previousPage: response.data.data.prev_page_url,
                page: response.data.data.current_page,
                nextPage: response.data.data.next_page_url,
                limit: pageLimit,
                total: response.data.data.last_page,
                lastPage: response.data.data.last_page
            })

        } catch (error) {
            console.log(error)
        }

        document.body.classList.remove('spinner')

        setLoading(false)
    }

    const orderTable = (param) => {
        setOrder(param)

        if (orderBy === 'asc') {
            setOrderBy('desc')
        } else {
            setOrderBy('asc')
        }
    }

    const changePaginationConfig = async (param, value) => {
        await setPaginationConfig({
            ...paginationConfig, [param]: value
        })
    }

    useEffect(() => {
        if (!data) {
            loadData(paginationConfig.limit, paginationConfig.page)
        }
    }, [paginationConfig.page])

    useEffect(() => {
        if (data) {
            loadData(limit, 1)
        }
    }, [limit])

    useEffect(() => {
        if (data) {
            if (startDate && endDate) {
                loadData(limit, 1)
            }
        }
    }, [endDate, startDate])

    useEffect(() => {
        if (data) {
            loadData(limit, 1)
        }
    }, [order, orderBy])

    const handleSearch = (e) => {
        setSearchField(e.target.value)
    }

    const callLoadEditRegister = async () => {
        setLoadingIdData(true)
        try {
            const response = await api.get(`/api/v1/private/vehicles/${idEdit}`)

            setIdData(response.data)
        } catch (error) {

        }
        setLoadingIdData(false)
    }

    useEffect(() => {
        if (modalEditRegister) {
            if (idEdit) {
                callLoadEditRegister()
            }
        }
    }, [modalEditRegister])

    useEffect(() => {
        if (modalViewRegister) {
            if (idEdit) {
                callLoadEditRegister()
            }
        }
    }, [modalViewRegister])

    const callEdit = (id) => {
        setModalEditRegister(true)
        setIdEdit(id)
    }

    const callView = (id) => {
        setModalViewRegister(true)
        setIdEdit(id)
    }

    const callDelete = async (id) => {
        Swal.fire({
            title: 'Tem certeza que deseja excluir este cadastro?',
            showDenyButton: true,
            showCancelButton: true,
            showCancelButton: false,
            confirmButtonText: 'Sim',
            confirmButtonColor: '#80D946',
            denyButtonText: `Não`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await api.delete(`/api/v1/private/vehicles/${id}`)
                    Swal.fire({
                        title: response.data.title,
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'Fechar'
                    }).then((result) => {
                        loadData()
                    })
                } catch (error) {
                    Swal.fire({
                        title: error.response.data.title,
                        text: error.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'Fechar'
                    })
                }
            }
        })
    }

    const [status, setStatus] = useState([])
    const [type, setType] = useState([])

    const getParams = async () => {
        try {
            const response = await api.get(`/api/v1/private/vehicle_type?limit=100`)

            let array_types = []

            response.data.data.map((row) => {
                array_types.push({
                    label: row.name,
                    value: row.id
                })
            })

            setType(array_types)
        } catch (error) {

        }

        try {
            const response = await api.get(`/api/v1/private/vehicle_status?limit=100`)

            let array_status = []

            response.data.data.map((row) => {
                array_status.push({
                    label: row.name,
                    value: row.id
                })
            })

            setStatus(array_status)
        } catch (error) {

        }
    }

    useEffect(() => {
        if (status.length === 0 && type.length === 0) {
            getParams()
        }
    }, [])

    const renderTable = () => {
        return (
            <>
                <Row>
                    <Col xs={12} xxl={12} className=" d-flex justify-content-end align-items-end">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            onClick={() => setModalNewRegister(true)}
                        >
                            Novo Cadastro <CsLineIcons icon="plus" />
                        </Button>
                    </Col>
                </Row>

                {/* FILTERS */}
                <Row>
                    <Col xs={12} xxl={1} className="d-flex d-flex justify-content-end align-items-end">
                        <Dropdown
                            align={{ xs: 'end' }}
                            className="d-inline-block ms-1"
                            onSelect={(e) =>
                                setLimit(e)
                            }
                        >
                            <Dropdown.Toggle variant="foreground-alternate" className="shadow">
                                {limit} Items
                            </Dropdown.Toggle>

                            <Dropdown.Menu
                                className="shadow dropdown-menu-end"
                            >
                                <Dropdown.Item eventKey="5">5 Items</Dropdown.Item>
                                <Dropdown.Item eventKey="10">10 Items</Dropdown.Item>
                                <Dropdown.Item eventKey="20">20 Items</Dropdown.Item>
                                <Dropdown.Item eventKey="50">50 Items</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col xxl={4}>
                        <Row className="g-2 w-100">
                            <Col>
                                <h2 className="heading title mb-1 text-muted">De</h2>
                                <DatePicker
                                    locale={pt}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            </Col>
                            <Col>
                                <h2 className="heading title mb-1 text-muted">Até</h2>
                                <DatePicker
                                    locale={pt}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col xxl={4}>
                        &nbsp;
                    </Col>
                    <Col xs={12} xxl={3} className=" d-flex justify-content-end align-items-end">
                        <InputGroup className="mt-2"
                            onChange={e => handleSearch(e)}
                            onKeyDown={e => e.key === 'Enter' ? loadData(paginationConfig.limit, 1) : false}
                        >
                            <InputGroup.Text >
                                <CsLineIcons icon="search" />
                            </InputGroup.Text>
                            <FormControl placeholder="pesquisar..." aria-label="Pesquisar" aria-describedby="basic-addon1" />
                        </InputGroup>
                    </Col>
                </Row>
                {/* FILTERS */}

                {/* DATA */}
                <Row className='mt-5'>
                    <Col xs={12} xxl={12}>
                        {data.length === 0
                            ? <>
                                <Row className="g-2 mb-5">
                                    <Col sm="12" xxl="12">
                                        <Card className="sh-19">
                                            <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                                                <CsLineIcons icon="warning-hexagon" className="text-warning" size={50} />
                                                <p className="heading mb-0">
                                                    Ops! Nenhum resultado para essa consulta.
                                                </p>

                                                <p className="text-medium mb-0 text-muted">
                                                    Altere os filtros da consulta e tente novamente.
                                                </p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                            : <>

                                {total
                                    ? <>
                                        <Alert variant="info">
                                            Total de registros localizados: <strong>{total}</strong>
                                        </Alert>
                                    </>
                                    : <></>
                                }

                                <table className="react-table rows" >
                                    <thead>
                                        <tr>
                                            {columns.map((row, index) => {
                                                return (
                                                    <th
                                                        key={index}
                                                        className={`text-muted text-small text-uppercase ${row.column ? 'cursor-pointer' : ''}`}
                                                        onClick={() => row.column ? orderTable(row.column) : false}
                                                    >
                                                        <span className={`${order === row.column ? 'text-primary  font-weight-bold' : ''}`}>
                                                            {row.name} &nbsp;

                                                            {order === row.column
                                                                ? <CsLineIcons size={10} icon={orderBy === 'asc' ? 'chevron-top' : 'chevron-bottom'} />
                                                                : <></>
                                                            }
                                                        </span>
                                                    </th>
                                                )
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.length > 0 && data.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    {columns.map((r, i) => {
                                                        return (
                                                            <td key={i}>

                                                                {r.format ?
                                                                    formatField(r.format, row[r.acessor], row)
                                                                    : <>
                                                                        {r.acessor === 'custom'
                                                                            ? <>
                                                                                <Button onClick={() => callView(row.id)} variant="outline-success" className="btn-icon btn-icon-only mb-1">
                                                                                    <CsLineIcons icon="eye" />
                                                                                </Button>

                                                                                &nbsp;
                                                                                <Button onClick={() => callEdit(row.id)} variant="outline-info" className="btn-icon btn-icon-only mb-1">
                                                                                    <CsLineIcons icon="edit" />
                                                                                </Button>

                                                                                &nbsp;
                                                                                <Button onClick={() => callDelete(row.id)} variant="outline-danger" className="btn-icon btn-icon-only mb-1">
                                                                                    <CsLineIcons icon="bin" />
                                                                                </Button>

                                                                            </>
                                                                            : <>
                                                                                {row[r.acessor]}
                                                                            </>
                                                                        }
                                                                    </>
                                                                }
                                                            </td>
                                                        )
                                                    })}
                                                </tr>
                                            )
                                        })}
                                    </tbody>

                                </table>


                                <PaginationTable
                                    config={paginationConfig}
                                    gotoPage={(page) => [changePaginationConfig('page', page)]}
                                />

                            </>
                        }
                    </Col>
                </Row>
                {/* DATA */}
            </>
        )
    }


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
                    {renderTable()}
                </>
            }

            {/* MODAL NEW REGISTER */}
            <Modal
                className="scroll-out"
                show={modalNewRegister}
                size='md'
                centered
                onHide={() => setModalNewRegister(false)}
            >
                <Modal.Body>
                    <Row>
                        <Col xs={11}>
                            &nbsp;
                        </Col>
                        <Col xs={1}>
                            <div className='d-flex justify-content-end cursor-pointer' onClick={() => setModalNewRegister(false)}>
                                <CsLineIcons icon="close" className="text-primary" size={20} />
                            </div>
                        </Col>
                    </Row>

                    <h4>Novo cadastro</h4>

                    <Formik
                        initialValues={{
                            vehicle_type_id: false,
                            vehicle_status_id: false,
                            description: '',
                            plate: '',
                            renavam: '',
                            model: '',
                            manufacturer: '',
                            year: '',
                            fuel: '',
                            color: '',
                            capacity_kg: '',
                            capacity_m: '',
                            bodywork: '',
                            ipva: '',
                            dpvat: '',
                            licensing: ''
                        }}


                        onSubmit={async (values, { resetForm }) => {

                            values.ipva = moment(values.ipva).format('YYYY-MM-DD')
                            values.dpvat = moment(values.dpvat).format('YYYY-MM-DD')
                            values.licensing = moment(values.licensing).format('YYYY-MM-DD')

                            try {
                                const response = await api.post(`/api/v1/private/vehicles`, values)

                                resetForm()

                                Swal.fire({
                                    title: response.data.title,
                                    text: response.data.message,
                                    icon: 'success',
                                    confirmButtonText: 'Fechar'
                                }).then((result) => {
                                    setModalNewRegister(false)
                                    loadData()
                                })

                            } catch (error) {
                                Swal.fire({
                                    title: error.response.data.title,
                                    text: error.response.data.message,
                                    icon: 'error',
                                    confirmButtonText: 'Fechar'
                                })
                            }
                        }}
                    >
                        {({ values, errors, touched, setFieldValue }) => (
                            <Form className="tooltip-end-bottom mt-4">

                                <div className="mb-3 form-group tooltip-end-top">
                                    <div className='label'> Tipo </div>
                                    <ReactSelect
                                        placeholder=""
                                        classNamePrefix="react-select"
                                        options={type}
                                        value={type.filter(option => option.value === values.vehicle_type_id)}
                                        onChange={e => setFieldValue('vehicle_type_id', e.value)}
                                    />
                                    {errors.icon && touched.icon && <div className="d-block invalid-tooltip">{errors.icon}</div>}
                                </div>


                                <div className="mb-3 form-group tooltip-end-top">
                                    <div className='label'> Status </div>
                                    <ReactSelect
                                        placeholder=""
                                        classNamePrefix="react-select"
                                        options={status}
                                        value={status.filter(option => option.value === values.vehicle_status_id)}
                                        onChange={e => setFieldValue('vehicle_status_id', e.value)}
                                    />
                                    {errors.icon && touched.icon && <div className="d-block invalid-tooltip">{errors.icon}</div>}
                                </div>

                                <Row>
                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Placa </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="plate" value={values.plate} />
                                            {errors.plate && touched.plate && <div className="d-block invalid-tooltip">{errors.plate}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Renavam </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="renavam" value={values.renavam} />
                                            {errors.renavam && touched.renavam && <div className="d-block invalid-tooltip">{errors.renavam}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Modelo </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="model" value={values.model} />
                                            {errors.model && touched.model && <div className="d-block invalid-tooltip">{errors.model}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Fabricante </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="manufacturer" value={values.manufacturer} />
                                            {errors.manufacturer && touched.manufacturer && <div className="d-block invalid-tooltip">{errors.manufacturer}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Ano </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="year" value={values.year} />
                                            {errors.year && touched.year && <div className="d-block invalid-tooltip">{errors.year}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Combustível </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="fuel" value={values.fuel} />
                                            {errors.fuel && touched.fuel && <div className="d-block invalid-tooltip">{errors.fuel}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Cor </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="color" value={values.color} />
                                            {errors.color && touched.color && <div className="d-block invalid-tooltip">{errors.color}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6}>
                                        <div className="mb-3 form-group ">
                                            <div className='label'> Capacidade KG </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="capacity_kg" value={values.capacity_kg} />
                                            {errors.capacity_kg && touched.capacity_kg && <div className="d-block invalid-tooltip">{errors.capacity_kg}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Capacidade m²</div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="capacity_m" value={values.capacity_m} />
                                            {errors.capacity_m && touched.capacity_m && <div className="d-block invalid-tooltip">{errors.capacity_m}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={12}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Carroceria</div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="bodywork" value={values.bodywork} />
                                            {errors.bodywork && touched.bodywork && <div className="d-block invalid-tooltip">{errors.bodywork}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={4}>
                                        <div className="mb-3 form-group ">
                                            <div className='label'> IPVA </div>
                                            <DatePicker
                                                locale={pt}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                selected={values.ipva}
                                                onChange={e => setFieldValue('ipva', e)}
                                                startDate={values.ipva}
                                            />
                                            {errors.ipva && touched.ipva && <div className="d-block invalid-tooltip">{errors.ipva}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> DPVAT</div>
                                            <DatePicker
                                                locale={pt}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                selected={values.dpvat}
                                                onChange={e => setFieldValue('dpvat', e)}
                                                startDate={values.dpvat}
                                            />
                                            {errors.dpvat && touched.dpvat && <div className="d-block invalid-tooltip">{errors.dpvat}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Licenciamento </div>
                                            <DatePicker
                                                locale={pt}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                selected={values.licensing}
                                                onChange={e => setFieldValue('licensing', e)}
                                                startDate={values.licensing}
                                            />
                                            {errors.licensing && touched.licensing && <div className="d-block invalid-tooltip">{errors.licensing}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={12}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Descrição </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="description" value={values.description} />
                                            {errors.description && touched.description && <div className="d-block invalid-tooltip">{errors.description}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <div className="d-grid gap-2 mb-3 mt-4">
                                    <Button
                                        variant="success"
                                        type="submit"
                                        disabled={values.loading}
                                    >
                                        {values.loading
                                            ? <Spinner as="span" animation="border" size="sm" />
                                            : <>Cadastrar</>
                                        }
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </Modal.Body>
            </Modal>
            {/* MODAL NEW REGISTER */}

            {/* MODAL EDIT REGISTER */}
            <Modal
                className="scroll-out"
                show={modalEditRegister}
                size='md'
                centered
                onHide={() => setModalEditRegister(false)}
            >
                <Modal.Body>
                    <Row>
                        <Col xs={11}>
                            &nbsp;
                        </Col>
                        <Col xs={1}>
                            <div className='d-flex justify-content-end cursor-pointer' onClick={() => setModalEditRegister(false)}>
                                <CsLineIcons icon="close" className="text-primary" size={20} />
                            </div>
                        </Col>
                    </Row>

                    <h4>Editar</h4>

                    {loadingIdData
                        ? <>
                            <div className="align-items-center">
                                <Spinner as="span" animation="border" size="md" />

                                <div>Carregando...</div>
                            </div>
                        </>
                        :
                        <Formik
                            initialValues={{
                                vehicle_type_id: idData.vehicle_type_id,
                                vehicle_status_id: idData.vehicle_status_id,
                                description: idData.description,
                                plate: idData.plate,
                                renavam: idData.renavam,
                                model: idData.model,
                                manufacturer: idData.manufacturer,
                                year: idData.year,
                                fuel: idData.fuel,
                                color: idData.color,
                                capacity_kg: idData.capacity_kg,
                                capacity_m: idData.capacity_m,
                                bodywork: idData.bodywork,
                                ipva: idData.ipva ? new Date(new Date(idData.ipva).setDate(new Date(idData.ipva).getDate() + 1)) : false,
                                dpvat: idData.dpvat ? new Date(new Date(idData.dpvat).setDate(new Date(idData.dpvat).getDate() + 1)) : false,
                                licensing: idData.licensing ? new Date(new Date(idData.licensing).setDate(new Date(idData.licensing).getDate() + 1)) : false,
                            }}


                            onSubmit={async (values, { resetForm }) => {
                                values.ipva = values.ipva ? moment(values.ipva).format('YYYY-MM-DD') : false
                                values.dpvat = values.dpvat ? moment(values.dpvat).format('YYYY-MM-DD') : false
                                values.licensing = values.licensing ? moment(values.licensing).format('YYYY-MM-DD') : false

                                try {
                                    
                                    const response = await api.post(`/api/v1/private/vehicles/${idEdit}`, values)

                                    resetForm()

                                    Swal.fire({
                                        title: response.data.title,
                                        text: response.data.message,
                                        icon: 'success',
                                        confirmButtonText: 'Fechar'
                                    }).then((result) => {
                                        setModalEditRegister(false)
                                        loadData()
                                    })

                                } catch (error) {
                                    Swal.fire({
                                        title: error.response.data.title,
                                        text: error.response.data.message,
                                        icon: 'error',
                                        confirmButtonText: 'Fechar'
                                    })
                                }
                            }}
                        >
                            {({ values, errors, touched, setFieldValue }) => (
                                <Form className="tooltip-end-bottom mt-4">
                           
                                    <div className="mb-3 form-group tooltip-end-top">
                                        <div className='label'> Tipo </div>
                                        <ReactSelect
                                            placeholder=""
                                            classNamePrefix="react-select"
                                            options={type}
                                            value={type.filter(option => option.value === values.vehicle_type_id)}
                                            onChange={e => setFieldValue('vehicle_type_id', e.value)}
                                        />
                                        {errors.icon && touched.icon && <div className="d-block invalid-tooltip">{errors.icon}</div>}
                                    </div>


                                    <div className="mb-3 form-group tooltip-end-top">
                                        <div className='label'> Status </div>
                                        <ReactSelect
                                            placeholder=""
                                            classNamePrefix="react-select"
                                            options={status}
                                            value={status.filter(option => option.value === values.vehicle_status_id)}
                                            onChange={e => setFieldValue('vehicle_status_id', e.value)}
                                        />
                                        {errors.icon && touched.icon && <div className="d-block invalid-tooltip">{errors.icon}</div>}
                                    </div>

                                    <Row>
                                        <Col xs={6}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Placa </div>
                                                <Field className="form-control" disabled={values.loading} type="text" name="plate" value={values.plate} />
                                                {errors.plate && touched.plate && <div className="d-block invalid-tooltip">{errors.plate}</div>}
                                            </div>
                                        </Col>

                                        <Col xs={6}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Renavam </div>
                                                <Field className="form-control" disabled={values.loading} type="text" name="renavam" value={values.renavam} />
                                                {errors.renavam && touched.renavam && <div className="d-block invalid-tooltip">{errors.renavam}</div>}
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={6}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Modelo </div>
                                                <Field className="form-control" disabled={values.loading} type="text" name="model" value={values.model} />
                                                {errors.model && touched.model && <div className="d-block invalid-tooltip">{errors.model}</div>}
                                            </div>
                                        </Col>

                                        <Col xs={6}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Fabricante </div>
                                                <Field className="form-control" disabled={values.loading} type="text" name="manufacturer" value={values.manufacturer} />
                                                {errors.manufacturer && touched.manufacturer && <div className="d-block invalid-tooltip">{errors.manufacturer}</div>}
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={4}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Ano </div>
                                                <Field className="form-control" disabled={values.loading} type="text" name="year" value={values.year} />
                                                {errors.year && touched.year && <div className="d-block invalid-tooltip">{errors.year}</div>}
                                            </div>
                                        </Col>

                                        <Col xs={4}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Combustível </div>
                                                <Field className="form-control" disabled={values.loading} type="text" name="fuel" value={values.fuel} />
                                                {errors.fuel && touched.fuel && <div className="d-block invalid-tooltip">{errors.fuel}</div>}
                                            </div>
                                        </Col>

                                        <Col xs={4}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Cor </div>
                                                <Field className="form-control" disabled={values.loading} type="text" name="color" value={values.color} />
                                                {errors.color && touched.color && <div className="d-block invalid-tooltip">{errors.color}</div>}
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={6}>
                                            <div className="mb-3 form-group ">
                                                <div className='label'> Capacidade KG </div>
                                                <Field className="form-control" disabled={values.loading} type="text" name="capacity_kg" value={values.capacity_kg} />
                                                {errors.capacity_kg && touched.capacity_kg && <div className="d-block invalid-tooltip">{errors.capacity_kg}</div>}
                                            </div>
                                        </Col>

                                        <Col xs={6}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Capacidade m²</div>
                                                <Field className="form-control" disabled={values.loading} type="text" name="capacity_m" value={values.capacity_m} />
                                                {errors.capacity_m && touched.capacity_m && <div className="d-block invalid-tooltip">{errors.capacity_m}</div>}
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Carroceria</div>
                                                <Field className="form-control" disabled={values.loading} type="text" name="bodywork" value={values.bodywork} />
                                                {errors.bodywork && touched.bodywork && <div className="d-block invalid-tooltip">{errors.bodywork}</div>}
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={4}>
                                            <div className="mb-3 form-group ">
                                                <div className='label'> IPVA </div>
                                                <DatePicker
                                                    locale={pt}
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    selected={values.ipva}
                                                    onChange={e => setFieldValue('ipva', e)}
                                                    startDate={values.ipva}
                                                />
                                                {errors.ipva && touched.ipva && <div className="d-block invalid-tooltip">{errors.ipva}</div>}
                                            </div>
                                        </Col>

                                        <Col xs={4}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> DPVAT</div>
                                                <DatePicker
                                                    locale={pt}
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    selected={values.dpvat}
                                                    onChange={e => setFieldValue('dpvat', e)}
                                                    startDate={values.dpvat}
                                                />
                                                {errors.dpvat && touched.dpvat && <div className="d-block invalid-tooltip">{errors.dpvat}</div>}
                                            </div>
                                        </Col>

                                        <Col xs={4}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Licenciamento </div>
                                                <DatePicker
                                                    locale={pt}
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    selected={values.licensing}
                                                    onChange={e => setFieldValue('licensing', e)}
                                                    startDate={values.licensing}
                                                />
                                                {errors.licensing && touched.licensing && <div className="d-block invalid-tooltip">{errors.licensing}</div>}
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Descrição </div>
                                                <Field className="form-control" disabled={values.loading} type="text" name="description" value={values.description} />
                                                {errors.description && touched.description && <div className="d-block invalid-tooltip">{errors.description}</div>}
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="d-grid gap-2 mb-3 mt-4">
                                        <Button
                                            variant="success"
                                            type="submit"
                                            disabled={values.loading}
                                        >
                                            {values.loading
                                                ? <Spinner as="span" animation="border" size="sm" />
                                                : <>Editar</>
                                            }
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    }


                </Modal.Body>
            </Modal>
            {/* MODAL EDIT REGISTER */}

            {/* MODAL VIEW */}
            <Modal
                show={modalViewRegister}
                size='xl'
                centered
                onHide={() => setModalViewRegister(false)}
            >
                <Modal.Body>
                    <Row>
                        <Col xs={11}>
                            &nbsp;
                        </Col>
                        <Col xs={1}>
                            <div className='d-flex justify-content-end cursor-pointer' onClick={() => setModalViewRegister(false)}>
                                <CsLineIcons icon="close" className="text-primary" size={20} />
                            </div>
                        </Col>
                    </Row>

                    <h4>Visualizar</h4>

                    <Row>
                        <Col xs={12} className="mt-4">
                            <span className='text-primary'><b>Model:</b> </span> {idData.model} / {idData.manufacturer}
                        </Col>

                        <Col xs={6} className="mt-4">
                            <span className='text-primary'><b>Status:</b> </span>
                            <CsLineIcons stroke={idData?.vehicle_status?.color} icon={idData?.vehicle_status?.icon} className='text-info' size={15} /> &nbsp;
                            {idData?.vehicle_status?.name}
                        </Col>

                        <Col xs={6} className="mt-4">
                            <span className='text-primary'><b>Tipo:</b> </span>
                            <CsLineIcons stroke={idData?.vehicle_type?.color} icon={idData?.vehicle_type?.icon} className='text-info' size={15} /> &nbsp;
                            {idData?.vehicle_type?.name}
                        </Col>

                        <Col xs={6} className="mt-4">
                            <span className='text-primary'><b>Model:</b> </span> {idData.model} / {idData.manufacturer}
                        </Col>

                        <Col xs={4} className="mt-4">
                            <span className='text-primary'><b>Placa:</b> </span> {idData.plate}
                        </Col>

                        <Col xs={4} className="mt-4">
                            <span className='text-primary'><b>Renavam:</b> </span> {idData.renavam}
                        </Col>

                        <Col xs={4} className="mt-4">
                            <span className='text-primary'><b>IPVA:</b> </span> {idData.ipva}
                        </Col>

                        <Col xs={4} className="mt-4">
                            <span className='text-primary'><b>Ano:</b> </span> {idData.year}
                        </Col>

                        <Col xs={4} className="mt-4">
                            <span className='text-primary'><b>Cor:</b> </span> {idData.color}
                        </Col>

                        <Col xs={4} className="mt-4">
                            <span className='text-primary'><b>Combustível:</b> </span> {idData.fuel}
                        </Col>

                        <Col xs={6} className="mt-4">
                            <span className='text-primary'><b>Capacidade KG:</b> </span> {idData.capacity_kg}
                        </Col>

                        <Col xs={6} className="mt-4">
                            <span className='text-primary'><b>Capacidade m²:</b> </span> {idData.capacity_m}
                        </Col>

                        <Col xs={4} className="mt-4">
                            <span className='text-primary'><b>Carroceria:</b> </span> {idData.bodywork}
                        </Col>

                        <Col xs={12} className="mt-4">
                            <span className='text-primary'><b>Descrição:</b> </span> <br />
                            <div style={{ marginLeft: 20 }}>
                                {idData.description}
                            </div>
                        </Col>
                    </Row>

                </Modal.Body>
            </Modal>
            {/* MODAL VIEW */}
        </>
    );
};

export default Component;
