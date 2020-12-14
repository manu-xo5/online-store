import React from "react";
import { FT_ITEMS } from "../constants/fake-database";

import {List} from "../components/utilities";
import {FtItem} from "../components/FeaturedPage";

const FeaturedPage = () => (
  <div id="featured">
    <h2>Featured Products</h2>
    <List
      className="items"
      list={FT_ITEMS}
      render={(item, i) => <FtItem key={item} title={item} src={i + 1} />}
    />
  </div>
);

export default FeaturedPage;
