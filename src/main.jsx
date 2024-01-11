import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./About";
import HeroPage from "./HeroPage";
import JoinMeeting from "./JoinMeeting";
import CreateMeeting from "./CreateMeeting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/create-meeting",
    element: <CreateMeeting />,
  },
  {
    path: "/join-meeting",
    element: <JoinMeeting />,
  },
]);

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);
