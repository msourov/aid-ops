import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import store from "./store.js";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "cyan",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <Notifications />
        <App />
      </Provider>
    </MantineProvider>
  </StrictMode>
);
