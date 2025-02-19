export enum SD_Roles {
  ADMIN = "admin",
  CUSTOMER = "customer",
}

export enum SD_Status {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  BEING_COOKED = "Being Cooked",
  READY_FOR_PICKUP = "Ready For Pickup",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled", 
}

export enum SD_Categories {
  APPETIZER = "Appetizer",
  ENTREE = "Entrée",
  DESSERT = "Dessert",
  BEVERAGES = "Beverages",
}

export enum SD_SortTypes {
  PRICE_LOW_HIGH = "Price Low - High",
  PRICE_HIGH_LOW = "PRICE High - Low",
  NAME_A_Z = "Name A - Z",
  NAME_Z_A = "Name Z- A",
}
