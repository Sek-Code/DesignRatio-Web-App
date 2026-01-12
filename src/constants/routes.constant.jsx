import LayoutScreen from '../page/layout/LayoutScreen';
import HomeScreen from '../page/home';
import ProductPage from '../page/Product-page/ProductPage';
import Blending from '../page/blending/BlendingPage';
import ContactPage from '../page/contact/ContactPage';
import ProfileSetting from '../page/profile_setting'
import AccountPage from '../page/account/AccountPage'
import SignUpPage from '../page/signup/SignUpPage'
import SignInPage from '../page/signin/signInPage'
import Checkout from '../page/checkout';

const routes = [
  {
    path: '/',
    element: <LayoutScreen />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: 'blending', element: <Blending /> },
      { path: 'product', element: <ProductPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'profile', element: <ProfileSetting /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'signin', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage />},
      { path: 'checkout', element: <Checkout /> },
    ],
  },
];

export default routes;
