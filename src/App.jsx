import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
const App = () => {
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