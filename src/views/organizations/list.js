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
import axios from 'axios';


const Component = () => {
    const title = 'Empresas';
    const description = 'Empresas';

    const breadcrumbs = [
        { to: '', text: 'Home' },
        { to: 'list', text: 'Empresas' },
    ]

    const columns = [
        { name: 'Id', acessor: 'id', column: 'id' },
        { name: 'Razão social', acessor: 'social_name', column: 'social_name' },
        { name: 'CPF/CNPJ', acessor: 'taxid', column: 'taxid' },
        { name: 'Status', acessor: '', column: '', format: 'organization_status' },
        { name: 'Tipo', acessor: '', column: '', format: 'organization_type' },
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
    const [numAddresses, setNumAddresses] = useState(0)
    const [numContacts, setNumContacts] = useState(0)

    const loadData = async (pageLimit, page) => {
        document.body.classList.add('spinner')

        pageLimit = limit

        try {
            let url = `/api/v1/private/organizations?order=${orderBy}&limit=${pageLimit}&page=${page}&search=${searchField}`

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

    const [status, setStatus] = useState([])
    const [type, setType] = useState([])
    const [addressType, setAddressType] = useState([])
    const [emailType, setEmailType] = useState([])
    const [contactType, setContactType] = useState([])
    const [phoneType, setPhoneType] = useState([])

    const [addressesArray, setAddressesArray] = useState([])
    const [contactArray, setContactArray] = useState([])

    const getParams = async () => {
        try {
            const response = await api.get(`/api/v1/private/organization_status?limit=100`)
            let array_organization_status = []
            response.data.data.map((row) => {
                array_organization_status.push({
                    label: row.name,
                    value: row.id
                })
            })
            setStatus(array_organization_status)
        } catch (error) { }

        try {
            const response = await api.get(`/api/v1/private/organization_type?limit=100`)
            let array_organization_type = []
            response.data.data.map((row) => {
                array_organization_type.push({
                    label: row.name,
                    value: row.id
                })
            })
            setType(array_organization_type)
        } catch (error) { }

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
        } catch (error) { }

        try {
            const response = await api.get(`/api/v1/private/email_type?limit=100`)
            let array_email_type = []
            response.data.data.map((row) => {
                array_email_type.push({
                    label: row.name,
                    value: row.id
                })
            })
            setEmailType(array_email_type)
        } catch (error) { }

        try {
            const response = await api.get(`/api/v1/private/contact_type?limit=100`)
            let array_contact_type = []
            response.data.data.map((row) => {
                array_contact_type.push({
                    label: row.name,
                    value: row.id
                })
            })
            setContactType(array_contact_type)
        } catch (error) { }

        try {
            const response = await api.get(`/api/v1/private/phone_type?limit=100`)
            let array_phone_type = []
            response.data.data.map((row) => {
                array_phone_type.push({
                    label: row.name,
                    value: row.id
                })
            })
            setPhoneType(array_phone_type)
        } catch (error) { }
    }

    useEffect(() => {
        if (status.length === 0 && type.length === 0) {
            getParams()
        }
    }, [])

    const setAddressesInput = async (i, field, value) => {
        if (field === 'CEP') {
            if (value.length >= 8) {
                axios.get(`https://viacep.com.br/ws/${value}/json/`).then((response) => {
                    if (response.data.logradouro) {
                        setAddressesInput(i, 'Endereco', response.data.logradouro)
                    }

                    let newArr = [...addressesArray]

                    newArr[i] = {
                        city: response.data.localidade ? response.data.localidade : newArr[i].city,
                        state: response.data.uf ? response.data.uf : newArr[i].state,
                        district: response.data.bairro ? response.data.bairro : newArr[i].district,
                        address: response.data.logradouro ? response.data.logradouro : newArr[i].address,
                        number: newArr[i].number,
                        address_type_id: newArr[i].address_type_id,
                        zip_code: newArr[i].zip_code,
                        complement: newArr[i].complement,
                        observations: newArr[i].observations,
                    }

                    setAddressesArray(newArr)
                })
            }
        }

        if (!addressesArray[i]) {
            setAddressesArray(oldAddresses => [...oldAddresses, {
                address_type_id: field === 'Tipo' ? value : '',
                zip_code: field === 'CEP' ? value : '',
                address: field === 'Endereco' ? value : '',
                state: field === 'Estado' ? value : '',
                city: field === 'Cidade' ? value : '',
                district: field === 'Bairro' ? value : '',
                number: field === 'Numero' ? value : '',
                complement: field === 'Complemento' ? value : '',
                observations: field === 'Observacoes' ? value : '',
            }])
        } else {
            let newArr = [...addressesArray]

            newArr[i] = {
                address_type_id: field === 'Tipo' ? value : newArr[i].address_type_id,
                zip_code: field === 'CEP' ? value : newArr[i].zip_code,
                address: field === 'Endereco' ? value : newArr[i].address,
                state: field === 'Estado' ? value : newArr[i].state,
                city: field === 'Cidade' ? value : newArr[i].city,
                district: field === 'Bairro' ? value : newArr[i].district,
                number: field === 'Numero' ? value : newArr[i].number,
                complement: field === 'Complemento' ? value : newArr[i].complement,
                observations: field === 'Observacoes' ? value : newArr[i].observations,
            }

            setAddressesArray(newArr)
        }
    }

    const setContactInput = async (i, field, value) => {
        if (!contactArray[i]) {

            setContactArray(oldContacts => [...oldContacts, {
                name: field === 'Nome' ? value : '',
                contact_type_id: field === 'Tipo' ? value : '',
                phones: [
                    {
                        number: field === 'Telefone' ? value : '',
                        phone_type_id: field === 'Tipo_telefone' ? value : '',
                    }
                ],
                emails: [
                    {
                        email: field === 'Email' ? value : '',
                        email_type_id: field === 'Tipo_email' ? value : '',
                    }
                ]
            }])

        } else {
            let newArr = [...contactArray]

            newArr[i] = {
                name: field === 'Nome' ? value : newArr[i].name,
                contact_type_id: field === 'Tipo' ? value : newArr[i].contact_type_id,
                phones: [
                    {
                        number: field === 'Telefone' ? value : newArr[i].phones[0].number,
                        phone_type_id: field === 'Tipo_telefone' ? value : newArr[i].phones[0].phone_type_id,
                    }
                ],
                emails: [
                    {
                        email: field === 'Email' ? value : newArr[i].emails[0].email,
                        email_type_id: field === 'Tipo_email' ? value : newArr[i].emails[0].email_type_id,
                    }
                ]
            }

            setContactArray(newArr)

        }
    }

    const [modalViewOrganization, setModalViewOrganization] = useState(false)
    const [organizationData, setOrganizationData] = useState(false)

    const callView = async (row) => {
        setModalViewOrganization(true)
        setOrganizationData(row)
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
                                                                                <Button onClick={() => callView(row)} variant="outline-success" className="btn-icon btn-icon-only mb-1">
                                                                                    <CsLineIcons icon="eye" />
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
                            social_name: '',
                            surname: '',
                            taxid: '',
                            ie: '',
                            im: '',
                            site: '',
                            organization_type_id: '',
                            organization_status_id: '',
                            addresses: [],
                            contacts: [],
                            phones: [],
                            emails: []
                        }}

                        onSubmit={async (values, { resetForm }) => {
                            try {
                                const response = await api.post(`/api/v1/private/organizations`, {
                                    social_name: values.social_name,
                                    surname: values.surname,
                                    taxid: values.taxid,
                                    ie: values.ie,
                                    im: values.im,
                                    site: values.site,
                                    organization_type_id: values.organization_type_id,
                                    organization_status_id: values.organization_status_id,
                                    addresses: addressesArray,
                                    contacts: contactArray
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

                                    setContactArray([])
                                    setAddressesArray([])
                                    setNumAddresses(0)
                                    setNumContacts(0)
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
                                <Row>
                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Tipo </div>
                                            <ReactSelect
                                                placeholder=""
                                                classNamePrefix="react-select"
                                                options={type}
                                                value={type.filter(option => option.value === values.organization_type_id)}
                                                onChange={e => setFieldValue('organization_type_id', e.value)}
                                            />
                                            {errors.organization_type_id && touched.organization_type_id && <div className="d-block invalid-tooltip">{errors.organization_type_id}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={6}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Status </div>
                                            <ReactSelect
                                                placeholder=""
                                                classNamePrefix="react-select"
                                                options={status}
                                                value={status.filter(option => option.value === values.organization_status_id)}
                                                onChange={e => setFieldValue('organization_status_id', e.value)}
                                            />
                                            {errors.organization_status_id && touched.organization_status_id && <div className="d-block invalid-tooltip">{errors.organization_status_id}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={12}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Razão Social </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="social_name" value={values.social_name} />
                                            {errors.social_name && touched.social_name && <div className="d-block invalid-tooltip">{errors.social_name}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={12}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Nome fantasia </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="surname" value={values.surname} />
                                            {errors.surname && touched.surname && <div className="d-block invalid-tooltip">{errors.surname}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> CPF/CNPJ </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="taxid" value={values.taxid} />
                                            {errors.taxid && touched.taxid && <div className="d-block invalid-tooltip">{errors.taxid}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Inscrição estadual </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="ie" value={values.ie} />
                                            {errors.ie && touched.ie && <div className="d-block invalid-tooltip">{errors.ie}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={4}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Inscrição municipal </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="im" value={values.im} />
                                            {errors.im && touched.im && <div className="d-block invalid-tooltip">{errors.im}</div>}
                                        </div>
                                    </Col>

                                    <Col xs={12}>
                                        <div className="mb-3 form-group tooltip-end-top">
                                            <div className='label'> Site </div>
                                            <Field className="form-control" disabled={values.loading} type="text" name="site" value={values.site} />
                                            {errors.site && touched.site && <div className="d-block invalid-tooltip">{errors.site}</div>}
                                        </div>
                                    </Col>
                                </Row>


                                <Row className='mb-2 mt-2'>
                                    <Col xs={6}>
                                        <div className='d-flex align-items-center h-100 mt-1'>
                                            <h5>Endereço(s)</h5>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='d-flex justify-content-end align-items-end h-100'>
                                            <Button
                                                variant="info"
                                                onClick={() => setNumAddresses(numAddresses + 1)}
                                            >
                                                Adicionar endereço
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>


                                {new Array(numAddresses).fill(0).map((_, index) => (
                                    <Row key={index} style={{ border: '1px solid #616161', padding: 5, margin: 5, borderRadius: '6px' }}>
                                        <Col xs={6}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Tipo de endereço </div>
                                                <ReactSelect
                                                    placeholder=""
                                                    classNamePrefix="react-select"
                                                    options={addressType}
                                                    value={addressType.filter(option => option.value === addressesArray[index]?.address_type_id)}
                                                    onChange={e => setAddressesInput(index, 'Tipo', e.value)}
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
                                                    value={addressesArray[index]?.zip_code}
                                                    onChange={e => [setAddressesInput(index, 'CEP', e.target.value)]}
                                                />
                                            </div>
                                        </Col>

                                        <Col xs={12}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Endereço </div>
                                                <Field
                                                    className="form-control"
                                                    disabled={values.loading}
                                                    type="text"
                                                    value={addressesArray[index]?.address}
                                                    onChange={e => setAddressesInput(index, 'Endereco', e.target.value)}
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
                                                    value={addressesArray[index]?.district}
                                                    onChange={e => setAddressesInput(index, 'Bairro', e.target.value)}
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
                                                    value={addressesArray[index]?.city}
                                                    onChange={e => setAddressesInput(index, 'Cidade', e.target.value)}
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
                                                    value={addressesArray[index]?.state}
                                                    onChange={e => setAddressesInput(index, 'Estado', e.target.value)}
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
                                                    value={addressesArray[index]?.number}
                                                    onChange={e => setAddressesInput(index, 'Numero', e.target.value)}
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
                                                    value={addressesArray[index]?.complement}
                                                    onChange={e => setAddressesInput(index, 'Complemento', e.target.value)}
                                                />
                                            </div>{ }
                                        </Col>
                                    </Row>
                                ))}

                                <Row className='mb-2 mt-2'>
                                    <Col xs={6}>
                                        <div className='d-flex align-items-center h-100 mt-1'>
                                            <h5>Contato(s)</h5>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className='d-flex justify-content-end align-items-end h-100'>
                                            <Button
                                                variant="info"
                                                onClick={() => setNumContacts(numContacts + 1)}
                                            >
                                                Adicionar contatos
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>

                                {new Array(numContacts).fill(0).map((_, index) => (
                                    <Row key={index} style={{ border: '1px solid #616161', padding: 5, margin: 5, borderRadius: '6px' }}>
                                        <Col xs={4}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Tipo de contato </div>
                                                <ReactSelect
                                                    placeholder=""
                                                    classNamePrefix="react-select"
                                                    options={contactType}
                                                    value={contactType.filter(option => option.value === contactArray[index]?.contact_type_id)}
                                                    onChange={e => setContactInput(index, 'Tipo', e.value)}
                                                />
                                            </div>
                                        </Col>


                                        <Col xs={8}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Nome </div>
                                                <Field
                                                    className="form-control"
                                                    disabled={values.loading}
                                                    type="text"
                                                    value={contactArray[index]?.name}
                                                    onChange={e => setContactInput(index, 'Nome', e.target.value)}
                                                />
                                            </div>
                                        </Col>

                                        <Col xs={4}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Tipo de telefone </div>
                                                <ReactSelect
                                                    placeholder=""
                                                    classNamePrefix="react-select"
                                                    options={phoneType}
                                                    value={phoneType.filter(option => option.value === contactArray[index]?.phones[0].phone_type_id)}
                                                    onChange={e => setContactInput(index, 'Tipo_telefone', e.value)}
                                                />
                                            </div>
                                        </Col>

                                        <Col xs={8}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Telefone </div>
                                                <Field
                                                    className="form-control"
                                                    disabled={values.loading}
                                                    type="text"
                                                    value={contactArray[index]?.phones[0].phone}
                                                    onChange={e => setContactInput(index, 'Telefone', e.target.value)}
                                                />
                                            </div>
                                        </Col>

                                        <Col xs={4}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Tipo de email </div>
                                                <ReactSelect
                                                    placeholder=""
                                                    classNamePrefix="react-select"
                                                    options={emailType}
                                                    value={emailType.filter(option => option.value === contactArray[index]?.emails[0].email_type_id)}
                                                    onChange={e => setContactInput(index, 'Tipo_email', e.value)}
                                                />
                                            </div>
                                        </Col>

                                        <Col xs={8}>
                                            <div className="mb-3 form-group tooltip-end-top">
                                                <div className='label'> Email </div>
                                                <Field
                                                    className="form-control"
                                                    disabled={values.loading}
                                                    type="text"
                                                    value={contactArray[index]?.emails[0].email}
                                                    onChange={e => setContactInput(index, 'Email', e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                ))}

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
            {/* MODAL NEW REGISTER */}


            {organizationData
                ? <>
                    <Modal
                        // className="scroll-out"
                        show={modalViewOrganization}
                        size='lg'
                        centered
                        onHide={() => setModalViewOrganization(false)}
                    >
                        <Modal.Body>
                            <Row>
                                <Col xs={11}>
                                    &nbsp;
                                </Col>
                                <Col xs={1}>
                                    <div className='d-flex justify-content-end cursor-pointer' onClick={() => setModalViewOrganization(false)}>
                                        <CsLineIcons icon="close" className="text-primary" size={20} />
                                    </div>
                                </Col>
                            </Row>


                            <Row>
                                <Col xs={12}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                        <div style={{
                                            textTransform: 'uppercase', width: 100, height: 100, borderRadius: '50%', backgroundColor: '#0C5DAF', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 40, fontWeight: 'bold', color: 'white'
                                        }}>
                                            {organizationData?.social_name[0]}{organizationData?.social_name[1]}
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className='mt-3 mb-3'>
                                <Col xs={12} className="mt-4">
                                    <span className='text-primary'><b>Razão social:</b> </span>  {organizationData?.social_name}
                                </Col>

                                <Col xs={12} className="mt-4">
                                    <span className='text-primary'><b>Nome fantasia:</b> </span>  {organizationData?.surname}
                                </Col>

                                <Col xs={4} className="mt-4">
                                    <span className='text-primary'><b>CPF/CNPF:</b> </span>  {organizationData?.taxid}
                                </Col>

                                <Col xs={4} className="mt-4">
                                    <span className='text-primary'><b>Inscrição estadual:</b> </span>  {organizationData?.ie}
                                </Col>

                                <Col xs={4} className="mt-4">
                                    <span className='text-primary'><b>Inscrição municipal:</b> </span>  {organizationData?.im}
                                </Col>

                                <Col xs={6} className="mt-4">
                                    <span className='text-primary'><b>Tipo:</b> </span>  {organizationData?.organization_type?.name}
                                </Col>

                                <Col xs={6} className="mt-4">
                                    <span className='text-primary'><b>Status:</b> </span>  {organizationData?.organization_status?.name}
                                </Col>

                                <Col xs={12} className="mt-4">
                                    <span className='text-primary'><b>Site:</b> </span>  <a href={`${organizationData?.site}`} target="_blank">{organizationData?.site}</a>
                                </Col>
                            </Row>


                            <h5>Endereço(s)</h5>

                            {organizationData.address_list
                                ? <Row className='mb-3 mt-3' style={{ border: '1px solid #898989', padding: 3, margin: 3, borderRadius: '6px' }}>
                                    {organizationData.address_list.map((row, index) => {
                                        return (
                                            <Col xs={12} key={index}>
                                                <Row>
                                                    <Col xs={3} className="mt-4">
                                                        <span className='text-primary'><b>CEP:</b> </span>  {row?.address?.zip_code}
                                                    </Col>

                                                    <Col xs={9} className="mt-4">
                                                        <span className='text-primary'><b>Endereco:</b> </span>  {row?.address?.address}
                                                    </Col>

                                                    <Col xs={6} className="mt-4">
                                                        <span className='text-primary'><b>Estado:</b> </span>  {row?.address?.state}
                                                    </Col>

                                                    <Col xs={6} className="mt-4">
                                                        <span className='text-primary'><b>Cidade:</b> </span>  {row?.address?.city}
                                                    </Col>

                                                    <Col xs={6} className="mt-4">
                                                        <span className='text-primary'><b>Bairro:</b> </span>  {row?.address?.district}
                                                    </Col>

                                                    <Col xs={6} className="mt-4">
                                                        <span className='text-primary'><b>Número:</b> </span>  {row?.address?.number}
                                                    </Col>

                                                    <Col xs={12} className="mt-4 mb-4">
                                                        <span className='text-primary'><b>Complemento:</b> </span>  {row?.address?.complement}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )
                                    })}
                                </Row>
                                : <></>
                            }

                            <h5>Contato(s)</h5>

                            {organizationData.contact_list
                                ? <Row className='mb-3 mt-3' style={{ border: '1px solid #898989', padding: 3, margin: 3, borderRadius: '6px' }}>
                                    {organizationData.contact_list.contacts.map((row, index) => {
                                        return (
                                            <Col xs={12} key={index}>
                                                <Row>
                                                    <Col xs={12} className="mt-4">
                                                        <span className='text-primary'><b>Nome:</b> </span>  {row?.name}
                                                    </Col>
                                                    <Col xs={12} className="mt-4">
                                                        <span className='text-primary'><b>Telefone:</b> </span>  {row?.phone_list?.phones[0]?.number}
                                                    </Col>
                                                    <Col xs={12} className="mt-4 mb-4">
                                                        <span className='text-primary'><b>Email:</b> </span>  {row?.emails_list?.emails[0]?.email}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )
                                    })}
                                </Row>
                                : <></>
                            }



                        </Modal.Body>
                    </Modal>
                </>
                : <></>
            }


        </>
    )
}

export default Component
