'use client'
import React from 'react';
// import { Provider } from "react-redux";
// import { store } from "../../redux/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        {/* <Provider store = {store}>
          {children}
        </Provider> */}
        {children}
      </body>
    </html>
  )
}
