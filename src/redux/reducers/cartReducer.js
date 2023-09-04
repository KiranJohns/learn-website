const initialUserState = {
  cart:
    typeof window !== "undefined" &&
    JSON.parse(localStorage?.getItem("LEARN_WEB_CART")),
  totalPrice:
    typeof window !== "undefined" &&
    JSON.parse(localStorage?.getItem("LEARN_WEB_CART"))?.reduce(
      (value, currentValue) => {
        let total = currentValue.price * currentValue.count;
        return value + total;
      },
      0
    ),
};

const cartReducer = function (state = initialUserState, action) {
  switch (action.type) {
    case "INCREMENT_CART_ITEM_COUNT":
      return Object.assign({}, state, { newsDetails: action.newsDetails });
    case "ADD_TO_CART":
      if (state.cart === null) {
        state.cart = [];
      }
      if (
        state.cart?.find((item) => item.id === action.payload.id) !== undefined
      ) {
        return state;
      }

      state = {
        cart: [...state.cart, { ...action.payload, count: 1 }],
        totalPrice: Number(state.totalPrice) + Number(action.payload.price),
      };
      localStorage?.setItem("LEARN_WEB_CART", JSON.stringify(state.cart));
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
      localStorage?.setItem("LEARN_WEB_CART", JSON.stringify(state.cart));

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
      localStorage?.setItem("LEARN_WEB_CART", JSON.stringify(state.cart));

      return { ...state };
    case "REMOVE_ITEM":
      if (state.cart === null) {
        state.cart = [];
      }
      state.cart = state.cart.filter((item) => {
        if (item.id == action.payload) {
          state.totalPrice -= Number(item.price) * Number(item.count);
          return;
        }
        return item;
      });

      return { ...state };
  }
  return state;
};

export default cartReducer;
