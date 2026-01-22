import LayoutScreen from '../page/layout/LayoutScreen';
import HomeScreen from '../page/userPage/home';
import ProductPage from '../page/userPage/Product-page/ProductPage';
import Blending from '../page/userPage/blending/BlendingPage';
import ContactPage from '../page/userPage/contact/ContactPage';
import AboutUsPage from '../page/userPage/about/AboutUsPage';
import AccountPage from '../page/userPage/account/AccountPage'
import Checkout from '../page/userPage/checkout';
import SignInPage from '../page/userPage/signin/SignInPage';
import SignUpPage from '../page/userPage/signup/SignUpPage';
import OrderManagementPage from '../page/adminPage/orderManagementPage/orederMagementPage';
import RevenuePage from '../page/adminPage/revenuePage/RevenuePage';
import EditProduct from '@/page/adminPage/editProductDetails/EditProduct';
import MemberPage from '@/page/adminPage/memberPage/MemberPage';
import EditMember from '@/page/adminPage/memberPage/EditMember';
import AddAdmin from '@/page/adminPage/memberPage/AddAdmin';
import AddProduct from '@/page/adminPage/editProductDetails/AddProduct';
import AdminGuard from './adminGuard';
import ProductPagePage from '@/page/adminPage/editProductDetails/ProductPagePage';

const routes = [
  {
    path: '/',
    element: <LayoutScreen />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: 'blending', element: <Blending /> },
      { path: 'products', element: <ProductPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'about', element: <AboutUsPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'account/:id', element: <AccountPage /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'signin', element: <SignInPage />},
      { path: 'signup', element: <SignUpPage />},
      
      {
        element: <AdminGuard />,   
        children: [
          { path: 'admin/revenue', element: <RevenuePage /> },
          { path: 'admin/orders', element: <OrderManagementPage /> },
          { path: 'admin/edit-products', element: <ProductPagePage /> },
          { path: 'admin/edit-product/:id', element: <EditProduct /> },
          { path: 'admin/members', element: <MemberPage /> },
          { path: 'admin/members/:id', element: <EditMember /> },
          { path: 'admin/members/add-admin', element: <AddAdmin /> },
          { path: 'admin/products/add-product/:id', element: <AddProduct /> },
          { path: 'admin/edit-products/add-product', element: <AddProduct /> },
        ],
      }
    ],
  },
];

export default routes;
