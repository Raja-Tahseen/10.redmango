import { withAdminAuth } from "../../HOC";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import OrderList from "../../Components/Page/Order/OrderList";
import { MainLoader } from "../../Components/Page/Common";
import { SD_Status } from "../../Utility/SD";
import { inputHelper } from "../../Helper";
import { useState, useEffect } from "react";
import { orderHeaderModel } from "../../Interfaces";


const filterOptions = [
  "All",
  SD_Status.CONFIRMED,
  SD_Status.BEING_COOKED,
  SD_Status.READY_FOR_PICKUP,
  SD_Status.CANCELLED,
  SD_Status.COMPLETED,
];

function AllOrders() {
  //const { data, isLoading } = useGetAllOrdersQuery("");
  
  const [orderData, setOrderData] = useState([]);
  const [filters, setFilters] = useState({searchString: "", status: "" });
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
  });
  const [apiFilters, setApiFilters] = useState({
    searchString: "",
    status: "",
  });

  const { data, isLoading } = useGetAllOrdersQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      status: apiFilters.status,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
    }),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempValue = inputHelper(e, filters);
    setFilters(tempValue);
  };

  const handleFilters = () => {
    // const tempData = data.result.filter((orderData: orderHeaderModel) => {
    //   if (
    //     (orderData.pickupName &&
    //       orderData.pickupName.includes(filters.searchString)) ||
    //     (orderData.pickupEmail &&
    //       orderData.pickupEmail.includes(filters.searchString)) ||
    //     (orderData.pickupPhoneNumber &&
    //       orderData.pickupPhoneNumber.includes(filters.searchString))
    //   ) {
    //     return orderData;
    //   }

    setApiFilters({
      searchString: filters.searchString,
      status: filters.status,
    });

    // const finalArray = tempData.filter((orderData: orderHeaderModel) =>
    //   filters.status !== "" ? orderData.status === filters.status : orderData
    // );
    // setOrderData(finalArray);
  };

  useEffect(() => {
    if (data) {
      setOrderData(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  const getPageDetails = () => {
    const dataStartNumber =
      (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartNumber}
             - 
            ${
              dataEndNumber < totalRecords ? dataEndNumber : totalRecords
            } of ${totalRecords}`;
  };

  const handlePaginationClick = (direction: string) => {
    if (direction === "prev") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber - 1 });
    } else if (direction === "next") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber + 1 });
    }
  };



  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>{totalRecords}
        <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
          <h1 className="text-success">Orders List</h1>
          <div className="d-flex" style={{ width: "40%" }}>
            <input
              type="text"
              className="form-control mx-2"
              placeholder="Search Name, Email or Phone"
              name="searchString"
              onChange={handleChange}
            />
            <select 
              className="form-select w-50 mx-2"
              onChange={handleChange}
              name="status">
                {filterOptions.map((item, index) => (
                  <option key={index} value={item == "All" ? "" : item}>{item}</option>
                ))}              
            </select>
            <button 
            className="btn btn-outline-success"
            onClick={handleFilters}>Filter</button>
          </div>
        </div>
        <OrderList isLoading={isLoading} orderData={orderData} />
        <div className="d-flex mx-5 justify-content-end align-items-center">
            <div className="mx-2">{getPageDetails()}</div>
            <button
              onClick={() => handlePaginationClick("prev")}
              disabled={pageOptions.pageNumber === 1}
              className="btn btn-outline-primary px-3 mx-2"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              onClick={() => handlePaginationClick("next")}
              disabled={
                pageOptions.pageNumber * pageOptions.pageSize >= totalRecords
              }
              className="btn btn-outline-primary px-3 mx-2"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
      </>
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);
