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
      term: '',
      filter: 'all'
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

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items
    }
    return items.filter(item => {
      const lower = item.name.toLowerCase();
      const upper = item.name.toUpperCase();
      return item.name.indexOf(term) > -1 || lower.indexOf(term) > -1 || upper.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term})
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise)
      case 'moreThan1000':
        return items.filter(item => item.salary > 1000)
      default:
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter})
  }

  changeSalary = (salary) => {
    this.setState(({data}) => ({
      data: data.map(item => {
          return {...item, salary}
      })
    }))
  }

  render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increase = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo employees={employees} increase={increase}/>

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          changeSalary={this.changeSalary}
        />
        <EmployeesAddForm addItem={this.addItem} />
      </div>
    );
  }
}

export default App;
