import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Form from "./pages/form";
import PdfRenderer from "./pages/pdfRenderer";
import Test from "./pages/test";
import MachineTable from "./pages/machineTable";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Form />,
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
      element: <MachineTable />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
