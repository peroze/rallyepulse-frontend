import React from "react";
import { useState, useEffect } from "react";
import styles from "./Style/Start.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const Start = () => {
  const [input, setinput] = useState("#");
  const [time, settime] = useState(new Date().getTime());
  const [starthour, setstarthour] = useState(new Date().getHours());
  const [startminute, setstartminute] = useState(new Date().getMinutes() + 1);
  const [start, setstart] = useState(starthour + ":" + startminute);

  useEffect(() => {
    if (startminute < 10) {
      if (starthour < 10) {
        setstart("0" + starthour + ":0" + startminute);
      } else {
        setstart(starthour + ":0" + startminute);
      }
    } else {
      if (starthour < 10) {
        setstart("0" + starthour + ":" + startminute);
      } else {
        setstart(starthour + ":" + startminute);
      }
    }
  }, [startminute]);

  function uptime() {
    if (startminute + 1 > 59) {
      setstarthour((prev) => prev + 1);
      setstartminute(0);
    } else {
      setstartminute((prev) => prev + 1);
    }
  }

  function downtime() {
    if (startminute - 1 < 0) {
      setstarthour((prev) => prev - 1);
      setstartminute(59);
    } else {
      if (startminute - 1 > new Date().getMinutes() + 1) {
        setstartminute((prev) => prev - 1);
      }
    }
  }

  setInterval(() => {
    let time = new Date();
    let hours = time.getHours();
    let hours2 = time.getHours();
    let minutes = time.getMinutes();
    let minutes2 = time.getMinutes();
    let seconds = time.getSeconds();

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    settime(hours + ":" + minutes + ":" + seconds);
    if (seconds == 0) {
      if (startminute - minutes2 <= 0) {
        if (minutes2 == 59) {
          hours2 = hours2 + 1;
          minutes2 = 0;
        } else {
          minutes2 = minutes2 + 1;
        }
        setstarthour(hours2);
        setstartminute(minutes2);
      }
    }
  }, 1000);
  return (
    <div className="start-container">
      <div className="times"></div>
      <div className="controls">
        <div className="lines">
          <h1>{time}</h1>
        </div>
        <div className="lines">
          <div className="input">
            <h1>{input}</h1>
          </div>
        </div>
        <div className="lines">
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 1);
            }}>
            1
          </div>
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 2);
            }}>
            2
          </div>
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 3);
            }}>
            3
          </div>
        </div>
        <div className="lines">
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 4);
            }}>
            4
          </div>
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 5);
            }}>
            5
          </div>
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 6);
            }}>
            6
          </div>
        </div>
        <div className="lines">
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 7);
            }}>
            7
          </div>
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 8);
            }}>
            8
          </div>
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 9);
            }}>
            9
          </div>
        </div>
        <div className="lines">
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 0);
            }}>
            0
          </div>
          <div
            className="number"
            onClick={() => {
              if (input == "#") {
                return;
              }
              setinput(input.slice(0, -1));
            }}>
            <FontAwesomeIcon icon={faDeleteLeft} style={{ color: "#FFD43B" }} />
          </div>
        </div>
        <div className="lines">
          <div className="startbuttom">Issue Start</div>
        </div>
      </div>

      <div className="time">
        <div className="lines">
          <h1 className="starthour">{start}</h1>
        </div>

        <div className="lines">
          <div className="hourbutton" onClick={downtime}>
            -
          </div>
          <div className="hourbutton" onClick={uptime}>
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
