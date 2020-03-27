import React, { useState } from "react";

const PizzaForm = props => {
  return (
    <div className="form-row">
      <div className="col-5">
        <input
          onChange={event => props.handleChange(event)}
          type="text"
          className="form-control"
          placeholder="Pizza Topping"
          value={
            //Pizza Topping Should Go Here
            props.editPizza.topping
          }
        />
      </div>
      <div className="col">
        <select
          onChange={event => props.radioChange(event)}
          value={props.editPizza.size}
          className="form-control"
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div className="col">
        <div className="form-check">
          <input
            onClick={event => props.vegChange(event)}
            className="form-check-input"
            type="radio"
            value="Vegetarian"
            checked={props.editPizza.vegetarian}
          />
          <label className="form-check-label">Vegetarian</label>
        </div>
        <div className="form-check">
          <input
            onClick={event => props.falseVegChange(event)}
            checked={!props.editPizza.vegetarian}
            className="form-check-input"
            type="radio"
            value="Not Vegetarian"
          />
          <label className="form-check-label">Not Vegetarian</label>
        </div>
      </div>
      <div className="col">
        <button
          type="submit"
          className="btn btn-success"
          onClick={event => props.submitHandler(event)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PizzaForm;
