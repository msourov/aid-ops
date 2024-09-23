import { RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import router from "./router";

function App() {
  return (
    <RouterProvider router={router}>
      <AppLayout />
    </RouterProvider>
  );
}

export default App;
