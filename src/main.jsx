import "./index.css";
// import react from "react";
// import { StrictMode } from "react";
import appRouter from "./AppRouter";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={appRouter}></RouterProvider>
  // </StrictMode>
);
