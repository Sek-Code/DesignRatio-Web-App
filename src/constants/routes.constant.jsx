import LayoutScreen from '../page/layout/LayoutScreen';
import HomeScreen from '../page/home';
import ProductPage from '../page/Product-page/ProductPage';
import Blending from '../page/blending/Blending';
import ContactPage from '../page/contact/ContactPage';
import ProfileSetting from '../page/profile_setting';
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
      { path: 'checkout', element: <Checkout /> },
    ],
  },
];

export default routes;
