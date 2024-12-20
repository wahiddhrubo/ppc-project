import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Form from "./pages/form";
import PdfRenderer from "./pages/pdfRenderer";

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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
