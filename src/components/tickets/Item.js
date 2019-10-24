import React from 'react'
import { Button } from 'reactstrap'

export default function TicketItem(props) {

    const { ticket, handleRemove } = props
    return (
        <tr key={ticket._id}>
            <td>{ticket.customer}</td>
            <td>{ticket.department}</td>
            <td>{ticket.employee}</td>
            <td>{ticket.message}</td>
            <td>{ticket.priority}</td>
            {/*<td>{ticket.isResolved}</td>*/}
            <td><Button color="primary" onClick={() => {
                handleRemove(ticket._id)
            }}>edit</Button> <Button color="danger" onClick={() => {
                handleRemove(ticket._id)
            }}>remove</Button> </td>
        </tr>

    )
}