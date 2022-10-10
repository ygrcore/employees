import './app-filter.css';

const AppFilter = (props) => {
  const buttonsData = [
    {name: 'all', label: 'Все сотрудники'},
    {name: 'rise', label: 'На повышение'},
    {name: 'moreThan1000', label: 'З/П больше 1000$'},
  ]

  const buttons = buttonsData.map(item => {
    const active = props.filter === item.name;
    const clazz = active ? 'btn-light' : 'btn-outline-light'
    
    return (
      <button className={`btn ${clazz}`} key={item.name} type="button" onClick={() => props.onFilterSelect(item.name)}>
        {item.label}
      </button>
    )
  })

  return (
    <div className="btn-group">
      {buttons}
      {/* <button className="btn btn-light" type="button">
        Все сотрудники
      </button>
      <button className="btn btn-outline-light" type="button">
        На повышение
      </button>
      <button className="btn btn-outline-light" type="button">
        З/П больше 1000$
      </button> */}
    </div>
  );
};

export default AppFilter;