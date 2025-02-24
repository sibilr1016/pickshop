import React from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
// import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import logo from "../assets/logo.png";
import { logout } from "../slices/authSlice";
import SearchBox from "./SearchBox";

const Header = () => {
  const { cartItems } = useSelector((store) => store.cart);
  const { userInfo } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* <LinkContainer to="/"> */}
          <Navbar.Brand href="/">
            <img src={logo} alt="logo" /> PickShop
          </Navbar.Brand>
          {/* </LinkContainer> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <LinkContainer to="/cart"> */}
              <SearchBox />
              <Nav.Link href="/cart">
                <FaShoppingCart />
                Cart{" "}
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {/* </LinkContainer> */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item onClick={() => navigate("/profile")}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // <NavDropdown title={userInfo.name} id="username">
                //   <LinkContainer to="/profile">
                //     <NavDropdown.Item>Profile</NavDropdown.Item>
                //   </LinkContainer>
                //   <NavDropdown.Item onClick={logoutHandler}>
                //     Logout
                //   </NavDropdown.Item>
                // </NavDropdown>
                // <LinkContainer to="/login">
                <Nav.Link href="/login">
                  <FaUser />
                  Sign In
                </Nav.Link>
                // </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item
                    onClick={() => navigate("/admin/productlist")}
                  >
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/admin/userlist")}>
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate("/admin/orderlist")}
                  >
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
