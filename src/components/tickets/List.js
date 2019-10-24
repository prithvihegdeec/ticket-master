import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import TicketItem from './Item'
import { Table } from 'reactstrap'

export default class TicketList extends React.Component {
    constructor() {
        super()
        this.state = {
            tickets: []

        }
    }

    componentDidMount() {
        axios.get('/tickets', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const tickets = response.data
                this.setState({ tickets })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleRemove = (id) => {
        if (window.confirm('Are you sure?')) {
            axios.delete(`/tickets/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    console.log(response.data)
                    if (response.data._id) {
                        this.setState(prevState => {
                            return { tickets: prevState.tickets.filter(ticket => ticket._id !== id) }
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
                <h2>Tickets</h2>
                <Link to="/tickets/new">
                    Add Ticket</Link> <br /> <br />
                <Table hover size="sm">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Department</th>
                            <th>Employee</th>
                            <th>Message</th>
                            <th>Priority</th>
                            {/*<th>isResolved</th>*/}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tickets.map((ticket, index) => {
                            return (
                                <TicketItem handleRemove={this.handleRemove}
                                    key={ticket._id} ticket={ticket}
                                />
                            )
                        })}
                    </tbody>
                </Table>
            </div >
        )
    }



}
