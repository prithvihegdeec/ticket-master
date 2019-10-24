import React from 'react'

export default class DepartmentForm extends React.Component {
    constructor() {
        console.log('Form department constructor')
        super()
        this.state = {
            name: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        this.props.handleDepartmentSubmit(formData)

    }

    render() {
        console.log('Form department render')
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" value={this.state.name} onChange={this.handleChange} name="name" id="name" />
                    <input type="submit" value="Add" />
                </form>

            </div>
        )
    }
}