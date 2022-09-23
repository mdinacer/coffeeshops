import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { RootState } from "../store/configureStore";

interface CatalogState {
    productsLoaded: boolean;
    categoriesLoaded: boolean;
    categories: Category[];
    status: string;
}

const catalogAdapter = createEntityAdapter<Product>({
    selectId: (product) => product.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),

});

export const fetchProductsAsync = createAsyncThunk<
    Product[],
    void,
    { state: RootState }
>('catalog/fetchProductsAsync', async (_, thunkApi) => {
    try {
        return await agent.Products.listShowcase();
    } catch (error: any) {
        return thunkApi.rejectWithValue({ error: error.data });
    }
});

export const fetchProductAsync = createAsyncThunk<Product, string>
    ('catalog/fetchProductAsync', async (productId, thunkApi) => {
        try {
            const response: Product = await agent.Products.get(productId);
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    });

export const fetchCategoriesAsync = createAsyncThunk<Category[], void>(
    'catalog/fetchCategoriesAsync',
    async (_, thunkApi) => {
        try {
            return await agent.Categories.list();
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
);

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: catalogAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        categoriesLoaded: false,
        categories: [],
        status: 'idle',

    }),
    reducers: {
        setProduct: catalogAdapter.addOne,
        updateProduct: catalogAdapter.updateOne,
        removeProduct: catalogAdapter.removeOne,
        updateCategories: (state) => {
            state.categoriesLoaded = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });

        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            catalogAdapter.setAll(state, action.payload || []);
            state.status = 'idle';
            state.productsLoaded = true;
        });

        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            catalogAdapter.upsertOne(state, action.payload);
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

export const catalogSelectors = catalogAdapter.getSelectors(
    (state: RootState) => state.catalog
);

export const {
    setProduct,
    updateProduct,
    removeProduct,
    updateCategories,
} = catalogSlice.actions;
