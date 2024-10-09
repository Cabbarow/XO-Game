import "./App.css";
import React, { useEffect, useState } from "react";
import Test from "./Test";

function App() {
  return <Test></Test>;

  const initialValues = {
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    birthday: "",
    descriptions: "",
    file: "",
    color: "",
    browser: "",
    language: "",
    vehicle: [],
  };
  const [formValue, setFormValue] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleCheck = (e) => {
    const { name, checked, value } = e.target;
    let newArray = [...formValue[name]];

    if (checked) {
      newArray.push(value);
    } else {
      newArray = newArray.filter((x) => x !== value);
    }
    setFormValue({
      ...formValue,
      [name]: [...newArray],
    });
  };
  console.log(formValue);

  useEffect(() => {
    return console.log(formValue);
  }, []);

  return (
    <div className="App">
      <form
        className="form"
        onSubmit={(e, { resetForm }) => {
          e.preventDefault();
          resetForm();
        }}
      >
        <fieldset>
          <legend>Bilgileri Gir...</legend>
          <label>Firstname:</label>
          <br />
          <input onChange={handleChange} name="name" type="text" />
          <br />
          <label>Lastname:</label>
          <br />
          <input onChange={handleChange} name="surname" type="text" />
          <br />
          <label>Enter your phone number:</label> <br />
          <input
            onChange={handleChange}
            name="phone"
            type="tel"
            placeholder="123-123-12-12"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
          ></input>{" "}
          <br />
          <small>Format: 123-123-12-12</small>
          <br />
          <label>Enter your email:</label>
          <br />
          <input onChange={handleChange} name="email" type="email"></input>
          <br />
          <label>Password:</label>
          <br />
          <input onChange={handleChange} name="password" type="password" />
          <br />
          <label>Birthday:</label>
          <br />
          <input
            onChange={handleChange}
            name="birthday"
            type="date"
          ></input>{" "}
          <br />
          <label>Descriptions:</label>
          <br />
          <textarea
            onChange={handleChange}
            name="descriptions"
            rows="5"
          ></textarea>{" "}
          <br />
          <label>Select a file:</label>
          <br />
          <input onChange={handleChange} name="file" type="file"></input>
          <br />
          <label>Choose One Color:</label>
          <br />
          <select onChange={handleChange} name="color">
            <option>Blue</option>
            <option>Green</option>
            <option>Black</option>
          </select>{" "}
          <br />
          <label>Choose Your Browser:</label>
          <br />
          <input onChange={handleChange} name="browser" list="browser" />
          <datalist id="browser">
            <option value="Edge" />
            <option value="Firefox" />
            <option value="Chrome" />
            <option value="Opera" />
            <option value="Safari" />
          </datalist>
          <br />
          <fieldset>
            <legend>Choose One:</legend>
            <input
              onChange={handleChange}
              type="radio"
              id="html"
              name="language"
              value="HTML"
            />
            <label htmlFor="html">HTML</label>
            <br />
            <input
              onChange={handleChange}
              type="radio"
              id="css"
              name="language"
              value="CSS"
            />
            <label htmlFor="css">CSS</label>
            <br />
            <input
              onChange={handleChange}
              type="radio"
              id="javascript"
              name="language"
              value="JavaScript"
            />
            <label htmlFor="javascript">JavaScript</label>
          </fieldset>
          <br />
          <fieldset>
            <legend>Choose:</legend>
            <input
              onChange={handleCheck}
              name="vehicle"
              type="checkbox"
              value="Bike"
            />
            <label> I have a bike</label>
            <br />
            <input
              onChange={handleCheck}
              name="vehicle"
              type="checkbox"
              value="Car"
            />
            <label> I have a car</label>
            <br />
            <input
              onChange={handleCheck}
              name="vehicle"
              type="checkbox"
              value="Boat"
            />
            <label> I have a boat</label>
          </fieldset>
          <br />
          <br />
          <input name="submit" type="submit" value="Submit" />
          <input type="reset" value="Reset"></input>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
