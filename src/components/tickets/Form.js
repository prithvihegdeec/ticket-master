import React from 'react'
import axios from '../../config/axios'
import Select from 'react-select'
import MultiSelectReact from 'multiselect-dropdown-react'

export default class TicketForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            customer: '',
            departments: [],
            department: '',
            employees: [],
            employeeSelected: [],
            message: '',
            priority: '',
            status: '',
            isResolved: '',
            low: false,
            medium: false,
            high: false,
            code: '',
            ticket: props.ticket ? props.ticket : '',
        }
    }

    componentDidMount() {
        axios.get('/customers', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const customers = response.data
                this.setState({ customers })
                axios.get('/departments', {
                    headers: {
                        'x-auth': localStorage.getItem('token')
                    }
                })
                    .then(resp => {
                        const departments = resp.data
                        this.setState({ departments })

                    })

            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChangeSelectDepartment = (props) => {
        const department = props.value
        this.setState({ department })
        axios.get(`/employees`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const employeesList = response.data
                console.log('employeesList', employeesList)
                const employeeSelected = employeesList.filter(employee => {

                    return employee.department._id === props.value
                })
                this.setState({ employeeSelected })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChangeSelectEmployee = (props) => {
        console.log('params', props)
        const employees = {
            id: props
        }

        this.setState(prevState => {
            return {
                employees: [...prevState.employees, employees]
            }
        })
    }

    handleChangeSelectCustomer = (props) => {
        const customer = props.value
        this.setState({ customer })
    }

    handlePriorityL = () => {
        this.setState({ low: true, priority: 'Low' })
    }

    handlePriorityM = () => {
        this.setState({ medium: true, priority: 'medium' })
    }

    handlePriorityH = () => {
        this.setState({ high: true, priority: 'high' })
    }

    handleChange = (e) => {
        const message = e.target.value
        this.setState({ message })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            customer: this.state.customer,
            department: this.state.department,
            employees: this.state.employees,
            message: this.state.message,
            priority: this.state.priority,
            code: Math.round(Math.random() * 100)

        }
        //Only for editing
        this.props.ticket && (formData._id = this.props.ticket._id)
        this.props.ticket && (this.props.handleTicketSubmit(formData))
        console.log(formData)
        this.props.handleTicketSubmit(formData)
    }

    render() {
        console.log('form ticket render')
        return (
            <React.Fragment>
                <fieldset>
                    <legend>Add Ticket</legend>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Customer:
                        <Select options={this.state.customers.map(customer => {
                                return { value: customer._id, label: customer.name }
                            })} value={this.state.customer._id} onChange={this.handleChangeSelectCustomer} name="customer">
                                <option value="">Select</option>
                                {this.state.customers.map(customer => {
                                    return <option key={customer._id} value={customer._id}>{customer.name}</option>
                                })}
                            </Select>
                        </label> <br />

                        <label>
                            Department:
                        <Select options={this.state.departments.map(department => {
                                return { value: department._id, label: department.name }
                            })} value={this.state.department._id} onChange={this.handleChangeSelectDepartment} name="department">
                                <option value="">Select</option>
                                {this.state.departments.map(department => {
                                    return <option key={department._id} value={department._id}>{department.name}</option>
                                })}
                            </Select>
                        </label> <br />

                        <label>
                            Employee:
                        {/*<MultiSelectReact options={this.state.employees.map(employee => {
                                return { value: employee._id, label: employee.name }
                            })} value={this.state.employee._id} optionClicked={this.handleChangeSelectEmployee} name="employee">
                                <option value="">Select</option>
                                {this.state.employees.map(employee => {
                                    return <option key={employee._id} value={employee._id}>{employee.name}</option>
                                })}
                            </MultiSelectReact>*/}
                            {/*<MultiSelectReact options={this.state.employees.map(employee => {
                                return { value: employee._id, label: employee.name }
                            })} optionClicked={this.handleChangeSelectEmployee} selectedBadgeClicked={this.handleChangeSelectEmployeeList} name="employee">
                                <option value="">Select</option>
                                {this.state.employees.map(employee => {
                                    return <option key={employee._id} value={employee._id}>{employee.name}</option>
                                })}
                            </MultiSelectReact>*/}
                            <MultiSelectReact options={this.state.employeeSelected.map(employee => {
                                return { value: employee._id, name: employee.name }
                            })} onSelectOptions={this.handleChangeSelectEmployee} name="employee">
                                <option value="">Select</option>
                                {this.state.employeeSelected.map(employee => {
                                    return <option key={employee._id} value={employee._id}>{employee.name}</option>
                                })}
                            </MultiSelectReact>
                        </label> <br />
                        <label>
                            Message:
                        <input type="textarea" value={this.state.message} onChange={this.handleChange} name="message" />
                        </label> <br />

                        <label>
                            Priority:
                             <input type="radio" name="priority" checked={this.state.low} value="Low" onChange={this.handlePriorityL} />Low
                             <input type="radio" name="priority" checked={this.state.medium} value="Medium" onChange={this.handlePriorityM} />Medium
                             <input type="radio" name="priority" checked={this.state.high} value="High" onChange={this.handlePriorityH} />High
                        </label> <br />


                        <input type="submit" value="submit" />
                    </form>
                </fieldset>
            </React.Fragment>
        )
    }
}
