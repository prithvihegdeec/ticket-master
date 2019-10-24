import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import EmployeeItem from './Item'

export default class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = {
            employees: []

        }
    }

    componentDidMount() {
        axios.get('/employees', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const employees = response.data
                this.setState({ employees })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleRemove = (id) => {
        if (window.confirm('Are you sure?')) {
            axios.delete(`/employees/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    console.log(response.data)
                    if (response.data._id) {
                        this.setState(prevState => {
                            return { employees: prevState.employees.filter(employee => employee._id !== id) }
                        })

                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }

    render() {
        return (
            <div>
                <h2>Employees</h2>
                <Link to="/employees/new">
                    Add Employee</Link> <br /> <br />
                <table border="1">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee, index) => {
                            return (
                                <EmployeeItem handleRemove={this.handleRemove}
                                    key={employee._id}
                                    index={index}
                                    name={employee.name}
                                    email={employee.email}
                                    mobile={employee.mobile}
                                    employee={employee}
                                />
                            )
                        })}
                    </tbody>
                </table>

            </div >
        )
    }



}
