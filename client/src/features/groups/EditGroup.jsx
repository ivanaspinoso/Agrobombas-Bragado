import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCategory } from "../../app/actions/categories";

const EditGroup = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location.state);
  const [id] = useState(location.state.id);
  const [category, setCategory] = useState(location.state.category);
  const [description, setDescription] = useState(location.state.description);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ id, category, description }));
    navigate("/show-groups", { replace: true });
  };
  return (
    <div className="container mt-5">
      <h2
        className="text-center text-uppercase m-5"
        style={{ letterSpacing: "5px", fontWeight: "ligher" }}
      >
        Edit Group
      </h2>
      <form
        onSubmit={handleSubmit}
        className="border rounded p-4 "
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
          className="btn "
          style={{ background: "#006877", color: "white" }}
        >
          Update Group
        </button>
      </form>
    </div>
  );
};

export default EditGroup;