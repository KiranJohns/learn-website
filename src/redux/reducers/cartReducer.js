const initialUserState = {
  cart:
    typeof window !== "undefined" &&
    JSON.parse(localStorage?.getItem("learnfrocarecart")),
  totalPrice: 0,
};

const cartReducer = function (state = initialUserState, action) {
  switch (action.type) {
    case "SET_CART":
      let cart = localStorage.getItem("learnfrocarecart");
      let totalPrice = 0;
      if (cart) {
        let newCart = JSON.parse(cart);

        console.log(newCart);

        newCart?.forEach((item) => {
          totalPrice += Number(item.amount);
        });
        console.log(totalPrice);
        return { ...state, totalPrice, cart: newCart };
      } else {
        return { ...state, totalPrice, cart: [] };
      }

    case "ADD_TO_CART":
      if (state.cart === null) {
        state.cart = [];
      }
      if (
        state.cart?.find((item) => item.id === action.payload.id) !== undefined
      ) {
        return { ...state };
      } else {
        state = {
          cart: [
            ...state.cart,
            {
              ...action.payload,
              product_count: 1,
              course_id: action.payload.id,
              amount: action.payload.price
            },
          ],
          totalPrice: Number(state.totalPrice) + Number(action.payload.price),
        };
      }

      localStorage.setItem("learnfrocarecart", JSON.stringify(state.cart));
      
      return { ...state };
    case "INCREMENT_ITEM_CONT":
      try {
        if (state.cart === null) {
          state.cart = [];
        }

        state = {
          ...state,
          cart: state.cart.filter((item) => {
            if (item.id == action.payload) {
              ++item.product_count;
              item.amount = item.price * item.product_count
              state.totalPrice = Number(state.totalPrice) + Number(item.price);
            }
            return item;
          }),
        };
        
        localStorage.setItem("learnfrocarecart", JSON.stringify(state.cart));

        return { ...state,cart: [...state.cart] };
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
          item.amount = item.price * item.product_count
          state.totalPrice = Number(state.totalPrice) - Number(item.price);
        }

        if (item.product_count >= 1) {
          return item;
        }
      });

      localStorage.setItem("learnfrocarecart", JSON.stringify(state.cart));


      return { ...state };
    case "REMOVE_ITEM":
      if (state.cart === null) {
        state.cart = [];
      }
      state.cart = state.cart.filter((item) => {
        if (item.id == action.payload) {
          state.totalPrice -= Number(item.price) * Number(item.product_count);
          return null;
        }
        return item;
      });

      localStorage.setItem("learnfrocarecart", JSON.stringify(state.cart));

      return { ...state,cart: [...state.cart] };
  }
  return state;
};

export default cartReducer;
