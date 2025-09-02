import { useRef, useState } from 'react'
import { useEffect } from 'react';
import './App.css'

function App() {
  const [time, setTime] = useState(0);
  const [interval, settInterval] = useState([]);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    initialTimer();
    return () => clearInterval(timerRef.current)

  }, [running])

  const initialTimer = () => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
  }

  const puaseTimer = () => {
    if (running) {
      settInterval((prev) =>
        [...prev, time]
      )
    }
    setRunning((prev) => !prev)
  }

  const buttoTimer = () => {
    setRunning((prev) => !prev);
  }

  const resetTimmer = () => {
    setTime(0);
    setRunning(false)
    setInterval([])
    clearInterval(timerRef.current)
  }


  return (
    <>
      <h2>Temporizador: {time} </h2>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }} >
        <div>
          <button onClick={buttoTimer} >Iniciar </button>
        </div>
        
        <div>
          <button onClick={puaseTimer} >Pausar</button>
        </div>
      </div>
      
      <div>
        <p>Interval guardados</p>
        {
          interval.length &&
          <ul>
            {interval.map((inter, i) =>
              <li key={i}>{inter}</li>
            )}
          </ul>
        }
      </div>
      <div>
        <button onClick={resetTimmer} >Resetear valores</button>
      </div>
    </>
  )
}

export default App
