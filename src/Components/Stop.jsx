import React from "react";
import { useState, useEffect } from "react";
import styles from "./Style/Stop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import timekeepingService from "../Services/timekeeping.service";
import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@nextui-org/react";

const Stop = () => {
  const [time, settime] = useState(
    new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds()
  );
  const [finishes, setfinishes] = useState([]);
  const [unreceived, setunreceived] = useState([]);
  const [specialStages, setSpecialstages] = useState([]);
  const [receive, setRecieve] = useState(false);
  const handlechange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const [selectedOption, setSelectedOption] = useState(null);
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

  async function StartBluetooth(inputcarnumber, stoptime) {
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

    if (value.getUint8(0) != inputcarnumber) {
      return;
    }

    console.log("Number matched");

    const encoder = new TextEncoder();
    const timedata = encoder.encode(stoptime);
    await characteristics.writeValue(timedata);
    console.log("Time has been sent.", stoptime);

    var array = [...unreceived];
    array.splice(unreceived.indexOf(input.substring(1)), 1);
    setunreceived(array);
    await server.disconnect();
    console.log("Disconnected from server.");
    return;

    return;
  }

  function StopCar(car_time) {
    if (finishnumber === -1) {
      return;
    } else {
      finishes.unshift({
        no: finishnumber,
        time: car_time,
        start: car_time,
        stop: car_time,
        key: finishes.length + 1,
      });
      unreceived.push(finishnumber);
      setfinishnumber(-1);
      StartBluetooth();
    }

    return;
  }

  const options = [
    { value: 1, label: "Eleftherochori" },
    { value: 2, label: "Lamia" },
    { value: 3, label: "Igoumenitsa" },
  ];

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
  }, 1000);

  return (
    <div className="stop-container">
      <div className="times">
        <div className="row">
          <Table isStriped aria-label="Stop Table">
            <TableHeader>
              <TableColumn>No</TableColumn>
              <TableColumn>Start</TableColumn>
              <TableColumn>Finish</TableColumn>
              <TableColumn>Stop</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No cars to display."}>
              {finishes.map((finish) => (
                <TableRow key={finish.key}>
                  <TableCell>{finish.no}</TableCell>
                  <TableCell>{finish.starttime}</TableCell>
                  <TableCell>{finish.finishtime}</TableCell>
                  <TableCell>{finish.stoptime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="info">
        <div className="lines">
          <Select
            placeholder="Select special stage"
            options={specialStages}
            styles={styles}
            onChange={handlechange}
            className="select"
          />
        </div>
        <div className="lines">
          <h1>{time}</h1>
        </div>
      </div>
    </div>
  );
};
export default Stop;
