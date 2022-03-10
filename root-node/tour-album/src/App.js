import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Loading from "./component/Loading";
import Tours from "./component/Tours";
const dataUrl = "https://course-api.com/react-tours-project";
function App() {
  const [isLoading, setLoading] = useState(true);
  const [tours, setTour] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTour(newTours);
  };
  const fetchTour = async () => {
    try {
      const response = await fetch(dataUrl);
      const tours = await response.json();
      setTour(() => tours);
      setLoading(() => false);
    } catch (error) {
      setLoading(() => false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTour();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
