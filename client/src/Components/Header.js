import { Nav, Navbar, NavItem, NavLink } from "reactstrap";
import logo from "../Images/logo-t.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice.js";

const Header = () => {
  const currentlylogged = useSelector((state) => state.users.user.name);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/");
  };
  return (
    <>
      <Navbar className="header">
        <Nav>
          <NavItem>
            <img src={logo} className="logo" />
          </NavItem>

          <NavItem>
            <NavLink>
              <Link to="/">Home</Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <Link to="/profile">Profile</Link>
          </NavItem>

          <NavItem>
            <NavLink>
              <Link to="/login">Login</Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <Link onClick={handlelogout}>Logout</Link>
          </NavItem>

          <NavItem>
            Welcome <b>{currentlylogged}!</b>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
