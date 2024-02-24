import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import productReducer from "./Reducers/productReducer";
import sellerReducer from "./Reducers/sellerReducer";
import chatReducer from "./Reducers/chatReducer";
import orderReducer from "./Reducers/orderReducer";
import paymentReducer from "./Reducers/paymentReducer";
import dashboardReducer from "./Reducers/dashboardReducer";
import couponReducer from "./Reducers/couponReducer";
const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  seller: sellerReducer,
  chat: chatReducer,
  order: orderReducer,
  payment: paymentReducer,
  dashboard: dashboardReducer,
  coupon: couponReducer,
};
export default rootReducer;
