import LayoutScreen from '../page/layout/LayoutScreen';
<<<<<<< HEAD
import HomeScreen from '../page/home';
import ProductPage from '../page/Product-page/ProductPage';
import Blending from '../page/blending/BlendingPage';
import ContactPage from '../page/contact/ContactPage';
import ProfileSetting from '../page/profile_setting'
import AccountPage from '../page/account/AccountPage'
import SignUpPage from '../page/signup/SignUpPage'
import SignInPage from '../page/signin/signInPage'
import Checkout from '../page/checkout';
=======
import HomeScreen from '../page/userPage/home';
import ProductPage from '../page/userPage/Product-page/ProductPage';
import Blending from '../page/userPage/blending/BlendingPage';
import ContactPage from '../page/userPage/contact/ContactPage';
import AccountPage from '../page/userPage/account/AccountPage'
import Checkout from '../page/userPage/checkout';
import EditProductDetailPage from '../page/adminPage/editProductDetails/editProductsDetailPage';
import OrderManagementPage from '../page/adminPage/orderManagementPage/orederMagementPage';
import RevenuePage from '../page/adminPage/revenuePage/RevenuePage';
>>>>>>> develop

const routes = [
  {
    path: '/',
    element: <LayoutScreen />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: 'blending', element: <Blending /> },
      { path: 'product', element: <ProductPage /> },
      { path: 'contact', element: <ContactPage /> },
<<<<<<< HEAD
      { path: 'profile', element: <ProfileSetting /> },
=======
>>>>>>> develop
      { path: 'account', element: <AccountPage /> },
      { path: 'signin', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage />},
      { path: 'checkout', element: <Checkout /> },
      { path: 'admin/revenue', element: <RevenuePage /> },
      { path: 'admin/orders', element: <OrderManagementPage /> },
      { path: 'admin/edit-product', element: <EditProductDetailPage /> },
    ],
  },
];

export default routes;
