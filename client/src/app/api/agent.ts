import axios, { AxiosError, AxiosResponse } from "axios";
import { PaginatedResponse } from "../models/pagination";

import { toast } from "react-toastify";
import { User } from "../models/user";
import { Product } from "../models/product";
import { Shop } from "../models/shop";
import { Category } from "../models/category";
import { Operation } from "../models/operation";
import { store } from "../store/configureStore";
import customHistory from "../layout/history";
import { signOut } from "../slices/accountSlice";
import { ShopAgent } from "../models/shopAgent";
import { OperationElement } from "../models/OperationElement";
import { ShopPayment } from "../models/shopPayment";
import { ShopTransaction } from "../models/shopTransaction";
import { ProductBatch } from "../models/ProductBatch";

const sleep = () => new Promise(resolve => setTimeout(resolve, 50));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const { user, shopId } = store.getState().account;
    const token = user?.token;
    const notAuth = config.url && !config.url.includes("Account/login") && !config.url.includes("Account/register") && !config.url.includes("Account/me")

    if (config.headers) {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (shopId && notAuth) {
            config.headers["X-SHOP"] = shopId;
        }
    }

    return config;
});

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === "development") {
        await sleep();
    }

    // const pagination = response.headers["pagination"];
    // if (pagination) {
    //     response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
    //     return response;
    // }

    return response;
}, (error: AxiosError<any, any>) => {

    if (error.response) {
        const { data, status, headers } = error.response;

        switch (status) {
            case 400:
                if (data.errors) {

                    const modelStateErrors: any[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(key)
                        }
                    }
                    throw modelStateErrors.flat();
                }
                toast.error(data.title)
                break;

            case 401:
                if (status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
                    store.dispatch(signOut());
                    toast.error('Session expired - please login again');
                }
                break;

            case 403:
                toast.error("You are not allowed")
                break;

            case 404:
                customHistory.push('/not-found', data);
                break;

            case 500:
                customHistory.push('/server-error', data);
                break;

            default:
                break;
        }
    }
    return Promise.reject(error.response);
})

const requests = {
    get: <T>(url: string, params?: URLSearchParams) => axios.get<T>(url, { params }).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    patch: <T>(url: string, body: {}) => axios.patch<T>(url, body).then(responseBody),
    delete: <T>(url: string, body?: {}) => axios.delete<T>(url, body).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(responseBody),
}

function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key])
    }
    return formData
}

const Account = {
    login: (values: any) => requests.post<User>('Account/login', values),
    register: (values: any) => requests.postForm('Account/register', createFormData(values)),
    currentUser: () => requests.get<User>('Account/me'),
    createProfile: (values: any) => requests.postForm('Account/profile', createFormData(values)),
    editProfile: (values: any) => requests.putForm('Account/profile', createFormData(values)),
}

const Agents = {
    get: (agentId: string) => requests.get<ShopAgent>(`Agents/${agentId}`),
    list: (params: URLSearchParams) => requests.get<ShopAgent[]>(`Agents`, params),
    listFull: (params: URLSearchParams) => requests.get<ShopAgent[]>(`Agents/list`, params),
    create: (values: any) => requests.postForm(`Agents`, createFormData(values)),
    update: (agentId: string, values: any) => requests.putForm(`Agents/${agentId}`, createFormData(values)),
    delete: (agentId: string) => requests.delete(`Agents/${agentId}`),
}

const Categories = {
    list: () => requests.get<Category[]>(`Categories`),
    create: (values: any) => requests.post<Category>(`Categories`, values),
    update: (categoryId: string, values: any) => requests.put<Category>(`Categories/${categoryId}`, values),
    delete: (categoryId: string) => requests.delete(`Categories/${categoryId}`),
}

const Operations = {
    get: (operationId: string) => requests.get<Operation>(`Operations/${operationId}`),
    list: (params: URLSearchParams) => requests.get<Operation[]>(`Operations`, params),
    create: (values: any) => requests.post(`Operations`, values),
    update: (values: any) => requests.post(`Operations`, values),
    delete: (operationId: string) => requests.delete(`Operations/${operationId}`),
}

const Orders = {
    get: (operationId: string) => requests.get<Operation>(`Orders/${operationId}`),
    list: () => requests.get<Operation[]>(`Orders`),
    update: (operations: any) => requests.post(`Orders`, operations),
    delete: (operationId: string) => requests.delete(`Orders/${operationId}`),
}

const Payments = {
    list: (agentId: string) => requests.get<ShopPayment[]>(`Payments/${agentId}`),
    create: (values: any) => requests.postForm(`Payments`, createFormData(values)),
    delete: (paymentId: string) => requests.delete(`Payments/${paymentId}`),
}

const Products = {
    get: (productId: string) => requests.get<Product>(`Products/${productId}`),
    list: (params: URLSearchParams) => requests.get(`Products`, params),
    listAll: () => requests.get<Operation[]>(`Products/list`),
    listPurchases: (productId: string) => requests.get<OperationElement[]>(`Products/${productId}/purchases`),
    listBatches: (productId: string) => requests.get<ProductBatch[]>(`Products/${productId}/batches`),
    create: (values: any) => requests.postForm(`Products`, createFormData(values)),
    update: (productId: string, values: any) => requests.putForm(`Products/${productId}`, createFormData(values)),
    delete: (productId: string) => requests.delete(`Products/${productId}`),
}

const Shops = {
    list: (params: URLSearchParams) => requests.get<Shop[]>(`Shops/`, params),
    get: () => requests.get<Shop[]>(`Shops/me`),
    create: (values: any) => requests.postForm(`Shops`, createFormData(values)),
    update: (values: any) => requests.putForm(`Shops`, createFormData(values)),
    delete: () => requests.delete(`Shops`),
    setOwner: (userId: string) => requests.put<Shop>(`Shops/setOwner`, { userId }),
}

const Transactions = {
    list: (params: URLSearchParams) => requests.get<ShopTransaction[]>(`Transactions`, params),
    create: (values: any) => requests.post<ShopTransaction>(`Transactions`, values),
    delete: (transactionId: string) => requests.delete(`Transactions/${transactionId}`),
}

const agent = {
    Account,
    Agents,
    Categories,
    Operations,
    Orders,
    Payments,
    Products,
    Shops,
    Transactions
}

export default agent;