import React from 'react'
import { Link } from 'react-router-dom'

export default function DepartmentItem(props) {

    const { index, name, id, handleRemove } = props
    return (
        <tr key={id}>
            <td>{index + 1}</td>
            <td><Link to={`/departments/${id}`}>{name}</Link></td>
            <td><button onClick={() => {
                handleRemove(id)
            }}>remove</button></td>
        </tr>

    )
}