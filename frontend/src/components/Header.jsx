import { useEffect, useState } from "react";
import {
  Container,
  Group,
  Burger,
  Button,
  Notification,
  Menu,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoMdArrowDropdown } from "react-icons/io";
import classes from "./HeaderSimple.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import isAuthenticated from "../utils/isAuthenticated";

const links = [
  { link: "/", label: "Home" },
  { link: "/donation", label: "Donation" },
  { link: "/crisis", label: "Crisis" },
  { link: "/volunteer", label: "Volunteer" },
  { link: "/inventory", label: "Inventory" },
  {
    label: "Admin",
    subLinks: [
      { link: "/admin/crisis", label: "Crisis Management" },
      { link: "/admin/volunteer", label: "Volunteer Management" },
      { link: "/admin/report", label: "Reports" },
    ],
  },
];

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const [logoutMessage, setLogoutMessage] = useState("");
  const navigate = useNavigate();
  let location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLogoutMessage("You have been logged out.");
    setTimeout(() => {
      setLogoutMessage("");
    }, 3000);
  };

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const items = links.map((link) => {
    if (link.subLinks) {
      const subMenuItems = link.subLinks.map((subLink) => (
        <Menu.Item
          key={subLink.link}
          className={classes.fontRoboto}
          onClick={(event) => {
            event.preventDefault();
            navigate(subLink.link);
          }}
        >
          {subLink.label}
        </Menu.Item>
      ));

      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              className={classes.link}
              data-active={active === link.link ? "true" : undefined}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span>{link.label}</span>
                <IoMdArrowDropdown />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{subMenuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        data-active={active === link.link ? "true" : undefined}
        onClick={(event) => {
          event.preventDefault();
          navigate(link.link);
        }}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        {!isAuthenticated().isAuthenticated ? (
          <Button
            variant="outline"
            size="xs"
            className="ml-2"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        ) : (
          <Button
            variant="outline"
            size="xs"
            className="ml-2"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

        {logoutMessage && (
          <Notification
            title="Logout"
            color="teal"
            onClose={() => setLogoutMessage("")}
            style={{
              position: "fixed",
              bottom: 20,
              right: 20,
              zIndex: 999,
            }}
          >
            {logoutMessage}
          </Notification>
        )}
      </Container>
    </header>
  );
};

export default Header;
