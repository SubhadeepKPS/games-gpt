import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Browse from "./pages/Browse";
import GameGPT from "./pages/GameGPT";
// import BrowseError from "./components/error/BrowseError";
import PageLoader from "./components/shimmer/PageLoader";

// import SignUp from "./components/SignUp";

const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Browse />
            </Suspense>
          ),
          // errorElement: <BrowseError />,
        },
        {
          path: "/gameGPT",
          element: <GameGPT />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default appRouter;
