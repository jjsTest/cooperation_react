import React from 'react';
import {Link} from 'react-router-dom';
import {
  CNavbar,
  CNavbarNav,
  CNavbarBrand,
  CNavLink,
  CForm,
  CButton,
  CContainer,
  CNavItem,
  CFormInput,
} from '@coreui/react'

function Header() {

  const username = localStorage.getItem('authenticatedUser');

  return (
    <div>
      <CNavbar expand="lg" colorScheme="light" className="bg-light">
      <CContainer fluid>
        <CNavbarBrand><Link to="/">Project Board</Link></CNavbarBrand>
        {/* <CNavbarToggler onClick={() => setVisible(!visible)} />
        <CCollapse className="navbar-collapse" visible={visible}> */}
          <CNavbarNav>
            <CNavItem>
              {/* <CNavLink href="#" active>
                Home
              </CNavLink> */}
              <CNavLink><Link to="/">home</Link></CNavLink>
            </CNavItem>
            {/* <CNavItem>
              <CNavLink href="#">Link</CNavLink>
            </CNavItem> */}
            <CNavItem>
              <CNavLink><Link to="/contact">contact</Link></CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>{username == "" ? <Link to="/signIn">sign in</Link> : <Link to="/signOut">sign out</Link>}</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>{username == "" ? <Link to="/signUp">sign up</Link> : null}</CNavLink>
            </CNavItem>
            {/* <CNavItem>
              <CNavLink><Link to="/chat">chat</Link></CNavLink>
            </CNavItem> */}
            {/* user이름 띄우기 */}
            {/* <CDropdown variant="nav-item" popper={false}>
              <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href="#">Action</CDropdownItem>
                <CDropdownItem href="#">Another action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="#">Something else here</CDropdownItem>
              </CDropdownMenu>
            </CDropdown> */}
            {/* <CNavItem>
              <CNavLink href="#" disabled>
                Disabled
              </CNavLink>
            </CNavItem> */}
          </CNavbarNav>
          <CForm className="d-flex">
            <CFormInput type="search" className="me-2" placeholder="Search" />
            <CButton type="submit" color="success" variant="outline">
              Search
            </CButton>
          </CForm>
        {/* </CCollapse> */}
      </CContainer>
    </CNavbar>
    </div>
  );
}

export default Header;
