import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://localhost:44386/api/';

const responseBody = (response: AxiosResponse) => {
    return response.data;
}

// đây là đoạn code xử lý yêu cầu, phản hồi từ máy chủ bằng Interceptor
 axios.interceptors.response.use(async Response => {
    return Response
 }, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            toast.error(data.title);
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
    get400Error: () => requests.get('Buggy/not-found'),
    get401Error: () => requests.get('Buggy/unauthorised'),
    get404Error: () => requests.get('Buggy/not-found'),
    get500Error: () => requests.get('Buggy/server-error'),
    getValidationError: () => requests.get('byggy/validation-error')
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;