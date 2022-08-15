import {PlusIcon} from '@heroicons/react/solid';
import {useState} from 'react';
import useManageProducts from '../../app/hooks/manager/useManageProducts';
import ListPageLayout from '../../app/layout/ListPageLayout';
import {Product} from '../../app/models/product';
import AppButton from '../../components/common/AppButton';
import AppDialog from '../../components/common/AppDialog';
import CollapsibleMenu from '../../components/common/CollapsibleMenu';
import ProductForm from '../../components/forms/ProductForm';
import ProductDeleteDialog from '../../components/product/ProductDeleteDialog';
import ProductsFilters from '../../components/product/ProductsFilters';
import ShopProductCard from '../../components/product/ShopProductCard';

export default function ProductsManagerPage() {
  const manager = useManageProducts();
  const { products, metaData, setPageNumber, refreshProducts } = manager;
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [addProductForm, setAddProductForm] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );

  async function handlePageChange(page: number) {
    setPageNumber(page + 1);
  }

  const addNewProduct = () => {
    setSelectedProduct(undefined);
    setAddProductForm(true);
  };

  async function handleNewProduct(product: Product) {
    // dispatch(setProduct(product));
    refreshProducts();
  }

  return (
    <ListPageLayout
      title={'Gestion des articles'}
      filters={
        <CollapsibleMenu title='Filtres'>
          <ProductsFilters manager={manager} />
        </CollapsibleMenu>
      }
      list={
        <div className='gap-y-5 md:gap-y-2 grid lg:grid-cols-3 gap-5'>
          {products.map((product) => (
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
          genre={'info'}
        />
      }
      dialogVisible={deleteProduct || editProduct || addProductForm}
      dialogContent={
        <>
          {addProductForm && (
            <AppDialog>
              <ProductForm onClose={() => setAddProductForm(false)} />
            </AppDialog>
          )}
          {deleteProduct && selectedProduct && (
            <AppDialog>
              <ProductDeleteDialog
                product={selectedProduct}
                onClose={() => setDeleteProduct(false)}
              />
            </AppDialog>
          )}

          {editProduct && selectedProduct && (
            <AppDialog>
              <ProductForm
                product={selectedProduct}
                onClose={(product) => {
                  if (product) {
                    handleNewProduct(product);
                  }
                  setEditProduct(false);
                }}
              />
            </AppDialog>
          )}
        </>
      }
    />
  );
}
