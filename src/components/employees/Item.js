import React from 'react'
import { Link } from 'react-router-dom'

export default function EmployeeItem(props) {

    const { index, handleRemove, employee } = props
    return (
        <tr key={employee._id}>
            <td>{index + 1}</td>
            <td><Link to={`/employees/${employee._id}`}>{employee.name}</Link></td>
            <td>{employee.email}</td>
            <td>{employee.mobile}</td>
            {employee.department !== null ? <td>{employee.department.name}</td> : <td></td>}
            <td><button onClick={() => {
                handleRemove(employee._id)
            }}>remove</button></td>
        </tr>

    )
}