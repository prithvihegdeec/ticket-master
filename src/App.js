import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import {
    Card,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import Home from "./components/home/index"

import CustomersList from './components/customers/List'
import CustomerNew from './components/customers/New'
import CustomerShow from './components/customers/Show'
import CustomerEdit from './components/customers/Edit'

import DepartmentList from './components/departments/List'
import DepartmentShow from './components/departments/Show'

import EmployeeList from './components/employees/List'
import EmployeeNew from './components/employees/Form'
import EmployeeShow from './components/employees/Show'
import EmployeesEdit from './components/employees/Edit'

import TicketList from './components/tickets/List'
import TicketNew from './components/tickets/New'

function App() {
    return (
        <BrowserRouter>
            <div>
                <Navbar color="dark" dark expand="lg">
                    <NavbarBrand href="/">Ticket Master</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/customers">Customers</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/departments">Departments</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/employees">Employees</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/tickets">Tickets</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>

                <Switch>

                    <Route path="/" component={Home} exact={true} />
                    <Route path="/customers" component={CustomersList} exact={true} />
                    <Route path="/customers/new" component={CustomerNew} exact={true} />
                    <Route path="/customers/edit/:id" component={CustomerEdit} />
                    <Route path="/customers/:id" component={CustomerShow} />

                    <Route path="/departments" component={DepartmentList} exact={true} />
                    <Route path="/departments/:id" component={DepartmentShow} />

                    <Route path="/employees" component={EmployeeList} exact={true} />
                    <Route path="/employees/new" component={EmployeeNew} exact={true} />
                    <Route path="/employees/edit/:id" component={EmployeesEdit} />
                    <Route path="/employees/:id" component={EmployeeShow} />

                    <Route path="/tickets" component={TicketList} exact={true} />
                    <Route path="/tickets/new" component={TicketNew} exact={true} />



                </Switch>

            </div>
        </BrowserRouter>
    )
}

export default App


