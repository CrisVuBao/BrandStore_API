import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { router } from "../router/Routes";
import { resolve } from "path";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';
// Khi bạn đặt axios.defaults.withCredentials = true;, bạn đang thông báo cho Axios rằng bạn muốn gửi các yêu cầu với thông tin xác thực đi kèm. Điều này là hữu ích trong trường hợp bạn đang làm việc với một ứng dụng web có tính chất đăng nhập và bạn muốn chia sẻ thông tin xác thực giữa các tên miền khác nhau.
axios.defaults.withCredentials = true; // ủy nhiệm phần cookies cho React quản lý, khi bấm vào ADD TO CART thì buyerId sẽ tự sinh ra trong Cookies

const responseBody = (response: AxiosResponse) => response.data

// đây là đoạn code xử lý yêu cầu, phản hồi từ máy chủ bằng Interceptor
 axios.interceptors.response.use(async Response => {
    await sleep();
    return Response
 }, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            router.navigate('/server-error', {state: {error: data}}) // /server-error là khi bấm vào button có status là 400, thì sẽ chuyển đến Route server-error
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}});
            break;    
        default:
            break;
    }

    return Promise.reject(error.response);
 })

const requests = {
    get: (url: string) => axios.get(url).then(responseBody), // Lambda Expression
    post: (url: string) => axios.post(url).then(responseBody), // Lambda Expression
    put: (url: string) => axios.put(url).then(responseBody), // Lambda Expression
    delete: (url: string) => axios.delete(url).then(responseBody) // Lambda Expression
}

const Catalog = {
    // đây là cách truyền thống
    list: () => {
        return requests.get('Products');
    },
    // đây là cách nhanh gọn theo kiểu lambda
    details: (id: number) => requests.get(`Products/${id}`)
}

const TestErrors = { // đây là đối tượng(object)
    get400Error: () => requests.get('Buggy/bad-request'),
    get401Error: () => requests.get('Buggy/unauthoried'),
    get404Error: () => requests.get('Buggy/not-found'),
    get500Error: () => requests.get('Buggy/server-error'),
    getValidationError: () => requests.get('Buggy/validation-error')
}

const Basket = {
    get: () => requests.get('Basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`),
    removeItem: (productId: number, quantity = 1) => requests.delete(`Basket?productId=${productId}&quantity=${quantity}`)
}

const agentMain = {
    Catalog,
    TestErrors,
    Basket
}

export default agentMain;