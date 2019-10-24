import React from 'react'
import axios from '../../config/axios'
import CustomerForm from './Form'

class CustomerNew extends React.Component {
    constructor() {
        super()
        this.handleCustomerSubmit = this.handleCustomerSubmit.bind(this)
    }

    handleCustomerSubmit(customer) {
        axios.post('/customers', customer, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data.errors) {
                    window.alert(response.data.message)
                    console.log('validation error', response.data.errors)
                } else {
                    console.log('success', response.data)
                    this.props.history.push('/customers')
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        return (
            <div>
                <h2>Add Customer</h2>
                <CustomerForm handleCustomerSubmit={this.handleCustomerSubmit} />
            </div>
        )
    }
}

export default CustomerNew
