/* eslint-disable react-hooks/exhaustive-deps */
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
import { Field, Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { SketchPicker } from 'react-color';
import ReactSelect from 'react-select';
import axios from 'axios';


const Component = () => {

    const title = 'Listar';
    const description = 'Listar';

    const breadcrumbs = [
        { to: '', text: 'Home' },
        { to: 'list', text: 'Ordens de coleta' },
        { to: '', text: 'Listar' },
    ]

    const columns = [
        { name: 'Ordem', acessor: 'order', column: 'order' },
        { name: 'Empresa', acessor: 'organization', column: 'organization', format: 'organization' },
        { name: 'Status', acessor: 'status', column: 'status', format: 'collection_order_status' },
        { name: 'Tipo', acessor: 'type', column: 'type', format: 'collection_order_type' },
        { name: 'Data', acessor: 'created_at', column: 'created_at' },
        { name: '', acessor: 'custom', column: 'custom' },
    ]

    const [collectionOrderType, setCollectionOrderType] = useState([])
    const [collectionOrderStatus, setCollectionOrderStatus] = useState([])
    const [drivers, setDrivers] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [organizations, setOrganizations] = useState([])
    const [addressType, setAddressType] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalNewRegister, setModalNewRegister] = useState(false)
    const [limit, setLimit] = useState(10)
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
    const [dataContent, setDataContent] = useState(false)
    const [modalView, setModalView] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalPrevision, setModalPrevision] = useState(false)

    const [viewInteractions, setViewInteractions] = useState(false)

    const getParams = async () => {
        try {
            const response = await api.get(`/api/v1/private/collection_order_type?limit=100`)
            let array_collection_order_type = []
            response.data.data.map((row) => {
                array_collection_order_type.push({
                    label: row.name,
                    value: row.id
                })
            })
            setCollectionOrderType(array_collection_order_type)
        } catch (error) {
        }

        try {
            const response = await api.get(`/api/v1/private/collection_order_status?limit=100`)
            let array_collection_order_status = []
            response.data.data.map((row) => {
                array_collection_order_status.push({
                    label: row.name,
                    value: row.id
                })
            })
            setCollectionOrderStatus(array_collection_order_status)
        } catch (error) {
        }

        try {
            const response = await api.get(`/api/v1/private/drivers?limit=100`)
            let array_drivers = []
            response.data.data.map((row) => {
                array_drivers.push({
                    label: row.name,
                    value: row.id
                })
            })
            setDrivers(array_drivers)
        } catch (error) {
        }

        try {
            const response = await api.get(`/api/v1/private/vehicles?limit=100`)
            let array_vehicles = []
            response.data.data.map((row) => {
                array_vehicles.push({
                    label: `(${row.plate}) ${row.model} - ${row.manufacturer}`,
                    value: row.id
                })
            })
            setVehicles(array_vehicles)
        } catch (error) {
        }

        try {
            const response = await api.get(`/api/v1/private/organizations?limit=100`)
            let array_organizations = []
            response.data.data.map((row) => {
                array_organizations.push({
                    label: row.social_name,
                    value: row.id
                })
            })
            setOrganizations(array_organizations)
        } catch (error) {
        }

        try {
            const response = await api.get(`/api/v1/private/address_type?limit=100`)
            let array_address_type = []
            response.data.data.map((row) => {
                array_address_type.push({
                    label: row.name,
                    value: row.id
                })
            })
            setAddressType(array_address_type)
        } catch (error) {
        }
    }

    useEffect(() => {
        if (collectionOrderType.length === 0 && collectionOrderStatus.length === 0) {
            getParams()
        }
    }, [])

    const loadData = async (pageLimit, page) => {
        document.body.classList.add('spinner')

        pageLimit = limit

        try {
            let url = `/api/v1/private/collection_order?order=${orderBy}&limit=${pageLimit}&page=${page}&search=${searchField}`

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
                            Nova ordem de coleta <CsLineIcons icon="plus" />
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
                                                                                <Button onClick={() => callView(row)} variant="outline-warning" className="btn-icon btn-icon-only mb-1">
                                                                                    <CsLineIcons icon="eye" />
                                                                                </Button>&nbsp;

                                                                                <Button onClick={() => callEdit(row)} variant="outline-info" className="btn-icon btn-icon-only mb-1">
                                                                                    <CsLineIcons icon="edit" />
                                                                                </Button>&nbsp;

                                                                                <Button onClick={() => callArchiveOrder(row)} variant="outline-success" className="btn-icon btn-icon-only mb-1">
                                                                                    <CsLineIcons icon="check" />
                                                                                </Button>

                                                                                <Button onClick={() => callSetPrevision(row)} variant="outline-danger" className="btn-icon btn-icon-only mb-1">
                                                                                    <CsLineIcons icon="calendar" />
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

    const ChangeZipCode = () => {
        const { values, setFieldValue } = useFormikContext();
        React.useEffect(() => {
            if (values?.address_from?.zip_code && values?.address_from?.zip_code.length >= 8 && !values?.address_from?.address) {
                axios.get(`https://viacep.com.br/ws/${values.address_from.zip_code}/json/`).then((response) => {
                    setFieldValue('address_from.address', response.data.logradouro)
                    setFieldValue('address_from.city', response.data.localidade)
                    setFieldValue('address_from.district', response.data.bairro)
                    setFieldValue('address_from.state', response.data.uf)
                })
            }

            if (values?.address_to?.zip_code && values?.address_to?.zip_code.length >= 8 && !values?.address_to?.address) {
                axios.get(`https://viacep.com.br/ws/${values.address_to.zip_code}/json/`).then((response) => {
                    setFieldValue('address_to.address', response.data.logradouro)
                    setFieldValue('address_to.city', response.data.localidade)
                    setFieldValue('address_to.district', response.data.bairro)
                    setFieldValue('address_to.state', response.data.uf)
                })
            }
        }, [values])
        return null
    }

    const callView = async (row) => {
        setDataContent(row)
        setModalView(true)
    }

    const toogleInteraction = () => {
        setViewInteractions(!viewInteractions)
    }

    const callEdit = async (row) => {
        setDataContent(row)
        setModalEdit(true)
    }

    const callArchiveOrder = async (row) => {
        Swal.fire({
            title: 'Tem certeza que deseja arquivar esta ordem?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Sim',
            confirmButtonColor: '#80D946',
            denyButtonText: `Não`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await api.post(`/api/v1/private/archive_order/close/${row.id}`)
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

    const callSetPrevision = async (row) => {
        setDataContent(row)
        setModalPrevision(true)
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


            {/* NEW */}
            <Modal
                show={modalNewRegister}
                size='lg'
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
                            collection_order_type_id: false,
                            collection_order_status_id: false,
                            organization_id: false,
                            vehicle_id: false,
                            driver_id: false,
                            address_from: {
                                address_type_id: false,
                                address: '',
                                zip_code: '',
                                city: '',
                                district: '',
                                number: '',
                                complement: '',
                                state: ''
                            },
                            address_to: {
                                address_type_id: false,
                                address: '',
                                zip_code: '',
                                city: '',
                                district: '',
                                number: '',
                                complement: '',
                                state: ''
                            }
                        }}

                        onSubmit={async (values, { resetForm }) => {
                            try {
                                const response = await api.post(`/api/v1/private/collection_order`, {
                                    collection_order_type_id: values.collection_order_type_id,
                                    collection_order_status_id: values.collection_order_status_id,
                                    organization_id: values.organization_id,
                                    vehicle_id: values.vehicle_id,
                                    driver_id: values.driver_id,
                                    address_from: values.address_from,
                                    address_to: values.address_to
                                })

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
                            <Form className="mt-4">
                                <Row>
                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Tipo </div>
                                            <ReactSelect
                                                placeholder=""
                                                classNamePrefix="react-select"
                                                options={collectionOrderType}
                                                value={collectionOrderType.filter(option => option.value === values.collection_order_type_id)}
                                                onChange={e => setFieldValue('collection_order_type_id', e.value)}
                                            />
                                            {errors.collection_order_type_id && touched.collection_order_type_id && <div className="d-block invalid-tooltip">{errors.collection_order_type_id}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Status </div>
                                            <ReactSelect
                                                placeholder=""
                                                classNamePrefix="react-select"
                                                options={collectionOrderStatus}
                                                value={collectionOrderStatus.filter(option => option.value === values.collection_order_status_id)}
                                                onChange={e => setFieldValue('collection_order_status_id', e.value)}
                                            />
                                            {errors.collection_order_status_id && touched.collection_order_status_id && <div className="d-block invalid-tooltip">{errors.collection_order_status_id}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={12}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Empresa </div>
                                            <ReactSelect
                                                placeholder=""
                                                classNamePrefix="react-select"
                                                options={organizations}
                                                value={organizations.filter(option => option.value === values.organization_id)}
                                                onChange={e => setFieldValue('organization_id', e.value)}
                                            />
                                            {errors.organization_id && touched.organization_id && <div className="d-block invalid-tooltip">{errors.organization_id}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Veículo </div>
                                            <ReactSelect
                                                placeholder=""
                                                classNamePrefix="react-select"
                                                options={vehicles}
                                                value={vehicles.filter(option => option.value === values.vehicle_id)}
                                                onChange={e => setFieldValue('vehicle_id', e.value)}
                                            />
                                            {errors.vehicle_id && touched.vehicle_id && <div className="d-block invalid-tooltip">{errors.vehicle_id}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Motorista </div>
                                            <ReactSelect
                                                placeholder=""
                                                classNamePrefix="react-select"
                                                options={drivers}
                                                value={drivers.filter(option => option.value === values.driver_id)}
                                                onChange={e => setFieldValue('driver_id', e.value)}
                                            />
                                            {errors.driver_id && touched.driver_id && <div className="d-block invalid-tooltip">{errors.driver_id}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <Row className='mb-2 mt-2'>
                                    <Col xs={12}>
                                        <div className='text-primary h-100 mt-1'>
                                            <h5>Endereço de retirada</h5>
                                        </div>
                                    </Col>
                                </Row>

                                {/* FROM */}
                                <Row style={{ border: '1px solid #616161', padding: 5, margin: 5, borderRadius: '6px' }}>
                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Tipo de endereço </div>
                                            <ReactSelect
                                                placeholder=""
                                                classNamePrefix="react-select"
                                                options={addressType}
                                                value={addressType.filter(option => option.value === values.address_from?.address_type_id)}
                                                onChange={e => setFieldValue('address_from.address_type_id', e.value)}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> CEP </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values.address_from?.zip_code}
                                                onChange={e => setFieldValue('address_from.zip_code', e.target.value)}
                                            />
                                            <ChangeZipCode />
                                        </div>
                                    </Col>

                                    <Col xs={12}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Endereço </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values?.address_from?.address}
                                                onChange={e => setFieldValue('address_from.address', e.target.value)}
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Bairro </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values?.address_from?.district}
                                                onChange={e => setFieldValue('address_from.district', e.target.value)}
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Cidade </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values?.address_from?.city}
                                                onChange={e => setFieldValue('address_from.city', e.target.value)}
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Estado </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values?.address_from?.state}
                                                onChange={e => setFieldValue('address_from.state', e.target.value)}
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={3}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Número </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values?.address_from?.number}
                                                onChange={e => setFieldValue('address_from.number', e.target.value)}
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={9}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Complemento </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values?.address_from?.complement}
                                                onChange={e => setFieldValue('address_from.complement', e.target.value)}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                {/* FROM */}


                                <Row className='mb-2 mt-2'>
                                    <Col xs={12}>
                                        <div className='text-primary h-100 mt-1'>
                                            <h5>Endereço de destino</h5>
                                        </div>
                                    </Col>
                                </Row>

                                {/* TO */}
                                <Row style={{ border: '1px solid #616161', padding: 5, margin: 5, borderRadius: '6px' }}>
                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Tipo de endereço </div>
                                            <ReactSelect
                                                placeholder=""
                                                classNamePrefix="react-select"
                                                options={addressType}
                                                value={addressType.filter(option => option.value === values.address_to?.address_type_id)}
                                                onChange={e => setFieldValue('address_to.address_type_id', e.value)}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> CEP </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values.address_to?.zip_code}
                                                onChange={e => setFieldValue('address_to.zip_code', e.target.value)}
                                            />
                                            <ChangeZipCode />
                                        </div>
                                    </Col>

                                    <Col xs={12}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Endereço </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values?.address_to?.address}
                                                onChange={e => setFieldValue('address_to.address', e.target.value)}
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Bairro </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values?.address_to?.district}
                                                onChange={e => setFieldValue('address_to.district', e.target.value)}
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Cidade </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values?.address_to?.city}
                                                onChange={e => setFieldValue('address_to.city', e.target.value)}
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Estado </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values?.address_to?.state}
                                                onChange={e => setFieldValue('address_to.state', e.target.value)}
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={3}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Número </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values?.address_to?.number}
                                                onChange={e => setFieldValue('address_to.number', e.target.value)}
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={9}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Complemento </div>
                                            <Field
                                                className="form-control"
                                                disabled={values.loading}
                                                type="text"
                                                value={values?.address_to?.complement}
                                                onChange={e => setFieldValue('address_to.complement', e.target.value)}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                {/* TO */}

                                <Row className='mt-2 mb-2'>
                                    <Col xs={12}>
                                        <div className='d-flex justify-content-end align-items-end'>
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
                                    </Col>
                                </Row>

                            </Form>
                        )}
                    </Formik>

                </Modal.Body>
            </Modal>
            {/* NEW */}

            {/* VIEW */}
            <Modal
                show={modalView}
                size='lg'
                centered
                onHide={() => setModalView(false)}
            >
                <Modal.Body>
                    <Row>
                        <Col xs={10}>
                            &nbsp;
                        </Col>
                        <Col xs={2}>
                            <div className='d-flex justify-content-end cursor-pointer' onClick={() => setModalView(false)}>
                                <CsLineIcons icon="close" className="text-primary" size={20} />
                            </div>
                        </Col>
                    </Row>


                    <p>Ordem #{dataContent?.order}</p>


                    <Row>
                        <Col xs={6} className="mt-2">
                            <span className='text-primary'><b>Cliente:</b> </span> {dataContent?.organization?.social_name}
                        </Col>

                        <Col xs={6} className="mt-2">
                            <span className='text-primary'><b>CPF/CNPJ:</b> </span> {dataContent?.organization?.taxid}
                        </Col>

                        <Col xs={6} className="mt-2">
                            <span className='text-primary'><b>Status:</b> </span>
                            {dataContent?.collection_order_status?.name} &nbsp;
                            <CsLineIcons stroke={dataContent?.collection_order_status?.color} icon={dataContent?.collection_order_status?.icon} size={15} />
                        </Col>

                        <Col xs={6} className="mt-2">
                            <span className='text-primary'><b>Tipo:</b> </span>
                            {dataContent?.collection_order_type?.name} &nbsp;
                            <CsLineIcons stroke={dataContent?.collection_order_type?.color} icon={dataContent?.collection_order_type?.icon} size={15} />
                        </Col>

                        <Col xs={6} className="mt-2">
                            <span className='text-primary'><b>Motorista:</b> </span> {dataContent?.driver?.name} ({dataContent?.driver?.category} )
                        </Col>

                        <Col xs={6} className="mt-2">
                            <span className='text-primary'><b>Veículo:</b> </span> {dataContent?.vehicle?.model} ({dataContent?.vehicle?.plate} )
                        </Col>
                    </Row>

                    <Row className='mt-2' style={{ border: '1px solid #616161', padding: 5, margin: 2, borderRadius: '6px' }}>
                        <Col xs={12} className="mt-2">
                            <span className='text-primary'><b>Retirada:</b> </span>
                        </Col>
                        <Col xs={12} className="mt-2">
                            <span className='text-primary'><b>CEP:</b> </span> {dataContent?.to_address?.zip_code}
                        </Col>

                        <Col xs={12} className="mt-2">
                            <span className='text-primary'><b>Endereço:</b> </span> {dataContent?.to_address?.address}
                        </Col>

                        <Col xs={4} className="mt-2">
                            <span className='text-primary'><b>Bairro:</b> </span> {dataContent?.to_address?.district}
                        </Col>

                        <Col xs={4} className="mt-2">
                            <span className='text-primary'><b>Cidade:</b> </span> {dataContent?.to_address?.city}
                        </Col>

                        <Col xs={4} className="mt-2">
                            <span className='text-primary'><b>Estado:</b> </span> {dataContent?.to_address?.state}
                        </Col>

                        <Col xs={12} className="mt-2">
                            <span className='text-primary'><b>Complemento:</b> </span> {dataContent?.to_address?.complement}
                        </Col>

                        <Col xs={4} className="mt-2">
                            <span className='text-primary'><b>Número:</b> </span> {dataContent?.to_address?.number}
                        </Col>

                        <Col xs={12} className="mt-2">
                            <span className='text-primary'><b>Observações:</b> </span> {dataContent?.to_address?.observation}
                        </Col>
                    </Row>

                    <Row className='mt-2' style={{ border: '1px solid #616161', padding: 5, margin: 2, borderRadius: '6px' }}>
                        <Col xs={12} className="mt-2">
                            <span className='text-primary'><b>Envio:</b> </span>
                        </Col>
                        <Col xs={12} className="mt-2">
                            <span className='text-primary'><b>CEP:</b> </span> {dataContent?.from_address?.zip_code}
                        </Col>

                        <Col xs={12} className="mt-2">
                            <span className='text-primary'><b>Endereço:</b> </span> {dataContent?.from_address?.address}
                        </Col>

                        <Col xs={4} className="mt-2">
                            <span className='text-primary'><b>Bairro:</b> </span> {dataContent?.from_address?.district}
                        </Col>

                        <Col xs={4} className="mt-2">
                            <span className='text-primary'><b>Cidade:</b> </span> {dataContent?.from_address?.city}
                        </Col>

                        <Col xs={4} className="mt-2">
                            <span className='text-primary'><b>Estado:</b> </span> {dataContent?.from_address?.state}
                        </Col>

                        <Col xs={12} className="mt-2">
                            <span className='text-primary'><b>Complemento:</b> </span> {dataContent?.from_address?.complement}
                        </Col>

                        <Col xs={4} className="mt-2">
                            <span className='text-primary'><b>Número:</b> </span> {dataContent?.from_address?.number}
                        </Col>

                        <Col xs={12} className="mt-2">
                            <span className='text-primary'><b>Observações:</b> </span> {dataContent?.from_address?.observation}
                        </Col>
                    </Row>

                    <h4 className='mt-2 pt-2'>Interações</h4>

                    {dataContent && dataContent.interactions.length === 0
                        ? <Row className="g-2 mb-5">
                            <Col sm="12" xxl="12">
                                <Card className="sh-19">
                                    <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                                        <CsLineIcons icon="warning-hexagon" className="text-warning" size={50} />
                                        <p className="heading mb-0">
                                            Nenhuma interação aqui ainda
                                        </p>

                                        <p className="text-medium mb-0 text-muted">
                                            Você pode interagir com este tópico no clicando logo abaixo
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        : <></>
                    }

                    {dataContent && dataContent?.interactions.map((row, index) => {
                        let extra = row.extra && Object.keys(row.extra[0])

                        return (
                            <Row key={index} className='mt-2' style={{ border: '1px solid #616161', padding: 5, margin: 2, borderRadius: '6px' }}>
                                {row.extra
                                    ? <>
                                        <Col xs={12} className="mt-2">
                                            {extra.map((r, i) => {
                                                return <span key={r}>
                                                    {row.extra[0][r]}
                                                </span>
                                            })}

                                            <div style={{ fontSize: 10, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }} className='text-right'>
                                                {row.created_at}
                                            </div>

                                        </Col>
                                    </>
                                    : <>
                                        <Col xs={12} className="mt-2">
                                            <span className='text-primary'><b>Nome:</b> </span> {row.owner.name}
                                        </Col>

                                        <Col xs={12} className="mt-2">
                                            <span className='text-primary'><b>Mensagem:</b> </span> {row.description}
                                        </Col>

                                        <div style={{ fontSize: 10, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }} className='text-right'>
                                            {row.created_at}
                                        </div>
                                    </>
                                }
                            </Row>
                        )
                    })}


                    {!viewInteractions
                        ? <Row className='mt-4'>
                            <Col xs={12}>
                                <div className='d-flex justify-content-end align-items-end'>
                                    <Button
                                        variant="info"
                                        type="submit"
                                        disabled={loading}
                                        onClick={() => toogleInteraction()}
                                    >
                                        Adicionar interação
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        : <>


                            <Formik
                                initialValues={{
                                    description: '',
                                    collection_order_id: dataContent?.id,
                                }}

                                onSubmit={async (values, { resetForm }) => {
                                    try {
                                        const response = await api.post(`/api/v1/private/collection_order_interaction/${dataContent?.id}`, values)

                                        resetForm()

                                        Swal.fire({
                                            title: response.data.title,
                                            text: response.data.message,
                                            icon: 'success',
                                            confirmButtonText: 'Fechar'
                                        }).then((result) => {
                                            setModalView(false)
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
                                        <div className="mb-3  form-group tooltip-end-top">
                                            <div className='label'> Descrição </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="description" value={values.description} />
                                            {errors.description && touched.description && <div className="d-block invalid-tooltip">{errors.description}</div>}
                                        </div>


                                        <div className="d-grid gap-2 mb-3 mt-4">
                                            <Button
                                                variant="info"
                                                type="submit"
                                                disabled={values.loading}
                                            >
                                                {values.loading
                                                    ? <Spinner as="span" animation="border" size="sm" />
                                                    : <>Adicionar interação</>
                                                }
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        </>
                    }

                </Modal.Body>
            </Modal>
            {/* VIEW */}

            {/* EDIT */}
            <Modal
                show={modalEdit}
                size='md'
                centered
                onHide={() => setModalEdit(false)}
            >
                <Modal.Body>

                    <Row>
                        <Col xs={11}>
                            &nbsp;
                        </Col>
                        <Col xs={1}>
                            <div className='d-flex justify-content-end cursor-pointer' onClick={() => setModalEdit(false)}>
                                <CsLineIcons icon="close" className="text-primary" size={20} />
                            </div>
                        </Col>
                    </Row>

                    <h4>Editar ordem de coleta</h4>

                    <Formik
                        initialValues={{
                            collection_order_type_id: dataContent.collection_order_type_id ? dataContent.collection_order_type_id : false,
                            collection_order_status_id: dataContent.collection_order_status_id ? dataContent.collection_order_status_id : false,
                            vehicle_id: dataContent.vehicle_id ? dataContent.vehicle_id : false,
                            driver_id: dataContent.driver_id ? dataContent.driver_id : false,
                        }}

                        onSubmit={async (values, { resetForm }) => {
                            try {
                                const response = await api.post(`/api/v1/private/collection_order/${dataContent.id}`, {
                                    collection_order_type_id: values.collection_order_type_id,
                                    collection_order_status_id: values.collection_order_status_id,
                                    organization_id: values.organization_id,
                                    vehicle_id: values.vehicle_id,
                                    driver_id: values.driver_id,
                                })

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
                            <Form className="mt-4">
                                <Row>
                                    <Col xs={12}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Tipo </div>
                                            <ReactSelect
                                                placeholder=""
                                                classNamePrefix="react-select"
                                                options={collectionOrderType}
                                                value={collectionOrderType.filter(option => option.value === values.collection_order_type_id)}
                                                onChange={e => setFieldValue('collection_order_type_id', e.value)}
                                            />
                                            {errors.collection_order_type_id && touched.collection_order_type_id && <div className="d-block invalid-tooltip">{errors.collection_order_type_id}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={12}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Status </div>
                                            <ReactSelect
                                                placeholder=""
                                                classNamePrefix="react-select"
                                                options={collectionOrderStatus}
                                                value={collectionOrderStatus.filter(option => option.value === values.collection_order_status_id)}
                                                onChange={e => setFieldValue('collection_order_status_id', e.value)}
                                            />
                                            {errors.collection_order_status_id && touched.collection_order_status_id && <div className="d-block invalid-tooltip">{errors.collection_order_status_id}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={12}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Veículo </div>
                                            <ReactSelect
                                                placeholder=""
                                                classNamePrefix="react-select"
                                                options={vehicles}
                                                value={vehicles.filter(option => option.value === values.vehicle_id)}
                                                onChange={e => setFieldValue('vehicle_id', e.value)}
                                            />
                                            {errors.vehicle_id && touched.vehicle_id && <div className="d-block invalid-tooltip">{errors.vehicle_id}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={12}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Motorista </div>
                                            <ReactSelect
                                                placeholder=""
                                                classNamePrefix="react-select"
                                                options={drivers}
                                                value={drivers.filter(option => option.value === values.driver_id)}
                                                onChange={e => setFieldValue('driver_id', e.value)}
                                            />
                                            {errors.driver_id && touched.driver_id && <div className="d-block invalid-tooltip">{errors.driver_id}</div>}
                                        </div>
                                    </Col>

                                </Row>



                                <Row className='mt-2 mb-2'>
                                    <Col xs={12}>
                                        <div className='d-flex justify-content-end align-items-end'>
                                            <Button
                                                variant="success"
                                                type="submit"
                                                disabled={values.loading}
                                            >
                                                {values.loading
                                                    ? <Spinner as="span" animation="border" size="sm" />
                                                    : <>Atualizar</>
                                                }
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>

                            </Form>
                        )}
                    </Formik>


                </Modal.Body>
            </Modal>
            {/* EDIT */}

            {/* VIEW */}
            <Modal
                show={modalPrevision}
                size='md'
                centered
                onHide={() => setModalPrevision(false)}
            >
                <Modal.Body>
                    <Row>
                        <Col xs={10}>
                            &nbsp;
                        </Col>
                        <Col xs={2}>
                            <div className='d-flex justify-content-end cursor-pointer' onClick={() => setModalPrevision(false)}>
                                <CsLineIcons icon="close" className="text-primary" size={20} />
                            </div>
                        </Col>
                    </Row>

                    <Row className="g-2 mb-5">
                        <Col sm="12" xxl="12">
                            <Card className="sh-19">
                                <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                                    <CsLineIcons icon="warning-hexagon" className="text-warning" size={50} />
                                    <p className="heading mb-0">
                                        Atenção!
                                    </p>

                                    <p className="text-medium mb-0 text-muted">
                                        Verique as informações antes de salvar
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Formik
                        initialValues={{
                            
                            prevision: dataContent.prevision ? new Date(new Date(dataContent.prevision ).setDate(new Date(dataContent.prevision).getDate() + 1)) : '',

                        }}

                        onSubmit={async (values, { resetForm }) => {
                            values.prevision = moment(values.licensing).format('YYYY-MM-DD')

                            try {
                                const response = await api.post(`/api/v1/private/order/prevision/${dataContent.id}`, {
                                    prevision: values.prevision,
                                })

                                resetForm()

                                Swal.fire({
                                    title: response.data.title,
                                    text: response.data.message,
                                    icon: 'success',
                                    confirmButtonText: 'Fechar'
                                }).then((result) => {
                                    setModalPrevision(false)
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
                            <Form className="mt-4">
                                <Row>
                                    <Col xs={12}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Previsão </div>
                                           
                                            <DatePicker
                                                locale={pt}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                selected={values?.prevision}
                                                onChange={e => setFieldValue('prevision', e)}
                                                startDate={values?.prevision}
                                            />
                                            {errors.prevision && touched.prevision && <div className="d-block invalid-tooltip">{errors.prevision}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <Row className='mt-2 mb-2'>
                                    <Col xs={12}>
                                        <div className='d-flex justify-content-end align-items-end'>
                                            <Button
                                                variant="info"
                                                type="submit"
                                                disabled={values.loading}
                                            >
                                                {values.loading
                                                    ? <Spinner as="span" animation="border" size="sm" />
                                                    : <>Atualizar</>
                                                }
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Component;
