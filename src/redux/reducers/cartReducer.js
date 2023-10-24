const initialUserState = {
  cart:
    typeof window !== "undefined" &&
    JSON.parse(localStorage?.getItem("LEARN_WEB_CART")),
  totalPrice: 0,
};

const cartReducer = function (state = initialUserState, action) {
  switch (action.type) {
    case "SET_CART":
      let totalPrice = 0;
      action.payload?.forEach((item) => {
        let total = item.amount * item.product_count;
        totalPrice += total;
      });
      return { ...state, totalPrice, cart: action.payload };

    case "ADD_TO_CART":
      if (state.cart === null) {
        state.cart = [];
      }
      if (
        state.cart?.find((item) => item.id === action.payload.id) !== undefined
      ) {
        return state;
      }

      console.log(state);
      state = {
        cart: [...state.cart, { ...action.payload, count: 1 }],
        totalPrice: Number(state.totalPrice) + Number(action.payload.price),
      };
      return { ...state };
    case "INCREMENT_ITEM_CONT":
      if (state.cart === null) {
        state.cart = [];
      }

      state = {
        ...state,
        cart: state.cart.filter((item) => {
          if (item.id == action.payload) {
            ++item.count;
            state.totalPrice = Number(state.totalPrice) + Number(item.price);
          }
          return item;
        }),
      };

      return { ...state };

    case "DECREMENT_ITEM_CONT":
      if (state.cart === null) {
        state.cart = [];
      }

      state.cart = state.cart.filter((item) => {
        if (item.id == action.payload) {
          --item.count;
          state.totalPrice = Number(state.totalPrice) - Number(item.price);
          if (item.count <= 0) {
            return;
          }
        }
        return item;
      });

      return { ...state };
    case "REMOVE_ITEM":
      if (state.cart === null) {
        state.cart = [];
      }
      state.cart = state.cart.filter((item) => {
        console.log(item);
        if (item.id == action.payload) {
          state.totalPrice -= Number(item.price) * Number(item.count);
          return null;
        }
        return item;
      });

      return { ...state };
  }
  return state;
};

export default cartReducer;
