import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './MainNav.scss';

export const MainNav = (): React.JSX.Element => {
    return (
        <Navbar expand='lg' className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand>
                    <NavLink className='navbar-brand' to='/'>TicketApp</NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='main-navigation' />
                <Navbar.Collapse id='main-navigation'>
                    <Nav className='ms-auto'>
                        <NavLink
                            to='/add-new'
                            className={'nav-link'}
                        >
                            Add new
                        </NavLink>
                        <NavLink
                            to='/my-events'
                            className={'nav-link'}
                        >
                            My events
                        </NavLink>
                        <NavLink
                            to='/wishlist'
                            className={'nav-link'}
                        >
                            Wishlist
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    );
};