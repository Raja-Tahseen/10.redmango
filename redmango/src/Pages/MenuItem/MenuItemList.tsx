import { useGetMenuItemsQuery, useDeleteMenuItemMutation } from "../../Apis/menuItemApi";
import { useDispatch } from "react-redux";
import { MainLoader } from "../../Components/Page/Common";
import { setMenuItem } from "../../Storage/Redux/menuItemSlice";
import { menuItemModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
// import { toastNotify } from "../../Helper";
import { toast } from "react-toastify";

function MenuItemList() {
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteMenuItem] = useDeleteMenuItemMutation();

  const handleMenuItemDelete = (id: number) => {
    toast.promise(deleteMenuItem(id),{
      pending: 'Processing your request...',
      success: 'Menu Item Deleted Successfully',
      error: 'Error Encountered..'
    },
    {
      theme : "dark"
    }
  );
    // deleteMenuItem(id);
    // toastNotify("Item Menu Delated Successfully", "warning");
  }

  return (
    <>
    {isLoading && <MainLoader />}
    {!isLoading && (
        <div className="table p-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="text-success">MenuItem List</h1>
          <button className="btn btn-success"
          onClick={() => navigate("/menuItem/menuItemUpsert/")}>Add New Menu Item</button>
        </div>
        <div className="p-2">
          <div className="row border">
            <div className="col-1">Image</div>
            <div className="col-1">ID</div>
            <div className="col-3">Name</div>
            <div className="col-2">Category</div>
            <div className="col-1">Price</div>
            <div className="col-2">Special Tag</div>
            <div className="col-1">Action</div>
          </div>
          {data.result.length > 0 &&
            data.result.map((menuItem: menuItemModel, index: number) => {
              return (
                <div className="row border" key={menuItem.id}>
                  <div className="col-1">
                    <img
                      src={`https://localhost:7181/images/${menuItem.image}`}
                      alt={menuItem.name}
                      style={{ width: "100%", maxWidth: "120px" }}
                    />
                  </div>
                  <div className="col-1">{menuItem.id}</div>
                  <div className="col-3">{menuItem.name}</div>
                  <div className="col-2">{menuItem.category}</div>
                  <div className="col-1">{menuItem.price}</div>
                  <div className="col-2">{menuItem.specialTag}</div>
                  <div className="col-1">
                    <button className="btn btn-success">
                      <i className="bi bi-pencil-fill"
                      onClick={() => navigate("/menuItem/menuItemUpsert/" + menuItem.id)}></i>
                    </button>
                    <button className="btn btn-danger mx-2">
                      <i className="bi bi-trash-fill" onClick={() => handleMenuItemDelete(menuItem.id)}></i>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    )}
      
    </>
  );
}

export default MenuItemList;
