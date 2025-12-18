import { createBrowserRouter } from 'react-router-dom';
// สร้าง router object จาก configuration ที่เตรียมไว้
import routes from '../constants/routes.constant.jsx';
export const router = createBrowserRouter(routes);