import EmployeesListItem from "../employees-list-item/employees-list-item";
import "./employees-list.css";

const EmployeesList = ({ data, onDelete }) => {
  const elements = data.map((item) => {
    const { id, ...itemProps } = item;
    // return <EmployeesListItem key={id} name={itemProps.name} salary={itemProps.salary} increase={itemProps.increase}/>
    // or second method: Object spreed operator
    return (
      <EmployeesListItem
        key={id}
        {...itemProps}
        onDeleteItem={() => onDelete(id)}
      />
    );
  });

  return <ul className="app-list list-group">
    {elements}
  </ul>;
};

export default EmployeesList;
