import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Form from "./pages/form";
import PdfRenderer from "./pages/pdfRenderer";
import Test from "./pages/test";
import MachineTable from "./pages/machineTable";
import NavBar from "./components/navBar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar />
          <Form />,
        </>
      ),
    },
    {
      path: "/pdf-renderer",
      element: <PdfRenderer />,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/machines",
      element: (
        <>
          <NavBar />
          <MachineTable />,
        </>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
