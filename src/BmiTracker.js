import { useState, useEffect } from "react";
import SevenDay from "./SevenDayData";
import { v4 as uuid } from "uuid";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const getDatafromLS = () => {
  const data = localStorage.getItem("lists");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function Bmi() {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  const [weight, setWeight] = useState(" ");
  const [height, setHeight] = useState(" ");
  const [print, setPrint] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const [lists, setList] = useState(getDatafromLS());

  const weightHandle = (e) => {
    setWeight(e.target.value);
    setPrint(false);
  };

  const heightHandle = (e) => {
    setHeight(e.target.value);
    setPrint(false);
  };


  const clickHandle = () => {

    const getBmi = (weight / (((height / 100) * height) / 100)).toFixed(2);


    let list = {
      Weight: weight,
      Height: height,
      Bmi: getBmi,
      Date: date,
      Id: small_id
    };

    setList([...lists, list]);
    setPrint(true);
    
  };

  if (lists.length > 7) {
    setList(lists.slice(1, lists.length));
  }

  const deleteList = (Id) => {
    const filteredLists = lists.filter((element, index) => {
      return element.Id !== Id;
    });
    setList(filteredLists);
   
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <>
      <h1 className="App">BMI Tracker </h1>
      <div className="bmi">
        <div className="bmiinput">
          <label htmlFor="weight">Weight (in kg)</label>
          <br />
          <input
            onChange={weightHandle}
            className="bmiinpt"
            id="weight"
            name="weight"
            type="number"
            min="1"
            max="999"
            placeholder="50"
          />
        </div>

        <div>
          <label htmlFor="weight">Height (in cm)</label>
          <br />
          <input
            onChange={heightHandle}
            className="bmiinpt"
            id="height"
            name="height"
            type="number"
            min="1"
            max="999"
            placeholder="170"
          />
        </div>
      </div>
      <div className="btn">
        <button
          onClick={clickHandle}
          disabled={weight === " " || height === " "}
          className="bmibtn"
        >
          Calculate BMI
        </button>
      </div>

      <h1 className="App">Line Chart</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={lists} width={500} height={300}>
          <XAxis dataKey="Date" interval={"preserveStartEnd"} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Bmi" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <h1 className="App">7 Days Data </h1>
      <div className="datacontainer">
        <SevenDay deleteList={deleteList} getlists={lists} />
        {lists.length < 1 ? <h2>No Log Found</h2> : null}
      </div>
    </>
  );
}

export default Bmi;
