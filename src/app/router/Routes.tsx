import {Navigate, createBrowserRouter} from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";

export const router = createBrowserRouter([ // đây là BrowserRouter
    {
        path: '/',
        element: <App />,
        children: [
            // path: 'đặt tên đường dẫn để link vào Route', element: <Route />
            {path: '', element: <HomePage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'basket', element: <BasketPage />},
            {path: '*', element: <Navigate replace to='/not-found'/>} // nếu title nào chưa gắn link để chuyển đên Route, thì nó sẽ tự động chuyển đến Route NotFound
        ]
    }
])