import { Component } from 'react';
import './employees-list-item.css';

class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salary: ''
        }
    };
       
    keyHandler = (e) => {
        if (e.code === 'Enter' || e.code === 'Space') {
            this.props.onToggleProp(e)
        }
    }

    onFocus = (event) => {
        const currentElem = event.target;
        currentElem.addEventListener('keydown', this.keyHandler)
    }

    onBlur = (event) => {
        const currentElem = event.target;
        currentElem.removeEventListener('keydown', this.keyHandler)
    }

    onInputValueChange = (e) => {
        const salaryChange = e.target.value;

        this.setState({
            salary: salaryChange
        });
        this.props.changeSalary(salaryChange)
    }

    render() {
        const {name, salary, onDeleteItem, onToggleProp, increase, rise} = this.props;
        let classNames = "list-group-item d-flex justify-content-between"
        if (increase) {
            classNames += ' increase';
        }
        if (rise) {
            classNames += ' like'
        }
    


        return (
            <li className={classNames}>
                <span className="list-group-item-label" tabIndex={0} onClick={onToggleProp} onFocus={this.onFocus} onBlur={this.onBlur} data-toggle="rise">{name}</span>
                <input type="text" className="list-group-item-input" onChange={this.onInputValueChange} defaultValue={salary + '$'}/>
                <div className="d-flex justify-content-center align-items-center">
                    <button type="button" className="btn-cookie btn-sm" onClick={onToggleProp} data-toggle="increase">
                        <i className="fas fa-cookie"></i>
                    </button>
    
                    <button type="button" className="btn-trash btn-sm" onClick={onDeleteItem}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    }

    
}

export default EmployeesListItem;