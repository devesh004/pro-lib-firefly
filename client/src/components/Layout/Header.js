import React from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../redux/action/auth";
// import { userLogout } from "../../Redux/actions/auth";

const Header = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    console.log("sdr");
    dispatch(userLogout());
  };

  const guestItems = (
    <>
      <LinkContainer to='/login'>
        <Nav.Link>Sign in</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/signup'>
        <Nav.Link>
          Sign up <i className='fas fa-user-plus'></i>
        </Nav.Link>
      </LinkContainer>
    </>
  );

  const authItems = (
    <>
      <LinkContainer to='/new-project'>
        <Nav.Link>Add new</Nav.Link>
      </LinkContainer>
      <NavDropdown
        title={
          <>
            {user && user.name + " "}
            <i className='fas fa-user'></i>
          </>
        }
        id='navbarScrollingDropdown'
      >
        <LinkContainer to='/profile'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        {/* <NavDropdown.Divider /> */}

        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
      </NavDropdown>
    </>
  );

  const adminItems = (
    <>
      <NavDropdown
        title={
          <>
            <span>Admin</span>
            <i className='fas fa-user-shield ms-1'></i>
          </>
        }
        id='admin'
      >
        <LinkContainer to='/admin/users'>
          <NavDropdown.Item>Users</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/admin/products'>
          <NavDropdown.Item>Products</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/admin/orders'>
          <NavDropdown.Item>Orders</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    </>
  );

  return (
    <Navbar
      className='bg-light shadow-lg mb-5'
      variant='light'
      expand='lg'
      collapseOnSelect
    >
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <i className='fas fa-shopping-basket'></i> ProLIB
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='my-2 my-lg-0 ms-auto'
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* {guestItems} */}
            {user && authItems}
            {!user && guestItems}
            {/* {user && user.isAdmin && adminItems} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
