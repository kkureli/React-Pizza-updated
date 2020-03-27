import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";
import Pizza from "./components/Pizza";
import uuid from "react-uuid";

const apiURL = "http://localhost:3000/pizzas";

class App extends Component {
  state = {
    pizzas: [],
    editPizza: {},
    form: { topping: null, size: null, vegetarian: null, id: null },
    editPressed: null
  };

  componentDidMount() {
    fetch(apiURL)
      .then(respon => respon.json())
      .then(data => {
        this.setState({ pizzas: data });
      });
  }

  handleChange = event => {
    let updatedEditPizza = { ...this.state.editPizza };
    updatedEditPizza.topping = event.target.value;
    this.setState({ editPizza: updatedEditPizza });
    let updatedForm = { ...this.state.form };
    updatedForm.topping = event.target.value;
    this.setState({ form: updatedForm });
    console.log(this.state.form);
  };

  editHandler = piza => {
    this.setState({ editPizza: piza });
    console.log(this.state.editPizza);
    this.setState({ editPressed: true });

    let updatedForm = { ...this.state.form };
    updatedForm.vegetarian = piza.vegetarian;
    updatedForm.topping = piza.topping;
    updatedForm.size = piza.size;
    updatedForm.id = piza.id;

    this.setState({ form: updatedForm });
    console.log(this.state.form);
  };

  deleteHandler = index => {
    let updatedPizzas = [...this.state.pizzas];
    updatedPizzas.splice(index, 1);
    this.setState({ pizzas: updatedPizzas });
  };

  radioChange = event => {
    let updatedEditPizza = { ...this.state.editPizza };
    updatedEditPizza.size = event.target.value;
    this.setState({ editPizza: updatedEditPizza });

    let updatedForm = { ...this.state.form };
    updatedForm.size = event.target.value;
    this.setState({ form: updatedForm });
    console.log(this.state.form);
  };

  vegChange = event => {
    let updatedEditPizza = { ...this.state.editPizza };
    updatedEditPizza.vegetarian = event.target.value;
    this.setState({ editPizza: updatedEditPizza });

    let updatedForm = { ...this.state.form };
    updatedForm.vegetarian = event.target.value;
    this.setState({ form: updatedForm });
    console.log(this.state.form);
  };

  falseVegChange = event => {
    let updatedEditPizza = { ...this.state.editPizza };
    updatedEditPizza.vegetarian = !event.target.value;
    this.setState({ editPizza: updatedEditPizza });

    let updatedForm = { ...this.state.form };
    updatedForm.vegetarian = event.target.value;
    this.setState({ form: updatedForm });

    console.log(this.state.form);
  };

  submitHandler = event => {
    event.preventDefault();
    if (!this.state.editPressed) {
      let updatedPizza = [...this.state.pizzas];
      let newPizza = this.state.form;
      updatedPizza.push(newPizza);
      this.setState({ pizzas: updatedPizza });
    } else {
      let updatedPizza = [...this.state.pizzas];
      let newPizza = this.state.form;

      let sameIdPizza = updatedPizza.find(pizza => pizza.id === newPizza.id);
      sameIdPizza.topping = newPizza.topping;
      sameIdPizza.size = newPizza.size;
      sameIdPizza.vegetarian = newPizza.vegetarian;
      this.setState({ pizzas: updatedPizza });
    }
  };

  renderPizza = () => {
    return this.state.pizzas.map((piza, index) => {
      return (
        <Pizza
          key={uuid()}
          editHandler={() => {
            this.editHandler(piza);
          }}
          deleteHandler={() => {
            this.deleteHandler(index);
          }}
          top={piza.topping}
          size={piza.size}
          veg={piza.vegetarian}
        ></Pizza>
      );
    });
  };

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm
          falseVegChange={this.falseVegChange}
          vegChange={this.vegChange}
          radioChange={this.radioChange}
          editPizza={this.state.editPizza}
          handleChange={this.handleChange}
          submitHandler={this.submitHandler}
        />
        <PizzaList render={this.renderPizza()} />
      </Fragment>
    );
  }
}

export default App;
