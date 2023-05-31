import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import classes from "./HelpModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  backgroundColor: "white",
  minWidth: 300,
};

const HelpModal = ({ open, setOpen }) => {
  const user = useSelector((state) => state.auth);

  const handleClose = () => setOpen(null);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <main className={classes["help-modal"]}>
            <Typography variant="h4" component="h1">
              Help
            </Typography>

            <ul>
              <li>
                <Typography component="p" variant="h6">
                  Role: <span id={classes.role}>{user.role}</span>
                </Typography>
              </li>
              <li>
                <Typography component="p" variant="h6">
                  Allowed Actions:{" "}
                  {user.role === "admin"
                    ? "Create, Update, Remove, and View Products"
                    : user.role === "editor"
                    ? "Create, Update, and View Products"
                    : "View Products"}
                </Typography>
              </li>
            </ul>

            <div className={classes.action}>
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
            </div>
          </main>
        </Box>
      </Modal>
    </div>
  );
};

export default HelpModal;
