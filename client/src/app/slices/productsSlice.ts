import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Category } from "../models/category";
import { MetaData } from "../models/pagination";
import { Product } from "../models/product";
import { ProductParams } from "../models/productParams";
import { RootState } from "../store/configureStore";

interface ShopState {
    productsLoaded: boolean;
    categoriesLoaded: boolean;
    categories: Category[];
    status: string;
    productParams: ProductParams;
    metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>({
    selectId: (product) => product.id,
});

export function getAxiosProductParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);
    if (productParams.searchTerm) {
        params.append('searchTerm', productParams.searchTerm);
    } else {
        params.delete('searchTerm');
    }

    if (productParams.categoryId && productParams.categoryId) {
        params.append('categoryId', productParams.categoryId.toString());
    } else {
        params.delete('categoryId');
    }

    if (productParams.showcase && productParams.showcase) {
        params.append('showcase', productParams.showcase.toString());
    } else {
        params.delete('showcase');
    }

    return params;
}


export const fetchProductsAsync = createAsyncThunk<
    Product[],
    void,
    { state: RootState }
>('shop/fetchProductsAsync', async (_, thunkApi) => {
    const productParams = thunkApi.getState().products.productParams;
    const params = getAxiosProductParams(productParams);
    try {
        const response: any = await agent.Products.list(params);
        const { items, ...metaData } = response;
        thunkApi.dispatch(setMetaData(metaData));
        return items;
    } catch (error: any) {
        return thunkApi.rejectWithValue({ error: error.data });
    }
});

export const fetchCategoriesAsync = createAsyncThunk<Category[], void>(
    'shop/fetchCategoriesAsync',
    async (_, thunkApi) => {
        try {
            return await agent.Categories.list();
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
);

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 15,
        orderBy: 'name',
        showcase: true,
    };
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: productsAdapter.getInitialState<ShopState>({
        productsLoaded: false,
        categoriesLoaded: false,
        categories: [],
        status: 'idle',
        productParams: initParams(),
        metaData: null,
    }),
    reducers: {

        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {
                ...state.productParams,
                ...action.payload,
                pageNumber: 1,
            };
        },

        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, pageNumber: action.payload };
        },

        setPageSize: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, pageSize: action.payload, pageNumber: 1, };
        },

        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },

        resetProductParams: (state) => {
            state.productParams = initParams();
        },

        setCategory: (state, action) => {
            state.categories = [...state.categories, action.payload];
        },

        updateCategory: (state, action) => {
            const items = state.categories.filter((c) => c.id !== action.payload.id);
            state.categories = [...items, action.payload];
        },

        setProduct: productsAdapter.addOne,
        updateProduct: productsAdapter.updateOne,
        removeProduct: productsAdapter.removeOne,
        updateCategories: (state) => {
            state.categoriesLoaded = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });

        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload || []);
            state.status = 'idle';
            state.productsLoaded = true;
        });

        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchCategoriesAsync.pending, (state) => {
            state.status = 'pendingFetchCategories';
        });

        builder.addCase(fetchCategoriesAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.status = 'idle';
            state.categoriesLoaded = true;
        });
    },
});

export const productSelectors = productsAdapter.getSelectors(
    (state: RootState) => state.products
);

export const {
    setProductParams,
    resetProductParams,
    setMetaData,
    setPageNumber,
    setPageSize,
    setCategory,
    updateCategory,
    setProduct,
    updateProduct,
    removeProduct,
    updateCategories,
} = productsSlice.actions;
