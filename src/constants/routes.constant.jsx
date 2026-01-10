import LayoutScreen from '../page/layout/LayoutScreen';
import HomeScreen from '../page/userPage/home';
import ProductPage from '../page/userPage/Product-page/ProductPage';
import Blending from '../page/userPage/blending/BlendingPage';
import ContactPage from '../page/userPage/contact/ContactPage';
// import ProfileSetting from '../page/profile_setting'
import AccountPage from '../page/userPage/account/AccountPage'
import Checkout from '../page/userPage/checkout';

const routes = [
  {
    path: '/',
    element: <LayoutScreen />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: 'blending', element: <Blending /> },
      { path: 'product', element: <ProductPage /> },
      { path: 'contact', element: <ContactPage /> },
      // { path: 'profile', element: <ProfileSetting /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'checkout', element: <Checkout /> },
    ],
  },
];

export default routes;
