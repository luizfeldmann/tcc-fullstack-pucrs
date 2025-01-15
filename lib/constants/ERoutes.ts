export enum ERoutes {
  Index = "/",
  About = "/about",
  Login = "/login",
  Logout = "/logout",
  Signup = "/signup",
  Verify = "/verify",
  ChangePassword = "/change-password",
  ForgotPassword = "/forgot-password",
  Dashboard = "/dashboard",
  Account = "/dashboard/account",
  Transactions = "/dashboard/transactions",
  Deposit = "/dashboard/deposit",
  Stores = "/dashboard/stores",
  StoreDetails = "/dashboard/stores/",
  Products = "/dashboard/products",
  ProductDetails = "/dashboard/products/",
}

export function StoreDetailsURL(id: string) {
  return ERoutes.StoreDetails + id;
}

export function ProductDetailsURL(id: string) {
  return ERoutes.ProductDetails + id;
}
