import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUserAction } from "../../redux/auth-actions";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "../../assets/svgs/menu.svg";
import logo from "../../assets/images/logo.png";

import classes from "./Navbar.module.css";
import HelpModal from "../Misc/HelpModal";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigationHandler = (event) => {
    navigate(`/${event.target.id}`);
    handleCloseUserMenu();
  };

  const logUserOutHandler = () => {
    dispatch(logOutUserAction());
    handleCloseNavMenu();
  };

  const openHelpModalhandler = (event) => {
    event.preventDefault();
    setIsHelpModalOpen(true);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo} className={classes.logo} alt="Arkitektz" />
            ARKITEKTZ
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <img src={MenuIcon} style={{ width: "30px" }} alt="" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              className={classes["mobile-menu"]}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/products">
                  <Typography textAlign="center">Products</Typography>
                </Link>
              </MenuItem>
              {user.canEditOrCreate && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/add-product">
                    <Typography textAlign="center">Add Product</Typography>
                  </Link>
                </MenuItem>
              )}
              <MenuItem>
                <a onClick={openHelpModalhandler}>
                  <Typography textAlign="center">Help</Typography>
                </a>
              </MenuItem>
              <MenuItem onClick={logUserOutHandler}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ARKITEKTZ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              id="products"
              onClick={navigationHandler}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Products
            </Button>
            {user.canEditOrCreate && (
              <Button
                id="add-product"
                onClick={navigationHandler}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Add Product
              </Button>
            )}
            <Button
              id="add-product"
              onClick={openHelpModalhandler}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Help
            </Button>
            <Button
              onClick={logUserOutHandler}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Logout
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user.email.toUpperCase()}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={logUserOutHandler}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {isHelpModalOpen && (
        <HelpModal open={isHelpModalOpen} setOpen={setIsHelpModalOpen} />
      )}
    </AppBar>
  );
}
export default Navbar;
