import React, { useEffect, useRef, useState } from "react";

function ProductCard(prop) {
  const {
    id,
    name,
    unit,
    price,
    date_of_expiry,
    available_inventory,
    image,
    deleteData,
    editTheProduct,
  } = prop;

  const [selected, setSelected] = useState(false);
  const [productForm, setProductForm] = useState({
    name: name,
    unit: unit,
    price: price,
    date_of_expiry: date_of_expiry,
    available_inventory: available_inventory,
    image: '',
  })

  const editModalRef = useRef(null)

  const cardClick = () => {
    setSelected(!selected);
  };

  /* handle click of edit and delete */
  const controlClick = (e, operation) => {
    e.stopPropagation();
    switch (operation) {
      case "edit":
        jQuery('#editModal').modal('show')
        break;
      case "delete":
        deleteData(id, name);
        break;
    }
  };

  /* handle input form change */
  const productFormChange = (event) => {
    setProductForm((prevstate) => ({
        ...prevstate,
        [event.target.name] : event.target.value
    }))
  }

  return (
    <div id="cardContainer" onClick={cardClick}>
      <div id="imageContainer">Image</div>
      <div id="detailsContainer" className="px-2 px-md-3 position-relative">
        <p className="small mb-0">Name: {name}</p>
        <p className="small mb-0">Unit: {unit}</p>
        <p className="small mb-0 position-absolute price">Price: {price}</p>
        <p className="small mb-0">Date of Expiry: {date_of_expiry}</p>
        <p className="small mb-0">Available Inventory: {available_inventory}</p>
        <p className="small mb-0">
          Available Inventory Cost:{" "}
          {parseFloat(available_inventory * price).toFixed(2)}
        </p>
        {selected ? (
          <div id="controlButton">
            <button
              type="button"
              className="btn btn-primary"
              onClick={(event) => controlClick(event, "edit")}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(event) => controlClick(event, "delete")}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
        ref={editModalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">
                Edit Product
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
                onSubmit={(event) => editTheProduct(event, productForm, id)}
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
                    Edit Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
