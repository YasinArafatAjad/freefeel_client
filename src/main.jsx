import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/Routes/Routes.jsx";
import ThemeProvider from "./providers/ThemeProvider/ThemeProvider.jsx";
import AuthProvider from "./providers/AuthProvider/AuthProvider.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import LanguageProvider from "./providers/LanguageProvider/LanguageProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartProvider from "./providers/CartProvider/CartProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import AddressProvider from "./providers/AddressProvider/AddressProvider.jsx";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <CartProvider>
            <ThemeProvider>
              <AddressProvider>
                <HelmetProvider>
                  <RouterProvider router={router} />

                  <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                  />
                </HelmetProvider>
              </AddressProvider>
            </ThemeProvider>
          </CartProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
