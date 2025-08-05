"use client";
// import
import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Book, { CartItem } from "@/book";
import toast from "react-hot-toast";

// type
interface CartContextType {
  cart: CartItem[];
  isInCartList: (id: string) => boolean;
  saveCart: (cart: CartItem[]) => void;
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
}

// create context for cart
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProps {
  children: ReactNode;
}

//cart provider component that manages state
export const CartProvider = ({ children }: CartProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // load card from localstorage when component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("stored_book");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // save cart to state and local storage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("stored_book", JSON.stringify(newCart));
  };

  // add to cart
  const addToCart = (book: Book) => {
    const existingItem = cart.find((item) => item.id === book.id);
    if (existingItem) {
      const updatedItem = cart.map((item) =>
        item.id === book.id ? { ...item, quantity: item.quantity } : item
      );
      saveCart(updatedItem);
    } else {
      const newItem: CartItem = { ...book, quantity: 1 };
      saveCart([...cart, newItem]);
    }
    toast.success("added to cart");
  };

  // remove from cart
  const removeFromCart = (bookId: string) => {
    const updatedCart = cart.filter((item) => item.id !== bookId);
    saveCart(updatedCart);
    toast.remove("removed from cart");
  };

  // update quantity of a cart item
  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(bookId);
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === bookId ? { ...item, quantity } : item
    );
    saveCart(updatedCart);
  };

  // total number of the item in the cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // total price of item in the cart
  // const cartTotal = cart.reduce(
  //   (total, item) =>
  //     total + (item?.saleInfo.listPrice.amount || 0) * item.quantity,
  //   0
  // );

  const isInCartList = (id: string) => {
    return cart.some((b) => b.id === id);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isInCartList,
        cartCount,
        saveCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// custom hook for cartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Context must be used");
  }
  return context;
};
