import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";

function Home() {
  const [products, setProducts] = useState([]);
  const [cards, setCards] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    unit: "",
    price: "",
    date_of_expiry: "",
    available_inventory: "",
    image: "",
  });

  const addModalRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCards(populateData());
  }, [products]);

  /* Get data Request */
  const fetchData = async () => {
    try {
      const data = await axios.get(`http://127.0.0.1:8000/api/product`);
      setProducts(data.data);
    } catch (error) {
      notify(
        error?.response?.data?.message ? error.response.data.message : "Error"
      );
    }
  };

  /* Delete data Request */
  const deleteData = async (id, name) => {
    try {
      const data = await axios.delete(
        `http://127.0.0.1:8000/api/product/${id}`
      );
      notify(`${name} deleted successfully`); //notify if the product was deleted
      fetchData(); // fetch data from the backend to update the ui
    } catch (error) {
      notify(
        error?.response?.data?.message ? error.response?.data?.message : "Error"
      ); //notify for an error
    }
  };

  /* Post data Request */
  const addTheProduct = async (event, form) => {
    event.preventDefault();
    try {
      const data = await axios.post(`http://127.0.0.1:8000/api/product`, form);
      setProductForm({
        name: "",
        unit: "",
        price: "",
        date_of_expiry: "",
        available_inventory: "",
        image: "",
      });
      jQuery("#addModal").modal("hide");
      fetchData();
      notify(`${data.data.data.name} added successfully`);
    } catch (error) {
      notify(
        error.response?.data?.message ? error.response.data.message : "Error"
      );
    }
  };

  /* Put data Request */
  const editTheProduct = async (event, form, id) => {
    event.preventDefault();
    try {
      const data = await axios.put(
        `http://127.0.0.1:8000/api/product/${id}`,
        form
      );
      setProductForm({
        name: "",
        unit: "",
        price: "",
        date_of_expiry: "",
        available_inventory: "",
        image: "",
      });
      jQuery("#editModal").modal("hide");
      fetchData();
      notify(`Edit Success`);
    } catch (error) {
      notify(error);
    }
  };

  /* Populate data function */
  const populateData = () => {
    return products.map((product) => {
      const id = product.id;
      const name = product.name;
      const unit = product.unit;
      const price = parseFloat(product.price).toFixed(2);
      const date_of_expiry = product.date_of_expiry;
      const available_inventory = product.available_inventory;
      const image = product.image;

      return (
        <ProductCard
          id={id}
          name={name}
          unit={unit}
          price={price}
          date_of_expiry={date_of_expiry}
          available_inventory={available_inventory}
          image={image}
          key={id}
          deleteData={deleteData}
          editTheProduct={editTheProduct}
        />
      );
    });
  };

  const refreshClick = () => {
    setProducts([]);
    fetchData();
  };

  /* Notify function */
  const notify = (message) => {
    toast(message, {
      duration: 2000,
      style: {
        background: "green",
        color: "white",
      },
    });
  };

  /* handle change of the form */
  const productFormChange = (event) => {
    setProductForm((prevstate) => ({
      ...prevstate,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="mainContainer">
      <div
        id="headContainer"
        className="d-flex justify-content-between px-1 px-md-3 py-3 "
      >
        <p className="h3">Product Inventory</p>
        <div className="d-flex gap-2 flex-column">
          <button
            type="button"
            className="btn btn-outline-light"
            data-bs-toggle="modal"
            data-bs-target="#addModal"
          >
            Add Product
          </button>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={refreshClick}
          >
            Refresh
          </button>
        </div>
      </div>
      <div id="productsContainer" className="mt-2 p-1">
        {cards?.length ? (
          cards
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
        ref={addModalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addModalLabel">
                Add Your Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="col needs-validation"
                noValidate
                onSubmit={(event) => addTheProduct(event, productForm)}
              >
                <div className="col">
                  <label htmlFor="name" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={productForm.name}
                    required
                    onChange={(event) => productFormChange(event)}
                  />
                  <div className="invalid-feedback">
                    Product name is required
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="unit" className="form-label">
                    Unit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="unit"
                    name="unit"
                    value={productForm.unit}
                    required
                    onChange={(event) => productFormChange(event)}
                  />
                  <div className="invalid-feedback">
                    Product name is required
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={productForm.price}
                    required
                    onChange={(event) => productFormChange(event)}
                  />
                  <div className="invalid-feedback">
                    Product name is required
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="date_of_expiry" className="form-label">
                    Date of Expiry
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date_of_expiry"
                    name="date_of_expiry"
                    value={productForm.date_of_expiry}
                    required
                    onChange={(event) => productFormChange(event)}
                  />
                  <div className="invalid-feedback">
                    Product name is required
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="available_inventory" className="form-label">
                    Available Inventory
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="available_inventory"
                    name="available_inventory"
                    value={productForm.available_inventory}
                    required
                    onChange={(event) => productFormChange(event)}
                  />
                  <div className="invalid-feedback">
                    Product name is required
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    value={productForm.image}
                    required
                    onChange={(event) => productFormChange(event)}
                  />
                  <div className="invalid-feedback">
                    Product name is required
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Home;
