import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../redux/product-actions";
import { Button, Typography } from "@mui/material";
import EditProductModal from "./EditProductModal";
import missingImage from "../../assets/images/missing.jpg";

import classes from "./ProductsList.module.css";
import DeleteProductModal from "./DeleteProductModal";

const ProductsList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { products, refreshProducts } = useSelector((state) => state.product);

  const [editProductDetails, setEditProductDetails] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);

  useEffect(() => {
    if (refreshProducts) dispatch(getProductsAction());
  }, [products, refreshProducts]);

  return (
    <main className={classes["product-list"]}>
      <Typography variant="h3" component="h1">
        Our Products
      </Typography>

      <section className={classes["product-cards"]}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={classes["product-card"]}>
              <img src={product?.imageUrl || missingImage} alt={product.name} />
              <div className={classes.details}>
                <Typography variant="h4" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="h5" component="h3">
                  $ {product.price}
                </Typography>
                <div className={classes.actions}>
                  {user.canEditOrCreate && (
                    <Button
                      variant="outlined"
                      onClick={() => setEditProductDetails(product)}
                    >
                      Edit
                    </Button>
                  )}
                  {user.canDelete && (
                    <Button
                      variant="contained"
                      onClick={() => setDeleteProductId(product.id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="h4" component="h2">
            No Products!
          </Typography>
        )}
      </section>

      {editProductDetails && (
        <EditProductModal
          data={editProductDetails}
          setData={setEditProductDetails}
        />
      )}
      {deleteProductId && (
        <DeleteProductModal id={deleteProductId} setId={setDeleteProductId} />
      )}
    </main>
  );
};

export default ProductsList;
