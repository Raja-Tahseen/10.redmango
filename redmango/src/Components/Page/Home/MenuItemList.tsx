import { useState, useEffect } from "react";
import { menuItemModel } from "../../../Interfaces";
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery } from "../../../Apis/menuItemApi";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../Common";
import { RootState } from "../../../Storage/Redux/store";

function MenuItemList() {
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null); // Calls useGetMenuItemsQuery() to fetch the menu items. The data object contains the fetched results, and isLoading indicates the loading state.

  const searchValue = useSelector(
    (state:RootState) => state.menuItemStore.search
  );

  useEffect(() => {
    if (data && data.result) {
      //handleFilters();
    }
  },[searchValue]);

  const handleFilters = (search: string) => {
    let tempMenuItems = [...data.result];

    //search FUnctionality
    if (search) {
      const tempSearchMenuItems = [...tempMenuItems];
      tempMenuItems = tempSearchMenuItems.filter((item: menuItemModel) => item.name.toUpperCase().includes(search.toUpperCase()));
    }
    return tempMenuItems;
  };

  

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result)); //Once data is populated with the fetched response. The useEffect hook is triggered, and dispatch(setMenuItem(data.result)) stores the data in Redux.
    }
  }, [isLoading]);
  if (isLoading) {
    return (
      <div>
        <MainLoader />
      </div>
    );
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
