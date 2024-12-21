import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Form from "./pages/form";
import PdfRenderer from "./pages/pdfRenderer";
import Test from "./pages/test";

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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
