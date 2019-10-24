import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CustomerItem from './Item'
import { Table } from 'reactstrap'


class CustomersList extends React.Component {
    constructor() {
        super()
        this.state = {
            customers: []
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
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleRemove = (id) => {
        if (window.confirm('Are you sure?')) {
            axios.delete(`/customers/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then(response => {
                    if (response.data._id) {
                        this.setState(prevState => {
                            return { customers: prevState.customers.filter(customer => customer._id !== id) }
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    render() {
        return (
            <div>
                <h2>Listing Customers - {this.state.customers.length}</h2>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customers.map((customer, index) => {
                            return <CustomerItem handleRemove={this.handleRemove}
                                key={customer._id}
                                id={customer._id}
                                index={index}
                                name={customer.name}
                                email={customer.email}
                                mobile={customer.mobile} />
                            // return <CustomerItem {...customer, index} />
                        })}
                    </tbody>
                </Table>

                <Link to="/customers/new">Add Customer</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}

export default connect(mapStateToProps)(CustomersList)