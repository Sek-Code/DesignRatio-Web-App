import LayoutScreen from '../page/layout/LayoutScreen';
import HomeScreen from '../page/home';


const routes = [
    {
        path: '',
        element: <LayoutScreen />,
        children: [{path: '/', element: <HomeScreen />,}]
    }
]

export default routes;