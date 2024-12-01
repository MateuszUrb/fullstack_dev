import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = good + neutral + bad;
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleButton={() => setGood(good + 1)} text="good" />
      <Button handleButton={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleButton={() => setBad(bad + 1)} text="bad" />
      {feedback <= 0 ? (
        <h2>No feedback given</h2>
      ) : (
        <Statistic good={good} bad={bad} neutral={neutral} />
      )}
    </div>
  );
}

function Button(props) {
  return <button onClick={props.handleButton}>{props.text}</button>;
}

function Statistic({ good, neutral, bad }) {
  function calculateAll() {
    return good + neutral + bad;
  }

  function calculateAverage() {
    const sum = good + neutral * 0 - bad;
    return (sum / calculateAll()).toFixed(1);
  }

  function calculatePositivePrecentage() {
    return ((good / calculateAll()) * 100).toFixed(1);
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" handler={good} />
          <StatisticLine text="neutral" handler={neutral} />
          <StatisticLine text="bad" handler={bad} />
          <StatisticLine text="all" handler={calculateAll} />
          <StatisticLine text="average" handler={calculateAverage} />
          <StatisticLine
            text="positive"
            handler={calculatePositivePrecentage}
          />
        </tbody>
      </table>
    </div>
  );
}

function StatisticLine(props) {
  return (
    <>
      <tr>
        <td scope="row">{props.text} </td>
        <td>
          {typeof props.handler === "number" ? props.handler : props.handler()}
          {props.text === "positive" && "%"}
        </td>
      </tr>
    </>
  );
}

export default App;
