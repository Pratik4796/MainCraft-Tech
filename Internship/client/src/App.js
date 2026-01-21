import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import "./index.css";

const API = "http://localhost:5000/api/products";

export default function App() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
  });

  const [editId, setEditId] = useState(null); // ✅ track editing product id

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.log("Fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add Product
  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API, {
        title: form.title,
        price: Number(form.price),
        description: form.description,
      });

      setForm({ title: "", price: "", description: "" });
      fetchProducts();
    } catch (err) {
      console.log("Add error:", err.message);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (err) {
      console.log("Delete error:", err.message);
    }
  };

  //  When click Edit
  const startEdit = (product) => {
    setEditId(product._id);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description || "",
    });
  };

  // Update Product
  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API}/${editId}`, {
        title: form.title,
        price: Number(form.price),
        description: form.description,
      });

      setEditId(null);
      setForm({ title: "", price: "", description: "" });
      fetchProducts();
    } catch (err) {
      console.log("Update error:", err.message);
    }
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditId(null);
    setForm({ title: "", price: "", description: "" });
  };

  return (
    <div className="page">
      <h2 className="heading">Product Cards</h2>

      <form onSubmit={editId ? updateProduct : addProduct} className="form">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          type="number"
          className="input"
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="input"
        />

        <button className={editId ? "bg-update" : "bg-red"} type="submit">
          {editId ? "Update" : "Add"}
        </button>

        {editId && (
          <button type="button" className="btn-cancel" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <div className="products">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onDelete={deleteProduct}
            onEdit={startEdit}
          />
        ))}
      </div>
    </div>
  );
}
