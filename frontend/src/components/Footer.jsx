import { Container, Group, Text, Anchor } from "@mantine/core";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import classes from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Container size="md" className={classes.inner}>
        <div className={classes.section}>
          <Text size="lg" weight={700} className={classes.logo}>
            CS
          </Text>
          <Text size="sm" color="dimmed">
            Empowering Safety with Proactive Crisis Management
          </Text>
        </div>

        <div className={classes.section}>
          <Text size="sm" c="dimmed" weight={600} className={classes.heading}>
            Quick Links
          </Text>
          <Anchor href="/" className={classes.link}>
            Home
          </Anchor>
          <Anchor href="/about" className={classes.link}>
            About Us
          </Anchor>
          <Anchor href="/contact" className={classes.link}>
            Contact
          </Anchor>
          <Anchor href="/privacy" className={classes.link}>
            Privacy Policy
          </Anchor>
        </div>

        <div className={classes.section}>
          <Text size="sm" c="dimmed" weight={600} className={classes.heading}>
            Connect with Us
          </Text>
          <Group spacing="xs">
            <Anchor href="https://facebook.com" target="_blank">
              <FaFacebook size="1.2em" color="#fff" />
            </Anchor>
            <Anchor href="https://twitter.com" target="_blank">
              <FaTwitter size="1.2em" color="#fff" />
            </Anchor>
            <Anchor href="https://instagram.com" target="_blank">
              <FaInstagram size="1.2em" color="#fff" />
            </Anchor>
            <Anchor href="https://linkedin.com" target="_blank">
              <FaLinkedin size="1.2em" color="#fff" />
            </Anchor>
          </Group>
        </div>
      </Container>

      <Container size="md" className={classes.bottom}>
        <Text size="xs" color="dimmed">
          © {new Date().getFullYear()} Developed by Mahmud Hasan Sourov. All
          rights reserved.
        </Text>
      </Container>
    </footer>
  );
};
