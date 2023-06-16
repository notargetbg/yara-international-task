import { NavLink } from 'react-router-dom';



export const MainNav = ({}) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container float-end'>
            <NavLink className='navbar-brand' to='/'>TicketApp</NavLink>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                    <li className='nav-item'>
                        <NavLink
                            to='/add-new'
                            className={'nav-link'}
                            >
                            + New Event
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                        <NavLink
                            to='/wishlist'
                            className={'nav-link'}
                            >
                            Wishlist
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink
                            to='/my-events'
                            className={'nav-link'}
                            >
                            My events
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
};