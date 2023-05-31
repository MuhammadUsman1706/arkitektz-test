import React from "react";
import { useDispatch } from "react-redux";
import { deleteProductAction } from "../../redux/product-actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import classes from "./DeleteProductModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 3,
  backgroundColor: "white",
  minWidth: 300,
};

const DeleteProductModal = ({ id, setId }) => {
  const dispatch = useDispatch();

  const handleClose = () => setId(null);

  const deleteProductHandler = () => {
    dispatch(deleteProductAction(id));
    handleClose();
  };

  return (
    <div>
      <Modal
        open={id}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <main className={classes["delete-product"]}>
            <Typography variant="h4" component="h1">
              Delete Product
            </Typography>

            <Typography component="p" variant="h6">
              Are you sure you want to delete that product?
            </Typography>

            <div className={classes.actions}>
              <Button variant="contained" onClick={deleteProductHandler}>
                Yes
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                No
              </Button>
            </div>
          </main>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteProductModal;
