import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'https://localhost:44386/api/';

const responseBody = (response: AxiosResponse) => {
    return response.data;
}

const requests = {
    get: (url: string) => axios.get(url).then(responseBody), // Lambda Expression
    post: (url: string) => axios.post(url).then(responseBody), // Lambda Expression
    put: (url: string) => axios.put(url).then(responseBody), // Lambda Expression
    delete: (url: string) => axios.delete(url).then(responseBody) // Lambda Expression
}

const Catalog = {
    // đây là cách truyền thống
    list: () => {
        return requests.get('products');
    },
    // đây là cách nhanh gọn theo kiểu lambda
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = { // đây là đối tượng(object)
    get400Error: () => requests.get('byggy/not-found'),
    get401Error: () => requests.get('byggy/unauthorised'),
    get404Error: () => requests.get('byggy/not-found'),
    get500Error: () => requests.get('byggy/server-error'),
    getValidationError: () => requests.get('byggy/validation-error')
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;