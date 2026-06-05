import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import Button from "@mui/material/Button";

const drawerWidth = 260;

const colors = {
  bg: "#F5F5F0",
  surface: "#FFFFFF",
  primary: "#4A5D4E",
  primaryLight: "#5A6D5E",
  text: "#2C3E2D",
  textMuted: "#6B7B6D",
  border: "#D4D8D4",
  hover: "#E8EBE8",
};

// All nav items visible to every authenticated user — no role filtering
const dashboardNavItems = [
  {
    label: "Dashboard",
    title: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Reports",
    title: "Reports",
    to: "/dashboard/reports",
    icon: AssessmentIcon,
  },
  {
    label: "Articles",
    title: "Articles",
    to: "/dashboard/articles",
    icon: ArticleIcon,
  },
  {
    label: "Users",
    title: "Users",
    to: "/dashboard/users",
    icon: PeopleIcon,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: colors.surface,
  borderRight: `1px solid ${colors.border}`,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: colors.surface,
  borderRight: `1px solid ${colors.border}`,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 2.5),
  minHeight: 64,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: colors.surface,
  color: colors.text,
  boxShadow: "none",
  borderBottom: `1px solid ${colors.border}`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const getPageTitle = (pathname) =>
  dashboardNavItems.find(({ to }) => to === pathname)?.title ?? "Welcome";

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = getPageTitle(location.pathname);
  const firstName = localStorage.getItem("firstName") || "User";

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", bgcolor: colors.bg, minHeight: "100vh" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ minHeight: 64, px: 3 }}>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
              color: colors.primary,
              "&:hover": { bgcolor: colors.hover },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              color: colors.text,
              letterSpacing: "-0.02em",
            }}
          >
            {pageTitle}
          </Typography>

          {/* Greeting */}
          <Typography
            variant="body2"
            sx={{
              color: colors.textMuted,
              mr: 2,
              display: { xs: "none", sm: "block" },
            }}
          >
            Hello, {firstName}
          </Typography>

          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              color: colors.primary,
              borderColor: colors.border,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              "&:hover": {
                borderColor: colors.primary,
                bgcolor: colors.hover,
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer / Sidebar */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                bgcolor: colors.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.875rem",
              }}
            >
              LF
            </Box>
            {open && (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: colors.text,
                  letterSpacing: "-0.02em",
                  fontSize: "1.125rem",
                }}
              >
                LF Studio
              </Typography>
            )}
          </Box>
          {open && (
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                color: colors.textMuted,
                "&:hover": { bgcolor: colors.hover },
              }}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          )}
        </DrawerHeader>

        <Divider sx={{ borderColor: colors.border, mx: 2 }} />

        <List sx={{ px: 2, pt: 2 }}>
          {dashboardNavItems.map(({ label, to, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <ListItem
                key={to}
                disablePadding
                sx={{ display: "block", mb: 0.5 }}
              >
                <ListItemButton
                  component={Link}
                  to={to}
                  selected={isActive}
                  sx={{
                    minHeight: 44,
                    px: 2,
                    borderRadius: "10px",
                    justifyContent: open ? "initial" : "center",
                    color: isActive ? colors.primary : colors.textMuted,
                    bgcolor: isActive ? `${colors.primary}12` : "transparent",
                    "&:hover": {
                      bgcolor: isActive ? `${colors.primary}18` : colors.hover,
                    },
                    "&.Mui-selected": {
                      bgcolor: `${colors.primary}12`,
                      color: colors.primary,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    <Icon sx={{ fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{
                      opacity: open ? 1 : 0,
                      "& .MuiTypography-root": {
                        fontWeight: isActive ? 600 : 500,
                        fontSize: "0.875rem",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          bgcolor: colors.bg,
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;
