import React from "react";
import { useState, useEffect } from "react";
import styles from "./Style/Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import timekeepingService from "../Services/timekeeping.service";

const Admin = () => {
  const [input, setinput] = useState("#");
  const [time, settime] = useState(
    new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds()
  );
  const [starthour, setstarthour] = useState(new Date().getHours());
  const [startminute, setstartminute] = useState(new Date().getMinutes() + 1);
  const [startsecond, setstartsecond] = useState(new Date().getSeconds());
  const [startmilli, setstartmilli] = useState(new Date().getMilliseconds());
  const [pressed, setpressed] = useState("hour");
  const [start, setstart] = useState(
    starthour + ":" + startminute + ":" + "00" + ":" + "00"
  );
  const handlechange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handlechange1 = (mode) => {
    setmode(mode);
  };

  const [mode, setmode] = useState();

  const [starts, setstarts] = useState([]);

  const options = [
    { value: 1, label: "Eleftherochori" },
    { value: 2, label: "Lamia" },
    { value: 3, label: "Igoumenitsa" },
  ];

  const options1 = [
    { value: "start", label: "start" },
    { value: "finish", label: "finish" },
    { value: "stop", label: "stop" },
  ];
  const [specialStages, setSpecialstages] = useState([]);
  const [receive, setRecieve] = useState(false);

  const styles = {
    control: (base, state) => ({
      ...base,
      background: "black",
      // match with the menu
      borderRadius: "50px",
      // Overwrittes the different states of border
      borderColor: "#ffd43b",
      color: "white",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: "#ffd43b",
      }, // Removes weird border around container
    }),
    option: (base) => ({
      ...base,
      color: "white",
      backgroundColor: "#FFD43b",
      borderRadius: "50px",
    }),
    container: (base, state) => ({
      ...base,
      borderRadius: "50px",
      color: "red",
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
      color: "red",
      background: "transparent",
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
  };

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (startminute < 10) {
      if (starthour < 10) {
        setstart(
          "0" + starthour + ":0" + startminute + ":" + 0 + 0 + ":" + 0 + 0
        );
      } else {
        setstart(starthour + ":0" + startminute + ":" + 0 + 0 + ":" + 0 + 0);
      }
    } else {
      if (starthour < 10) {
        setstart(
          "0" + starthour + ":" + startminute + ":" + 0 + 0 + ":" + 0 + 0
        );
      } else {
        setstart(starthour + ":" + startminute + ":" + 0 + 0 + ":" + 0 + 0);
      }
    }
  }, [startminute]);

  function select(condition) {
    console.log(condition);
    if (condition === "hour") {
      document.getElementById("hour").classList.add("pressed");
      document.getElementById("minute").classList.remove("pressed");
      document.getElementById("second").classList.remove("pressed");
      document.getElementById("milli").classList.remove("pressed");
    } else if (condition === "minute") {
      document.getElementById("hour").classList.remove("pressed");
      document.getElementById("minute").classList.add("pressed");
      document.getElementById("second").classList.remove("pressed");
      document.getElementById("milli").classList.remove("pressed");
    } else if (condition === "second") {
      document.getElementById("hour").classList.remove("pressed");
      document.getElementById("minute").classList.remove("pressed");
      document.getElementById("second").classList.add("pressed");
      document.getElementById("milli").classList.remove("pressed");
    } else if (condition === "milli") {
      document.getElementById("hour").classList.remove("pressed");
      document.getElementById("minute").classList.remove("pressed");
      document.getElementById("second").classList.remove("pressed");
      document.getElementById("milli").classList.add("pressed");
    } else {
      document.getElementById("hour").classList.remove("pressed");
      document.getElementById("minute").classList.remove("pressed");
      document.getElementById("second").classList.remove("pressed");
      document.getElementById("milli").classList.remove("pressed");
    }

    return;
  }

  useEffect(() => {
    if (receive == false) {
      setRecieve(receive + 1);
      console.log(receive);
      console.log("In Special Stages useEffect");
      window.request
        .request({
          method: "GET",
          url: "http://localhost:8080/api/specialstage/getspecialstages",
        })
        .then((response) => {
          console.log("Special Stages received: ", response.data);
          let stageslocal = response.data;
          let stagecopy = [];
          if (receive == false) {
            setRecieve(true);
            for (let i = 0; i < stageslocal.length; i++) {
              console.log("Stage: ", stageslocal[i].name);
              stagecopy.push({
                value: stageslocal[i].id,
                label: stageslocal[i].name,
              });
            }
            console.log("Stage copy: ", stagecopy);
            setSpecialstages(stagecopy);
          }
        });
      setRecieve(true);
    }
  }, [specialStages]);

  function uptime() {
    if (pressed === "hour") {
      if (starthour + 1 < 24) {
        setstarthour((prev) => prev + 1);
      }
    } else if (pressed === "minute") {
      if (startminute + 1 < 60) {
        setstartminute((prev) => prev + 1);
      }
    } else if (pressed === "second") {
      if (startsecond + 1 < 60) {
        setstartsecond((prev) => prev + 1);
      }
    } else if (pressed === "milli") {
      if (startmilli + 1 < 1000) {
        setstartmilli((prev) => prev + 1);
      }
    }
  }

  function downtime() {
    if (pressed === "hour") {
      if (starthour - 1 >= 0) {
        setstarthour((prev) => prev - 1);
      }
    } else if (pressed === "minute") {
      if (startminute - 1 >= 0) {
        setstartminute((prev) => prev - 1);
      }
    } else if (pressed === "second") {
      if (startsecond - 1 >= 0) {
        setstartsecond((prev) => prev - 1);
      }
    } else if (pressed === "milli") {
      if (startmilli - 1 >= 0) {
        setstartmilli((prev) => prev - 1);
      }
    }
  }

  async function issuestart() {
    try {
      const option = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      let t = new Date();
      t.setHours(starthour);
      t.setMinutes(startminute);
      t.setSeconds(startsecond);
      t.setMilliseconds(startmilli);
      const currentTime = t.toLocaleTimeString("en-US", option);
      if (mode === "start") {
        if (starts.indexOf(input.substring(1)) != -1) {
          starts[starts.indexOf(input.substring(1))].starttime = currentTime;
        } else {
          starts.unshift({
            no: input.substring(1),
            starttime: currentTime,
            finishtime: "-",
            stoptime: "-",
          });
        }
      } else if (mode === "stop") {
        if (starts.indexOf(input.substring(1)) != -1) {
          starts[starts.indexOf(input.substring(1))].finishtime = "--";
          starts[starts.indexOf(input.substring(1))].stoptime = currentTime;
        }
      } else if (mode === "finish") {
        starts[starts.indexOf(input.substring(1))].finishtime = currentTime;
        starts[starts.indexOf(input.substring(1))].stoptime = currentTime; // Tha pairnei thn afairesh apo thn vash
      } else {
        return;
      }

      return;
    } catch (error) {
      console.error("Error", error);
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
      if (startminute - minutes2 == 0) {
        if (minutes2 + 1 > 59) {
          hours2 = hours2 + 1;
          minutes2 = 0;
        } else {
          minutes2 = minutes2 + 1;
        }
        setstarthour(hours2);
        setstartminute(minutes2);
        setstartsecond(0);
        setstartmilli(0);
      }
    }
  }, 1000);

  return (
    <div className="admin-container">
      <div className="times">
        <div className="row">
          <div className="blines">
            <div className="names">No</div>
            <div className="stimes">Start Time</div>
            <div className="stimes">Finish Time</div>
            <div className="stimes">Stop Time</div>
          </div>
          <div className="timeboard">
            {starts.map((finish) => {
              if (true) {
                return (
                  <div className="blines" key={finish.no}>
                    <div
                      className="names"
                      style={{ color: "white" }}
                      id={"name" + finish.no}
                    >
                      {finish.no}
                    </div>
                    <div
                      className="stimes"
                      style={{ color: "white" }}
                      id={"stimes" + finish.start}
                    >
                      {finish.start}
                    </div>
                    <div
                      className="stimes"
                      style={{ color: "white" }}
                      id={"stimes" + finish.time}
                    >
                      {finish.time}
                    </div>
                    <div
                      className="stimes"
                      style={{ color: "white" }}
                      id={"stimes" + finish.stop}
                    >
                      {finish.stop}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
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
            }}
          >
            1
          </div>
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 2);
            }}
          >
            2
          </div>
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 3);
            }}
          >
            3
          </div>
        </div>
        <div className="lines">
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 4);
            }}
          >
            4
          </div>
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 5);
            }}
          >
            5
          </div>
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 6);
            }}
          >
            6
          </div>
        </div>
        <div className="lines">
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 7);
            }}
          >
            7
          </div>
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 8);
            }}
          >
            8
          </div>
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 9);
            }}
          >
            9
          </div>
        </div>
        <div className="lines">
          <div
            className="number"
            onClick={() => {
              setinput(input + "" + 0);
            }}
          >
            0
          </div>
          <div
            className="number"
            onClick={() => {
              if (input == "#") {
                return;
              }
              setinput(input.slice(0, -1));
            }}
          >
            <FontAwesomeIcon icon={faDeleteLeft} style={{ color: "#FFD43B" }} />
          </div>
        </div>
        <div className="lines">
          <div className="startbuttom" onClick={issuestart}>
            Issue Start
          </div>
        </div>
      </div>

      <div className="time">
        <div className="lines">
          <Select
            placeholder="Select Special Stage"
            options={specialStages}
            styles={styles}
            onChange={handlechange}
            className="select"
          />
        </div>
        <div className="lines">
          <Select
            placeholder="Select Mode"
            options={options1}
            styles={styles}
            onChange={handlechange1}
            className="select"
          />
        </div>
        <div className="lines">
          <h1
            className="starthour"
            id="hour"
            onClick={() => {
              setpressed("hour");
              console.log(pressed);
              select("hour");
            }}
          >
            {starthour}
          </h1>
          <h1 className="starthour">:</h1>
          <h1
            className="starthour"
            id="minute"
            onClick={() => {
              setpressed("minute");
              select("minute");
            }}
          >
            {startminute}
          </h1>
          <h1 className="starthour">:</h1>
          <h1
            className="starthour"
            id="second"
            onClick={() => {
              setpressed("second");
              select("second");
            }}
          >
            {startsecond}
          </h1>
          <h1 className="starthour">:</h1>
          <h1
            className="starthour"
            id="milli"
            onClick={() => {
              setpressed("milli");
              select("milli");
            }}
          >
            {startmilli}
          </h1>
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

export default Admin;
