import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cateAdd } from "../../app/actions/categories";

const AddGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const group = { category, description };
    dispatch(cateAdd(group));
    navigate("/show-groups", { replace: true });
  };
  
  return (
    <div className="container mt-5">
      <h2
        className="text-center text-uppercase m-5"
        style={{ letterSpacing: "5px", fontWeight: "ligher" }}
      >
        Add Group
      </h2>
      <form
        onSubmit={handleSubmit}
        className="border rounded p-4"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Group:
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn"
          style={{ background: "#006877", color: "white" }}
        >
          Add Group
        </button>
      </form>
    </div>
  );
};

export default AddGroup;