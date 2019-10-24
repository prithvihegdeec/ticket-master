import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

function CustomerItem(props) {
    const { index, name, email, id, mobile, handleRemove } = props
    return (
        <tr>
            <td>{index + 1}</td>
            <td><Link to={`/customers/${id}`}>{name}</Link></td>
            <td>{email}</td>
            <td>{mobile}</td>
            <td><Button outline color="danger" onClick={() => {
                handleRemove(id)
            }}>remove</Button></td>
        </tr>
    )
}




export default CustomerItem