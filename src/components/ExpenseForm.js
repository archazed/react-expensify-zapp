import React from 'react';
import moment from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';


class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      note: props.expense ? props.expense.note : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      const error = 'Please provide description and amount of the expense!';
      this.setState(() => ({ error }));
    }
    else {
      const error = '';
      this.setState(() => ({ error }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount) * 100,
        note: this.state.note,
        createdAt: this.state.createdAt.valueOf()
      });
    }
  };

  render() {
    return (
      <div>
        { this.state.error && <p>{ this.state.error }</p> }
        <form onSubmit={ this.onSubmit }>
          <div>
            <input
              type="text"
              placeholder="Description"
              value={ this.state.description }
              onChange={ this.onDescriptionChange }
              autoFocus
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Amount"
              value={ this.state.amount }
              onChange={ this.onAmountChange }
            />
          </div>
          <div>
            <SingleDatePicker
              id="createdAtExs" 
              date={ this.state.createdAt }
              onDateChange={ this.onDateChange }
              focused={ this.state.calendarFocused }
              onFocusChange={ this.onFocusChange }
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          <div>
            <textarea
              placeholder="Add your note for the expense (optional)"
              value={ this.state.note }
              onChange={ this.onNoteChange }
            >
            </textarea>
          </div>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
