import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login, UserHome, SessionInfo, Settings } from "pages";
import { SessionProvider } from "providers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<UserHome />} />
          <Route path="/session-info" element={<SessionInfo />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  </React.StrictMode>
);
