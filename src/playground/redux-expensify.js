import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


//ADD EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

//REMOVE EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

//EDIT EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

//SET TEXT FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

//SORT BY DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

//SORT BY AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

//SET START DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

//SET END DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

//Expense Reducer
const expensesReducerDefState = [];
const expensesReducer = (state = expensesReducerDefState, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(expense => expense.id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return { ...expense, ...action.updates };
        }
        else {
          return expense;
        }
      });
    default:
      return state;
  }
};

//Filter Reducer
const filtersReducerDefState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefState, action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text };
    case 'SORT_BY_DATE':
      return { ...state, sortBy: 'date' };
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: 'amount' };
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
}

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate ;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if(sortBy === 'date') {
      return b.createdAt - a.createdAt;
    }
    else if(sortBy === 'amount') {
      return b.amount - a.amount;
    }
  });
}; 

//Store
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters); 
  console.log(visibleExpenses);
});

const addExpense1 = store.dispatch(addExpense({ description: 'Rent', note: 'Payment for the rent this month', amount: 50000, createdAt: -2100 }));
const addExpense2 = store.dispatch(addExpense({ description: 'Coffee', amount: 5000, createdAt: -1000 }));
// store.dispatch(removeExpense({ id: addExpense2.expense.id }));
// store.dispatch(editExpense(addExpense1.expense.id, { amount: 1000000, note: 'Payment for this month\'s rent' }));
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
store.dispatch(setStartDate(125));
store.dispatch(setEndDate(1250));
store.dispatch(setTextFilter('ffe'));

const demoState = {
  expenses: [
    {
      id: 'Z1018',
      description: 'Internet cost',
      note: 'Internet cost for this month',
      amount: 50000,
      createdAt: 0
    }
  ],
  filters: {
    text: 'internet',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
};

class App extends Component {
  render() {
    return (
      <div>
        <h1>Redux Expensify</h1>
      </div>
    );
  }
}

export default App;