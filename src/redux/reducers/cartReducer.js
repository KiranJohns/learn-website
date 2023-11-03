const initialUserState = {
  cart:
    typeof window !== "undefined" &&
    JSON.parse(localStorage?.getItem("learnfrocarecart")),
  totalPrice: 0,
  cartCount: 0,
  logedIn: typeof window !== "undefined" ? localStorage?.getItem("learnforcare_access") : "",
};

const cartReducer = function (state = initialUserState, action) {
  switch (action.type) {
    case "SET_CART":
      let cart = [];
      cart = action?.payload
        ? action?.payload
        : localStorage.getItem("learnfrocarecart");

      let totalPrice = 0;
      if (cart) {
        let newCart = JSON.parse(cart);

        let cartCount = 0

        newCart?.forEach((item) => {
          totalPrice += Number(item.amount);
          cartCount += Number(item.product_count)
        });

        console.log(cartCount);

        return { ...state, totalPrice, cart: newCart, cartCount };
      } else {
        return { ...state, totalPrice: 0, cart: [], cartCount: 0 };
      }

    case "ADD_TO_CART":
      if (state.cart === null) {
        state.cart = [];
      }
      if (
        state.cart?.find((item) => item.id === action.payload.course.id) !== undefined
      ) {
        return { ...state };
      } else {
        state = {
          cart: [
            ...state.cart,
            {
              ...action.payload.course,
              product_count: action.payload.count,
              course_id: action.payload.course.id,
              amount: action.payload.course.price,
            },
          ],
          cartCount: Number(state.cartCount + Number(action.payload.count)),
          totalPrice: Number(state.totalPrice) + (Number(action.payload.course.price) * Number(action.payload.count)),
        };
      }

      if (!state.logedIn) {
        localStorage.setItem("learnfrocarecart", JSON.stringify(state.cart));
      }

      return { ...state };
    case "INCREMENT_ITEM_CONT":
      try {
        if (state.cart === null) {
          state.cart = [];
        }

        console.log(action.payload);

        state = {
          ...state,
          cart: state.cart.filter((item) => {
            if (item.id == action.payload.id) {
              item.product_count += action.payload.count;
              item.amount = item.price * item.product_count;
              state.totalPrice = Number(state.totalPrice) + Number(item.price);
            }
            return item;
          }),
          cartCount: state.cartCount + action.payload.count
        };

        if (!state.logedIn) {
          localStorage.setItem("learnfrocarecart", JSON.stringify(state.cart));
        }

        return { ...state, cart: [...state.cart] };
      } catch (error) {
        console.log(error);
      }

    case "DECREMENT_ITEM_CONT":
      if (state.cart === null) {
        state.cart = [];
      }

      state.cart = state.cart.filter((item) => {
        if (item.id == action.payload) {
          --item.product_count;
          item.amount = item.price * item.product_count;
          state.totalPrice = Number(state.totalPrice) - Number(item.price);
        }

        if (item.product_count >= 1) {
          return item;
        }
      });

      if (!state.logedIn) {
        localStorage.setItem("learnfrocarecart", JSON.stringify(state.cart));
      }

      return { ...state,cartCount: Number(state.cartCount - 1) };
    case "REMOVE_ITEM":
      if (state.cart === null) {
        state.cart = [];
      }
      let product_count= 0
      state.cart = state.cart.filter((item) => {
        if (item.id == action.payload) {
          state.totalPrice -= Number(item.price) * Number(item.product_count);
          product_count = item.product_count
          return null;
        }
        return item;
      });

      if (!state.logedIn) {
        localStorage.setItem("learnfrocarecart", JSON.stringify(state.cart));
      }

      return { ...state, cart: [...state.cart],cartCount: Number(state.cartCount) - Number(product_count)};
  }
  return state;
};

export default cartReducer;
