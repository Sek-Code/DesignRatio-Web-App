import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import LayoutScreen from './page/layout/LayoutScreen';
import { Outlet } from "react-router-dom";

// const App = () => {
//   return <RouterProvider router={router} />;
// };

// export default App () {
//   return (
//     <LayoutScreen />
//   );
// }

export default function App() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}