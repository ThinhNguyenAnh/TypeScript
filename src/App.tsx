import "./styles.css";
import React,{ useEffect, useState }  from 'react';
import MyComponent from "./People";



export default function App() {
  return (
    <div className="App">
      <h1>Hello Egitech members</h1>
      <h2>Start fill data and sort in 5 mins</h2>
      <p>https://random-data-api.com/api/users/random_user?size=10</p>
      <div style={{ textAlign: "start" }}>
        <ul>
          <li>List user from api</li>
          <li>Format Brithday (dd/MM/yyyy)</li>
          <li>Search all</li>
          <li>Sort column desc or asc</li>
        </ul>
      </div>

      <MyComponent/>
    </div>
  );
}
