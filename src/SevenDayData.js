function SevenDayData(props) {
  return props.getlists.map((list) => (
    <div key={list.Id} className="sevendaysdata">
      <div className="cardcontainer">
        <button onClick={() => props.deleteList(list.Id)} className="deletebtn">
          X
        </button>
        <div className="bmidata">BMI:{list.Bmi}</div>
        <div className="bmidata">
          <span>Weight:{list.Weight}</span>
          <span>Height:{list.Height}</span>
          <span>Date:{list.Date}</span>
        </div>
      </div>
    </div>
  ));
}

export default SevenDayData;
