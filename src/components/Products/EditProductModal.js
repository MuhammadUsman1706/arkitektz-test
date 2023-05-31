import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editProductAction } from "../../redux/product-actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

import classes from "./EditProductModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 1,
  backgroundColor: "white",
  minWidth: 300,
};

const EditProductModal = ({ data, setData }) => {
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState(data);

  const handleClose = () => setData(null);

  const setProductDetailsHandler = (event) => {
    setProductDetails((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(editProductAction(productDetails));
    setData(null);
  };

  return (
    <div>
      <Modal
        open={data}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <main className={classes["add-product"]}>
            <section>
              <Typography variant="h4" component="h1">
                Edit Product
              </Typography>

              <form
                onSubmit={formSubmitHandler}
                className={classes["add-product-form"]}
              >
                <TextField
                  id="name"
                  label="Name"
                  variant="standard"
                  type="text"
                  value={productDetails.name}
                  onChange={setProductDetailsHandler}
                  required
                />
                <TextField
                  id="price"
                  label="Price"
                  variant="standard"
                  type="number"
                  value={productDetails.price}
                  InputProps={{ inputProps: { min: 1 } }}
                  onChange={setProductDetailsHandler}
                  required
                />
                <TextField
                  id="imageUrl"
                  label="Image Url"
                  variant="standard"
                  type="url"
                  value={productDetails.imageUrl}
                  onChange={setProductDetailsHandler}
                />

                <Button type="submit" variant="contained">
                  Edit Product
                </Button>
              </form>
            </section>
          </main>
        </Box>
      </Modal>
    </div>
  );
};

export default EditProductModal;
