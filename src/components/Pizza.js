import React from "react";

const Pizza = props => {
  return (
    <tr>
      <td>{props.top}</td>
      <td>{props.size}</td>
      <td>{props.veg.toString()}</td>
      <td>
        <button
          onClick={props.editHandler}
          type="button"
          className="btn btn-primary"
        >
          Edit Pizza
        </button>
        <button
          onClick={props.deleteHandler}
          type="button"
          className="btn ml-3 btn-primary"
        >
          Delete Pizza
        </button>
      </td>
    </tr>
  );
};

export default Pizza;
