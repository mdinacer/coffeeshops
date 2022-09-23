import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import useProducts from '../../app/hooks/useProducts';
import ListPageLayout from '../../app/layout/ListPageLayout';
import { Product } from '../../app/models/product';
import { setPageNumber } from '../../app/slices/productsSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import AppButton from '../../components/common/AppButton';
import CollapsibleMenu from '../../components/common/CollapsibleMenu';
import ModalDialog from '../../components/common/ModalDialog';
import ProductForm from '../../components/forms/ProductForm';
import ProductDeleteDialog from '../../components/product/ProductDeleteDialog';
import ProductsFilters from '../../components/product/ProductsFilters';
import ShopProductCard from '../../components/product/ShopProductCard';

export default function ProductsManagerPage() {
  const dispatch = useAppDispatch();
  const { products, metaData } = useProducts();
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [addProductForm, setAddProductForm] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );

  async function handlePageChange(page: number) {
    dispatch(setPageNumber(page + 1));
  }

  const addNewProduct = () => {
    setSelectedProduct(undefined);
    setAddProductForm(true);
  };

  return (
    <>
      <ModalDialog active={addProductForm} title='Ajouter un produit'>
        <ProductForm onClose={() => setAddProductForm(false)} />
      </ModalDialog>

      {deleteProduct && selectedProduct && (
        <ModalDialog
          active={selectedProduct && deleteProduct}
          title='Suppression'
        >
          <ProductDeleteDialog
            product={selectedProduct}
            onClose={() => setDeleteProduct(false)}
          />
        </ModalDialog>
      )}

      {editProduct && selectedProduct && (
        <ModalDialog active={editProduct} title='Modification'>
          <ProductForm
            product={selectedProduct}
            onClose={(product) => {
              if (product) {
              }
              setEditProduct(false);
            }}
          />
        </ModalDialog>
      )}
      <ListPageLayout
        title={'Gestion des articles'}
        filters={
          <CollapsibleMenu title='Filtres'>
            <ProductsFilters />
          </CollapsibleMenu>
        }
        list={
          <div className='grid gap-5 gap-y-5  md:grid-cols-2 md:gap-y-2 xl:grid-cols-3'>
            {products &&
              products.map((product) => (
                <ShopProductCard
                  key={product.id}
                  product={product}
                  onEdit={() => {
                    setSelectedProduct(product);
                    setEditProduct(true);
                  }}
                  onDelete={(product) => {
                    setSelectedProduct(product);
                    setDeleteProduct(true);
                  }}
                />
              ))}
          </div>
        }
        metaData={metaData}
        onPageChange={handlePageChange}
        actionButton={
          <AppButton
            label='Ajouter un produit'
            Icon={PlusIcon}
            type='button'
            onClick={() => addNewProduct()}
          />
        }
      />
    </>
  );
}
