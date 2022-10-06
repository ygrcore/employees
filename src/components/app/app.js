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
        { name: "John W.", salary: 800, increase: true, rise: false, id: 1 },
        { name: "Luke S.", salary: 3000, increase: false, rise: true, id: 2 },
        { name: "Ace V.", salary: 5000, increase: false, rise: false, id: 3 },
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
 
  // onToggleIncrease don't work after refactoring
  // onToggleIncrease = (id) => {
  //   // ##### method 1:
  //   // this.setState(({data}) => {
  //   //   const index = data.findIndex(elem => elem.id === id);

  //   //   const target = data[index];
  //   //   const targetChanged = {...target, increase: !target.increase};
  //   //   const newArr = [...data.slice(0, index),  targetChanged, ...data.slice(index + 1)];
  //   //   return {
  //   //     data: newArr
  //   //   }
  //   // })

  //   // ##### method 2:
  //   this.setState(({data}) => ({
  //     data: data.map((item) => {
  //       if (item.id === id) {
  //         return {...item, increase: !item.increase}
  //       }
  //       return item;
  //     })
  //   }))
  // };

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    }))
  };

  render() {
    const employees = this.state.data.length;
    const increase = this.state.data.filter(item => item.increase).length;

    return (
      <div className="app">
        <AppInfo employees={employees} increase={increase}/>

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList
          data={this.state.data}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm addItem={this.addItem} />
      </div>
    );
  }
}

export default App;
