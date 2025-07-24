import { createContext } from "react";

import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ReactGA from "react-ga4";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const { t } = useTranslation();

  // Fetch products from localStorage using useQuery
  const { data: cartData = [], refetch } = useQuery({
    queryKey: ["cartProducts"],
    queryFn: async () => {
      // Fetch data from localStorage
      const storedProducts = JSON.parse(localStorage.getItem("FreeFeel")) || [];
      return storedProducts;
    },
    initialData: [], // Start with an empty array
  });

  //   Handle product add to cart
  const handleAddToCart = (selectedProduct) => {


    ReactGA.event({

      action: "Product Added to Cart",
      label: selectedProduct.id,
      value: {
        name: selectedProduct.name,
        id: selectedProduct.id,
        variant: selectedProduct.variant,
        category: selectedProduct.category,
      },
    });
    try {
      // Check if there is an existing cart in localStorage
      const existingCart = localStorage.getItem("FreeFeel");

      // Parse the existing cart or initialize it as an empty array
      const cart = existingCart ? JSON.parse(existingCart) : [];

      // Add the selected product to the cart array
      cart.push(selectedProduct);

      // Save the updated cart back to localStorage
      localStorage.setItem("FreeFeel", JSON.stringify(cart));

      // Swal.fire({
      //   title: t("productDetails.productAddToCartConfirmationTittle"),
      //   icon: "success",
      //   draggable: true,
      // });
      toast.success(t("productDetails.productAddToCartConfirmationTittle"));
      refetch();
    } catch (error) {
      toast.error(t("productDetails.productAddToCartFailedTittle"));
      console.log(error);
      // Swal.fire({
      //   title: t("productDetails.productAddToCartFailedTittle"),
      //   icon: "error",
      //   draggable: true,
      // });
    }
  };

  return (
    <CartContext.Provider
      value={{
        handleAddToCart,
        cartData,
        refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
