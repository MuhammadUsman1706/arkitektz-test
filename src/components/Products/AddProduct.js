import React, { useRef, useState } from "react";
import { addProductAction } from "../../redux/product-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";

import classes from "./AddProduct.module.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ref is sufficient since we don't really need any re-rendering
  const nameRef = useRef();
  const priceRef = useRef();
  const imageUrlRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    // can get these values from event parameter as well :)
    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const imageUrl = imageUrlRef.current.value;

    setIsLoading(true);
    try {
      await dispatch(addProductAction(name, price, imageUrl));
      navigate("/products");
    } catch (err) {
      toast.error(err.message);
    }

    setIsLoading(false);
  };

  return (
    <main className={classes["add-product"]}>
      <section>
        <Typography variant="h4" component="h1">
          Add Product
        </Typography>

        <form
          className={classes["add-product-form"]}
          onSubmit={formSubmitHandler}
        >
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            type="text"
            inputRef={nameRef}
            required
          />
          <TextField
            id="standard-basic"
            label="Price"
            variant="standard"
            type="number"
            inputRef={priceRef}
            InputProps={{ inputProps: { min: 1 } }}
            required
          />
          <TextField
            id="standard-basic"
            label="Image Url"
            variant="standard"
            type="url"
            inputRef={imageUrlRef}
          />

          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "Loading " : "Add Product"}
            {isLoading && (
              <CircularProgress sx={{ marginLeft: "1rem" }} size={20} />
            )}
          </Button>
        </form>
      </section>
    </main>
  );
};

export default AddProduct;
