"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import type { ReactNode } from "react";
import "./layout.css";
import StyledJsxRegistry from "./registry";
import theme from "./theme";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledJsxRegistry>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
