import LayoutScreen from '../page/layout/LayoutScreen';
import HomeScreen from '../page/userPage/home';
import ProductPage from '../page/userPage/Product-page/ProductPage';
import Blending from '../page/userPage/blending/BlendingPage';
import ContactPage from '../page/userPage/contact/ContactPage';
import AccountPage from '../page/userPage/account/AccountPage'
import Checkout from '../page/userPage/checkout';
import SignInPage from '../page/userPage/signin/SignInPage';
import SignUpPage from '../page/userPage/signup/SignUpPage';
import EditProductDetailPage from '../page/adminPage/editProductDetails/editProductsDetailPage';
import OrderManagementPage from '../page/adminPage/orderManagementPage/orederMagementPage';
import RevenuePage from '../page/adminPage/revenuePage/RevenuePage';
import EditP from '@/page/adminPage/editProductDetails/EditP';
import MemberPage from '@/page/adminPage/memberPage/MemberPage';
import EditMember from '@/page/adminPage/memberPage/EditMember';
import AddAdmin from '@/page/adminPage/memberPage/AddAdmin';

const routes = [
  {
    path: '/',
    element: <LayoutScreen />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: 'blending', element: <Blending /> },
      { path: 'products', element: <ProductPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'signin', element: <SignInPage />},
      { path: 'signup', element: <SignUpPage />},
      { path: 'admin/revenue', element: <RevenuePage /> },
      { path: 'admin/orders', element: <OrderManagementPage /> },
      { path: 'admin/edit-products', element: <EditProductDetailPage /> },
      { path: 'admin/edit-product/:id', element: <EditP/> },
      { path: 'admin/members', element: <MemberPage/>},
      { path: 'admin/members/:id', element: <EditMember/>},
      { path: 'admin/members/add-admin', element: <AddAdmin/>}
    ],
  },
];

export default routes;
