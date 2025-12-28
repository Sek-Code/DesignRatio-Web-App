import LayoutScreen from '../page/layout/LayoutScreen';
import HomeScreen from '../page/home';
import ProductPage from '../page/Product-page/ProductPage';
import Blending from '../page/blending/Blending';
import ContactPage from '../page/contact/ContactPage';

const routes = [
  {
    path: '/',
    element: <LayoutScreen />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: 'blending', element: <Blending /> },
      { path: 'product', element: <ProductPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
];

export default routes;
