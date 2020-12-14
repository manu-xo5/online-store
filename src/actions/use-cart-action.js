import { useUser } from "context/user";
import { useHistory } from "react-router-dom";

export default () => {
  const {
    dispatch,
    userState: { cart },
    userState,
  } = useUser();
  const history = useHistory()
  return {
    cart,
    addToCart: (pid) => {
      if (userState.displayName) {
        dispatch({
          type: "ADD_ITEM_TO_CART",
          payload: {
            pid,
          },
        });
      }else {
        history.push('/signin')
      }
    },
  };
};
