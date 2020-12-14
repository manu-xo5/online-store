import React from "react";
import { List } from "components/utilities";
import { Button } from "components/Form";
import { useUser } from "context/user";

import {
  SearchDB as SEARCh_DB_JSON,
  CAROSEL_ITEMS,
} from "../../../constants/fake-database";
const DB = [...JSON.parse(SEARCh_DB_JSON), ...CAROSEL_ITEMS];

export default () => {
  const {
    dispatch,
    userState: { cart },
  } = useUser();
  const itemInCart = DB.filter((item) => cart.includes(item.iid || item.id));

  if (itemInCart.length === 0) return <h1>No Item in Cart</h1>;

  return (
    <main id="cart">
      <h1>Cart</h1>
      <List
        Parent={false}
        list={itemInCart}
        render={({ title, imgUrl, manufacturer, price, desc, iid, id }) => (
          <article key={iid || id}>
            <img src={imgUrl || "//picsum.photos/300"} alt={title} />
            <div>
              <h2>{title}</h2>
              <p>{manufacturer || desc}</p>
              <br />
              <h3>Price: {price || Math.floor(Math.random() * 500)}</h3>
              <div>
                <Button.Primary>Checkout</Button.Primary>{" "}
                <Button.Secondary
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_ITEM_FROM_CART",
                      payload: { id: id || iid },
                    })
                  }
                >
                  Remove
                </Button.Secondary>
              </div>
            </div>
          </article>
        )}
      />
    </main>
  );
};
