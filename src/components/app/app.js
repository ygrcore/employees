import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "John W.", salary: 800, increase: true, id: 1 },
        { name: "Luke S.", salary: 3000, increase: false, id: 2 },
        { name: "Ace V.", salary: 5000, increase: false, id: 3 },
      ],
    };
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      // first method:
      // const index = data.findIndex(elem => elem.id === id);

      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);
      // const newArr = [...before, ...after];

      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (item) => {
    if (item.name && item.salary) {
      const newData = [...this.state.data, item];
      this.setState({
        data: newData,
      });
    }
  };

  render() {
    return (
      <div className="app">
        <AppInfo />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList data={this.state.data} onDelete={this.deleteItem} />
        <EmployeesAddForm addItem={this.addItem} />
      </div>
    );
  }
}

export default App;
