import React from 'react'
import axios from '../../config/axios'
import Select from 'react-select'

export default class EmployeeNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            mobile: '',
            departments: [],
            department: props.employee ? props.employee.department : '',

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    componentDidMount() {
        axios.get('/departments', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const departments = response.data
                this.setState({ departments })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChangeSelect = (props) => {
        const department = props.value
        this.setState({ department })
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department: this.state.department,
        }
        //Only for editing
        this.props.employee && (formData.id = this.props.employee._id)
        this.props.employee && (this.props.handleEmployeeSubmit(formData))
        console.log(formData)
        //only for editing
        !(this.props.employee) ? (axios.post('/employees', formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log('employee:', response.data)
                this.props.history.push('/employees')
            })
            .catch(err => {
                console.log(err)
            })) : console.log()


    }

    componentWillReceiveProps(nextProps) {
        console.log('form customer will receive props', nextProps)
        const { name, email, mobile, department } = nextProps.employee
        this.setState({ name, email, mobile, department })
    }

    render() {
        return (
            <React.Fragment>
                {this.props.employee ? <h2>Edit Employee</h2> : <h2>Add Employee</h2>}
                <fieldset>
                    <legend>Group Name</legend>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name
                        <input type="text" value={this.state.name} onChange={this.handleChange} name="name" />
                        </label><br />
                        <label>
                            Email
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                        </label><br />
                        <label>
                            Mobile
                        <input type="text" value={this.state.mobile} onChange={this.handleChange} name="mobile" />
                        </label><br />
                        <label>
                            department
                                <Select options={this.state.departments.map(department => {
                                return { value: department._id, label: department.name }
                            })} value={this.state.departments._id} onChange={this.handleChangeSelect} name="department">
                                {this.state.departments.map(department => {
                                    return <option key={department._id} value={department._id}>{department.name}</option>
                                })}
                            </Select>

                        </label><br />
                        &nbsp;&nbsp;&nbsp;<input type="submit" value="submit" />
                    </form>
                </fieldset>

            </React.Fragment>
        )

    }

}