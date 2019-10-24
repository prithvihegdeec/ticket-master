import React from 'react'
import axios from '../../config/axios'

export default class DepartmentShow extends React.Component {
    constructor() {
        super()
        this.state = {
            department: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/departments/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const department = response.data
                this.setState({ department })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h2>{this.state.department.name} - {this.state.department._id}</h2>

            </div>
        )
    }
}

