import orderDetail from "./orderDetail";

export default interface orderHeader {
    orderHeaderId?: number;
    pickupName?: string;
    pickupPhoneNumber?: string;
    pickupEmail?: string;
    applicationUserId?: string;
    user?: any;
    orderTotal?: number;
    orderDate?: Date;
    stripePaymentIntendID?: string;
    status?: string;
    totalItems?: number;
    orderDetails?: orderDetail[];
}