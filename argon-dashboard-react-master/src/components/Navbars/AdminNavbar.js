import { Link, useLocation } from "react-router-dom";

import { DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Navbar, Nav, Container, Media } from "reactstrap";

const AdminNavbar = (props) => {
    const location = useLocation();

    const path = location.pathname;

    // Determinar nombre según path parcial
    let currentPage = "Admin Panel"; // valor por defecto
    if (path.includes("/admin")) currentPage = "Manage Students";
    // Agrega más condiciones según tu app

    return (
        <>
            <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                <Container fluid className="px-3 px-md-0">
                    <Link className="h4 mb-0 text-white text-uppercase" to="#">
                        {currentPage}
                    </Link>
                    <Nav className="align-items-center" navbar>
                        <UncontrolledDropdown nav>
                            <DropdownToggle className="pr-0" nav>
                                <Media className="align-items-center">
                                    <span className="avatar avatar-sm rounded-circle">
                                        <img alt="..." src={require("../../assets/img/theme/user 3.png")} />
                                    </span>
                                    <Media className="ml-2 d-none d-lg-block">
                                        <span className="mb-0 text-sm font-weight-bold">User</span>
                                    </Media>
                                </Media>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                                    <i className="ni ni-user-run" />
                                    <span>Logout</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default AdminNavbar;
