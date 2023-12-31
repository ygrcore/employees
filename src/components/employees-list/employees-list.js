import EmployeesListItem from "../employees-list-item/employees-list-item";
import "./employees-list.css";

const EmployeesList = ({ data, onDelete, onToggleProp, changeSalary }) => {
  const elements = data.map((item) => {
    const { id, ...itemProps } = item;
    // return <EmployeesListItem key={id} name={itemProps.name} salary={itemProps.salary} increase={itemProps.increase}/>
    // or second method: Object spreed operator
    return (
      <EmployeesListItem
        key={id}
        {...itemProps}
        onDeleteItem={() => onDelete(id)}
        onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
        changeSalary={changeSalary}
      />
    );
  });

  return (
    <ul className="app-list list-group">
      {elements}
    </ul>
  )
};

export default EmployeesList;
