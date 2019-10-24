import React from 'react'
import axios from '../../config/axios'
import TicketForm from './Form'


export default class TicketNew extends React.Component {
    constructor() {
        super()
    }

    handleTicketSubmit = (ticket) => {
        axios.post('/tickets', ticket, {
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
                    this.props.history.push('/tickets')
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        return (
            <div><br />
                <TicketForm handleTicketSubmit={this.handleTicketSubmit} />
            </div>
        )
    }
}
