import React from "react";
import { useState, useEffect } from "react";
import styles from "./Style/Start.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const Start = () => {
  const [input, setinput] = useState("#");
  const [time, settime] = useState(new Date().getTime());
  const [starthour, setstarthour] = useState(new Date().getHours());
  const [startminute, setstartminute] = useState(new Date().getMinutes() + 1);
  const [start, setstart] = useState(starthour + ":" + startminute);
  const handlechange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [starts, setstarts] = useState([]);
  const [unreceived, setunreceived] = useState([]);

  const options = [
    { value: 1, label: "Eleftherochori" },
    { value: 2, label: "Lamia" },
    { value: 3, label: "Igoumenitsa" },
  ];

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
      if (starthour + 1 == 24) {
        setstarthour(0);
      } else {
        setstarthour((prev) => prev + 1);
      }
      setstartminute(0);
    } else {
      setstartminute((prev) => prev + 1);
    }
  }

  function downtime() {
    if (startminute - 1 < 0) {
      if (new Date().getMinutes() < 59) {
        if (starthour - 1 == -1) {
          starthour = 23;
        } else {
          setstarthour((prev) => prev - 1);
        }
        setstartminute(59);
      }
    } else {
      if (
        startminute - 1 >= new Date().getMinutes() + 1 ||
        starthour > new Date().getHours()
      ) {
        setstartminute((prev) => prev - 1);
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
      t.setSeconds(0);
      const currentTime = t.toLocaleTimeString("en-US", option);
      starts.unshift({
        no: input.substring(1),
        time: currentTime,
        timevariable: t,
      });
      unreceived.push(input.substring(1));
      uptime();

      const devicepromise = navigator.bluetooth.requestDevice({
        filters: [{ services: ["00001805-0000-1000-8000-00805f9b34fb"] }],
      });

      const timeoutpromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("Device not found.");
          reject(new Error("Device not found."));
        }, t.getTime() - new Date().getTime() - 10000);
      });
      const device = await Promise.race([devicepromise, timeoutpromise]);

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(
        "00001805-0000-1000-8000-00805f9b34fb"
      );
      const characteristics = await service.getCharacteristic(
        "00002a2b-0000-1000-8000-00805f9b34fb"
      );
      const characteristics2 = await service.getCharacteristic(
        "00002a37-0000-1000-8000-00805f9b34fb"
      );
      const value = await characteristics2.readValue();

      if (value.getUint8(0) != input.substring(1)) {
        return;
      }

      console.log("Number matched");

      const encoder = new TextEncoder();
      const timedata = encoder.encode(currentTime);
      await characteristics.writeValue(timedata);
      console.log("Time has been sent.", currentTime);

      var array = [...unreceived];
      array.splice(unreceived.indexOf(input.substring(1)), 1);
      setunreceived(array);
      await server.disconnect();
      console.log("Disconnected from server.");
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
      }
    }
  }, 1000);

  return (
    <div className="start-container">
      <div className="times">
        <div className="row">
          <div className="blines">
            <div className="names">No</div>
            <div className="stimes">Start Time</div>
          </div>
          <div className="timeboard">
            {starts.map((start) => {
              if (
                start.timevariable.getHours() < new Date().getHours() ||
                (start.timevariable.getHours() == new Date().getHours() &&
                  start.timevariable.getMinutes() <= new Date().getMinutes())
              ) {
                return (
                  <div className="blines" key={start.no}>
                    <div
                      className="names"
                      style={{ color: "white" }}
                      id={"name" + start.no}>
                      {start.no}
                    </div>
                    <div
                      className="stimes"
                      style={{ color: "white" }}
                      id={"stimes" + start.time}>
                      {start.time}
                    </div>
                  </div>
                );
              } else {
                if (unreceived.includes(start.no)) {
                  return (
                    <div className="blines" key={start.no}>
                      <div
                        className="names"
                        style={{ color: "purple" }}
                        id={"name" + start.no}>
                        {start.no}
                      </div>
                      <div
                        className="stimes"
                        style={{ color: "purple" }}
                        id={"stimes" + start.time}>
                        {start.time}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="blines" key={start.no}>
                      <div
                        className="names"
                        style={{ color: "yellowgreen" }}
                        id={"name" + start.no}>
                        {start.no}
                      </div>
                      <div
                        className="stimes"
                        style={{ color: "yellowgreen" }}
                        id={"stimes" + start.time}>
                        {start.time}
                      </div>
                    </div>
                  );
                }
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
          <div className="startbuttom" onClick={issuestart}>
            Issue Start
          </div>
        </div>
      </div>

      <div className="time">
        <div className="lines">
          <Select
            placeholder="Select special stage"
            options={options}
            styles={styles}
            onChange={handlechange}
            className="select"
          />
        </div>
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
