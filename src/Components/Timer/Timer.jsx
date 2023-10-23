import { useState, useEffect } from "react";

import "./style.scss"

const Timer = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
  
    const deadline = "December, 31, 2023";
  
    const getTime = () => {
      const time = Date.parse(deadline) - Date.now();
  
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };
  
    useEffect(() => {
      const interval = setInterval(() => getTime(deadline), 1000);  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="timer">
        <div className="timer-container">
            <div className="timer-container-text">
                <div>
                    <span style={{
                        fontWeight: 600,
                        fontSize: "20px"
                    }}>
                        Deals and offers
                    </span>
                </div>
                <div>
                    <span style={{color:"#8B96A5"}}>
                        Hygiene equipment
                    </span>
                </div>
            </div>
            <div className="countdown">
                <ul>
                    <li>
                        <div>
                            <span>
                                {days}
                            </span>
                        </div>
                        <div>
                            <span>
                                Days
                            </span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>
                                {hours}
                            </span>
                        </div>
                        <div>
                            <span>
                                Hour
                            </span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>
                                {minutes}
                            </span>
                        </div>
                        <div>
                            <span>
                                Min
                            </span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>
                                {seconds}
                            </span>
                        </div>
                        <div>
                            <span>
                                Sec
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    );
  };
  
  export default Timer;