import React from "react";
import { useState, useEffect } from "react";
import { menuItemModel } from "../../../Interfaces";
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery } from "../../../Apis/menuItemApi";
import { useDispatch } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../Common";

function MenuItemList() {
  //const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);// Calls useGetMenuItemsQuery() to fetch the menu items. The data object contains the fetched results, and isLoading indicates the loading state.

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));//Once data is populated with the fetched response. The useEffect hook is triggered, and dispatch(setMenuItem(data.result)) stores the data in Redux.
    }
  }, [isLoading]);
  if (isLoading){
    return <div><MainLoader /></div>
  }

  return (
    <div className="container row">
      {data.result.length > 0 &&
        data.result.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemList;
