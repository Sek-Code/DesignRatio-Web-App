import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useUserStore } from "./store/userStore";
import { useEffect } from "react";



const App = () => {

  const {checkAuth} = useUserStore();
  
    useEffect(() => {
      checkAuth();
    }, []);
  return <RouterProvider router={router} />;
};
export default App;

// export default function App() {
//   return (
//     <div className="min-h-screen">
//       <Outlet />
//     </div>
//   );
// }