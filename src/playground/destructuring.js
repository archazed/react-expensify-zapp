import React, { Component } from 'react';

// const person = {
//   name: "Zahid Mujaddid",
//   age: 25,
//   location: {
//     city: "Sukoharjo",
//     temp: 34
//   }
// };

// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
//   publisher: {
//     name: "Penguin"
//   }
// };

// const { name = "Anonymous", age } = person;
// console.log(`${name} is ${age} year(s) old`);

// const { city, temp: currentTemp } = person.location;
// console.log(`It is ${currentTemp} celsius in ${city}`);

// const { name: publisherName = "Self-published" } = book.publisher;
// console.log(publisherName);

const address = ['Jl. Anggur No. 3', 'Sukoharjo', 'Middle Java', '57161'];
const [, city, province] = address;

console.log(`My current location is in ${city}, ${province}.`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$3.00'];
const [menu, ,mediumPrice] = item;
console.log(`A medium ${menu} costs ${mediumPrice}.`);

class App extends Component {
  render() {
    return (
      <div>
        <h1>Destructuring</h1>
      </div>
    );
  }
}

export default App;
