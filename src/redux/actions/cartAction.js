import {
  addToCart,
  removeFromCart,
  shippingInfo,
} from "../reducers/cartReducer";
import { attachTokenToRequests, axiosInstance } from "../../constants";

export const addItemsCart = (id, quantity) => async (dispatch, getState) => {
  try {
    attachTokenToRequests();
    const { data } = await axiosInstance.get(`/api/ecommerce/v1/product/${id}`);
    const product = data.product;
    const { price, discount } = product;
    const discountedPrice =
      discount > 0 ? price - price * (discount / 100) : price;
    const totalPrice = discountedPrice * quantity;
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        details: product.description,
        actualPrice: product.price,
        price: discountedPrice,
        discount: product.discount,
        image: product.images[0].url,
        stock: product.stock,
        quantity,
        totalPrice,
      })
    );
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log("An Error for Add to Cart", error);
  }
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch(
    removeFromCart({
      id,
    })
  );
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => (dispatch) => {
  dispatch(shippingInfo(data));
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
