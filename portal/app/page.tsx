"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

type Product = {
  id: string;
  price: number;
  name: string;
  description: string;
  imageUrl: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8081/store/products");
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async () => {
    if (!newProduct) {
      toast.error("All fields are required.");
      return;
    }
    const { name, price, description, imageUrl } = newProduct;
    if (!name || !price || !description || !imageUrl) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/store/products",
        newProduct
      );
      setProducts([...products, response.data]);
      setNewProduct({
        name: null,
        price: 0,
        description: null,
        imageUrl: null,
      });
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add the product. Please try again.");
    }
  };

  const updateProduct = async () => {
    if (!selectedProduct) return;
    try {
      const { id, ...productToUpdate } = selectedProduct;
      const response = await axios.patch(
        `http://localhost:8081/store/products/${selectedProduct.id}`,
        productToUpdate
      );
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id ? response.data : product
        )
      );
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8081/store/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <main
      style={{
        backgroundColor: "#787878",
        padding: "25px",
        borderRadius: "25px",
        border: "1px solid #ccc",
        width: "100%",
        margin: "0 auto",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#787878" }}>
        E2E App Development CRUD Web Portal
      </h1>
      <div
        style={{
          backgroundColor: "#595959 ",
          padding: "25px",
          borderRadius: "25px",
          border: "1px solid #ccc",
          width: "80%",
          margin: "0 auto",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <h2
            style={{
              padding: "12px",
              margin: "12px",
              fontWeight: "bold",
              fontSize: "20pt ",
              color: "#000000",
              textAlign: "center",
            }}
          >
            {selectedProduct ? "Update Product" : "Add Product"}
          </h2>
          <input
            type="text"
            placeholder="Name"
            style={{
              display: "block",
              alignContent: "center",
              padding: "5px",
              margin: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              color: "#000000",
              backgroundColor: "#fff",
              width: "500px",
            }}
            value={selectedProduct ? selectedProduct.name : newProduct?.name}
            onChange={(e) =>
              selectedProduct
                ? setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                : setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            style={{
              display: "block",
              padding: "5px",
              margin: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              color: "#000000",
              backgroundColor: "#fff",
              width: "500px",
            }}
            value={
              selectedProduct
                ? selectedProduct.description
                : newProduct?.description
            }
            onChange={(e) =>
              selectedProduct
                ? setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                : setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            style={{
              display: "block",
              padding: "5px",
              margin: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              color: "#000000",
              backgroundColor: "#fff",
              width: "500px",
            }}
            value={
              selectedProduct ? selectedProduct.imageUrl : newProduct?.imageUrl
            }
            onChange={(e) =>
              selectedProduct
                ? setSelectedProduct({
                    ...selectedProduct,
                    imageUrl: e.target.value,
                  })
                : setNewProduct({ ...newProduct, imageUrl: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            style={{
              display: "block",
              padding: "5px",
              margin: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              color: "#000000",
              backgroundColor: "#fff",
              width: "500px",
            }}
            value={selectedProduct ? selectedProduct.price : newProduct?.price}
            onChange={(e) =>
              selectedProduct
                ? setSelectedProduct({
                    ...selectedProduct,
                    price: parseFloat(e.target.value),
                  })
                : setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
            }
          />
          <button
            onClick={selectedProduct ? updateProduct : addProduct}
            style={{
              padding: "20px",
              backgroundColor: "#353535",
              borderRadius: "20px",
            }}
          >
            {selectedProduct ? "Update Product" : "Add Product"}
          </button>
          {selectedProduct && (
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                padding: "20px",
                backgroundColor: "#353535",
                borderRadius: "20px",
              }}
            >
              Cancel
            </button>
          )}
        </div>

        <div>
          <h2
            style={{
              padding: "12px",
              margin: "12px",
              fontWeight: "bold",
              fontSize: "20pt ",
              color: "#000000",
              textAlign: "center",
            }}
          >
            Products List
          </h2>
          <ul>
            {products.map((product) => (
              <li
                key={product.id}
                style={{
                  border: "3px solid #fff",
                  margin: "15 px",
                  padding: "15px",
                  maxWidth: "350px",
                  borderRadius: "15px",
                  color: "#555",
                  backgroundColor: "#fff",
                }}
              >
                <p>
                  <b>Name: </b> {product.name}
                </p>
                <p>
                  <b>Description: </b> {product.description}
                </p>
                <p>
                  <b>Image: </b>{" "}
                  <img src={product.imageUrl} alt={product.name} />
                </p>
                <p>
                  <b>Price: </b> ${product.price}
                </p>
                <div>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    style={{ padding: "20px", color: "#cbce23" }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    style={{ padding: "20px", color: "#ff0000" }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
