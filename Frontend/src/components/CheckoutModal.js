import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const CheckoutModal = ({ open, onClose, onCheckout }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const validationErrors = {};
    let hasErrors = false;

    // Validate required fields
    for (const field in formData) {
      if (!formData[field]) {
        validationErrors[field] = true;
        hasErrors = true;
      } else {
        validationErrors[field] = false;
      }
    }

    if (hasErrors) {
      setErrors(validationErrors);
    } else {
      // Perform checkout and bill generation
      onCheckout(formData);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Checkout Information</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={errors.name}
          helperText={errors.name ? "Required field" : ""}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={errors.email}
          helperText={errors.email ? "Required field" : ""}
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={errors.phone}
          helperText={errors.phone ? "Required field" : ""}
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={errors.address}
          helperText={errors.address ? "Required field" : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutModal;
