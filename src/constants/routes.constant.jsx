import LayoutScreen from '../page/layout/LayoutScreen';
import HomeScreen from '../page/home';
import ProductPage from '../page/Product-page/ProductPage';
import BlendingPage from '../page/blending/BlendingPage';
import ContactPage from '../page/contact/ContactPage';

const routes = [
  {
    path: '',
    element: <LayoutScreen />,
    children: [
      { path: '/', element: <HomeScreen /> },
      { path: '/blending', element: <BlendingPage /> },
      { path: '/product', element: <ProductPage /> },
      { path: '/contact', element: <ContactPage /> },
    ],
  },
];

export default routes;
