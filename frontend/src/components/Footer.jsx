import { Container, Group, Text } from "@mantine/core";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Container size="md" className={classes.inner}>
        <div className={classes.section}>
          <img
            src="/aidOps-logo.png"
            alt="AidOps Logo"
            className={classes.logoImage}
          />
          <Text size="sm" color="dimmed" mt={2}>
            Empowering Safety with Proactive Crisis Management
          </Text>
        </div>

        <div className={classes.section}>
          <Text size="md" c="dimmed" weight={600} className={classes.heading}>
            Quick Links
          </Text>
          <div className="flex flex-col mt-2 text-sm gap-2">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>

        <div className={classes.section}>
          <Text size="sm" c="dimmed" weight={600} className={classes.heading}>
            Connect with Us
          </Text>
          <Group spacing="xs" mt={10}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size="1.2em" color="#fff" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size="1.2em" color="#fff" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size="1.2em" color="#fff" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size="1.2em" color="#fff" />
            </a>
          </Group>
        </div>
      </Container>

      <Container size="md" className={classes.bottom}>
        <Text size="xs" color="dimmed">
          © {new Date().getFullYear()} | Developed by Mahmud Hasan Sourov | All
          rights reserved.
        </Text>
      </Container>
    </footer>
  );
};
