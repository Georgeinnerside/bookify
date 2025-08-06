"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import getHighResImage from "@/app/utils/helpers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CartClient() {
  const router = useRouter();
  const { cart, updateQuantity, clearCart } = useCart();

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const delivery = 5;
  const total = subTotal + delivery;

  if (cart.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-gray-700 text-center font-bold">
          Oops your Cart is empty! ):
        </p>
      </div>
    );

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 m-7">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="text-blue-600 text-xl cursor-pointer"
        >
          <ArrowBackIcon />
        </button>
        <h2 className="text-gray-700 text-lg font-semibold">My Cart</h2>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-600 text-sm font-semibold cursor-pointer"
        >
          clear
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 bg-gray-50 rounded-xl p-3 items-start"
          >
            <div className="relative w-20 h-28 rounded overflow-hidden flex-shrink-0">
              <Image
                src={getHighResImage(item.image)}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500">{item.authors}</p>
                <p className="text-green-700 font-semibold text-sm mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full border text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-gray-600 text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full border text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 text-gray-700">
        <div className="flex justify-between text-sm mb-2">
          <span>Sub total</span>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span>Delivery Fee</span>
          <span>${delivery.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
       className="w-full bg-blue-600 text-white py-4 rounded-xl text-base font-semibold hover:bg-blue-700 transition cursor-pointer">
        Process To Check Out
      </button>
    </div>
  );
}
