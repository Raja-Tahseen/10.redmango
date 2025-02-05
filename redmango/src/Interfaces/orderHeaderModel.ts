import orderDetail from "./orderDetailModel";

export default interface orderHeaderModel {
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