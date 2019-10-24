import React from 'react'
import axios from '../../config/axios'
import TicketForm from './Form'

export default class TicketEdit extends React.Component {
    constructor() {
        console.log('edit customer constructor')
        super()
        this.state = {
            ticket: {}
        }
    }

    handleTicketSubmit = (ticket) => {
        console.log('edit', ticket)
        axios.put(`/tickets/${ticket.id}`, ticket, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data.errors) {
                    window.alert(response.data.message)
                    console.log('validation error', response.data.errors)
                } else {
                    console.log('success', response.data)
                    this.props.history.push(`/tickets/${response.data._id}`)
                }
            })
    }

    componentDidMount() {
        console.log('edit ticket component did mount')
        const id = this.props.match.params.id
        axios.get(`/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const ticket = response.data
                this.setState({ ticket })
            })
    }

    render() {
        console.log('edit ticket render', this.state)
        return (
            <div>
                <TicketForm ticket={this.state.ticket} handleTicketSubmit={this.handleTicketSubmit} />
            </div>
        )
    }
}