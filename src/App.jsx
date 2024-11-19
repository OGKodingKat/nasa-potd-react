import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
      fetch(
          "https://api.nasa.gov/planetary/apod?start_date=2024-08-27&end_date=2024-09-01&api_key=o5AX9QHvgnaO9PopIuXavNvuGPSwdmo7j1RexllI"
      )
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => setError("Failed to fetch data. Please try again later."));
  };

  const resetData = () => {
      setData([]);
  };

  return (
      <div>
          <header className="btn">
              <h1>Nasa Photo of the Day</h1>
              <button onClick={fetchData}>Click Here to See the Photos!</button>
          </header>
          <main id="card-wrapper">
              {error && <p className="error">{error}</p>}
              {data.length === 0 && !error && <p>No data to display. Click the button above!</p>}
              {data.map((item) => (
                  <Card key={item.date} item={item} />
              ))}
          </main>
          <footer>
              <button onClick={resetData}>Reset</button>
          </footer>
      </div>
  );
};

const Card = ({ item }) => {
  return (
      <div className="card">
          <h2>{item.title}</h2>
          <p>Date: {item.date}</p>
          <img
              src={item.url}
              alt={item.title}
              style={{ maxWidth: "100%" }}
          />
          <p>{item.explanation}</p>
          <p>Artist: {item.copyright || "Unknown"}</p>
      </div>
  );
};

export default App;
