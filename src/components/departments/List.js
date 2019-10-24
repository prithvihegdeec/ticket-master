import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './Form'
import DepartmentItem from './Item'

export default class DepartmentList extends React.Component {

    state = {
        departments: []

    }

    componentDidMount() {
        axios.get('/departments', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const departments = response.data
                this.setState({ departments })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleDepartmentSubmit = (formData) => {
        axios.post('/departments', formData, {
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
                    // axios.get('/departments', {
                    //     headers: {
                    //         'x-auth': localStorage.getItem('token')
                    //     }
                    // })
                    //     .then(response => {
                    //         const departments = response.data
                    //         this.setState({ departments })
                    //     })
                    //     .catch(err => {
                    //         console.log(err)
                    //     })
                    this.setState(prevState => {
                        return {
                            departments: [...prevState.departments, formData]
                        }
                    })

                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    handleRemove = (id) => {
        if (window.confirm('Are you sure?')) {
            axios.delete(`/departments/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })

                .then((response) => {
                    console.log('deleted', response.data)
                    if (response.data._id) {
                        this.setState(prevState => {
                            return { departments: prevState.departments.filter(department => department._id !== id) }

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
                <h2>Departments</h2>
                <DepartmentForm handleDepartmentSubmit={this.handleDepartmentSubmit} />
                <h3>Listing Departments {this.state.departments.length}</h3>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.departments.map((department, index) => {
                            return (
                                <DepartmentItem handleRemove={this.handleRemove}
                                    key={department._id}
                                    index={index}
                                    name={department.name}
                                    id={department._id}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div >
        )
    }



}
