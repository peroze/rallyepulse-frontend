import React from "react";
import { useState, useEffect } from "react";
import styles from "./Style/Finish.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import timekeepingService from "../Services/timekeeping.service";
import { MyButtons } from "./MyButtons.tsx";
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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

const Finish = () => {
  const [date, setdate] = useState();
  const [input, setinput] = useState("#");
  const [finishnumber, setfinishnumber] = useState(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [time, settime] = useState(
    new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds()
  );
  const [selectedkey, setselectedkey] = useState(-1);
  const [finishes, setfinishes] = useState([]);
  const [unreceived, setunreceived] = useState([]);
  const handlechange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const [specialStages, setSpecialstages] = useState([]);
  const [receive, setRecieve] = useState(false);
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
      // setRecieve(receive + 1);
      // console.log(receive);
      // console.log("In Special Stages useEffect");
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

  function StartBluetooth() {
    console.log("Start Bluetooth");
    const device = navigator.bluetooth
      .requestDevice({
        filters: [{ services: ["00001805-0000-1000-8000-00805f9b34fb"] }],
      })
      .then((device) => {
        const server = device.gatt.connect().then(async (server) => {
          const service = server
            .getPrimaryService("00001805-0000-1000-8000-00805f9b34fb")
            .then((service) => {
              const characteristics2 = service
                .getCharacteristic("00002a37-0000-1000-8000-00805f9b34fb")
                .then((characteristic) => {
                  const value = characteristic
                    .readValue()
                    .then(async (value) => {
                      const encoder = new TextDecoder();
                      const timedata = encoder.decode(value);
                      console.log("Co_Number " + timedata);
                      setfinishnumber(timedata);
                      await server.disconnect();
                    });
                });
            });
        });

        console.log("Disconnected from server.");
        return;
      });
    return;
  }

  function BeamsSimulator() {
    console.log("Starting");
    let t = new Date();
    setdate(t);
    FinishCar(t, finishnumber);
  }

  function setNumber() {
    //console.log(selectedkey);
    // setfinishnumber(parseInt(input.substring(1)));
    FinishCarManual(date, parseInt(input.substring(1)));
  }

  function FinishCar(car_time, finishnumbers) {
    setTimeout(() => {
      if (finishnumbers === -1) {
        finishes.unshift({
          key: finishes.length + 1,
          no: "--",
          time:
            car_time.getHours() +
            ":" +
            car_time.getMinutes() +
            ":" +
            car_time.getSeconds(),
          start: "--",
          stop: "--",
          timevar: car_time,
        });
        onOpen();
        return;
      } else {
        //console.log(car_time * 1000000);
        window.request
          .request({
            data: {
              co_number: finishnumbers,
              stage: selectedOption.value,
              hour: car_time.getHours(),
              minute: car_time.getMinutes(),
              second: car_time.getSeconds(),
              nano: car_time.getMilliseconds() * 1000000,
              decimal: 3,
            },
            method: "PUT",
            url: "http://localhost:8080/api/time",
          })
          .then((response) => {
            console.log("Time started: ", response.data);
            finishes.unshift({
              key: finishes.length + 1,
              no: finishnumber,
              time:
                car_time.getHours() +
                ":" +
                car_time.getMinutes() +
                ":" +
                car_time.getSeconds() +
                ":" +
                car_time.getMilliseconds(),
              start: response.data.start_time,
              stop: response.data.total_time,
            });
            setfinishnumber(-1);
            //StartBluetooth();
          })
          .catch((error) => {
            console.error("Error Uploading Start Time:", error);
            throw error; // Rethrow the error to handle it in the caller
          });
      }
    }, 5000);
  }

  function FinishCarManual(car_time, finishnumbers, key) {
    if (finishnumbers === -1) {
      return;
    } else {
      console.log(car_time * 1000000);
      window.request
        .request({
          data: {
            co_number: finishnumbers,
            stage: selectedOption.value,
            hour: car_time.getHours(),
            minute: car_time.getMinutes(),
            second: car_time.getSeconds(),
            nano: car_time.getMilliseconds() * 1000000,
            decimal: 3,
          },
          method: "PUT",
          url: "http://localhost:8080/api/time",
        })
        .then((response) => {
          console.log("Time started: ", response.data);
          // console.log(key.currentKey);
          // if (
          //   finishes
          //     .map((finish) => finish.key)
          //     .indexOf(parseInt(key.currentKey)) != -1
          // ) {
          //   finishes[
          //     finishes
          //       .map((finish) => finish.key)
          //       .indexOf(parseInt(key.currentKey))
          //   ].start = response.data.start_time;
          //   finishes[
          //     finishes
          //       .map((finish) => finish.key)
          //       .indexOf(parseInt(key.currentKey))
          //   ].stop = response.data.total_time;
          //   finishes[
          //     finishes
          //       .map((finish) => finish.key)
          //       .indexOf(parseInt(key.currentKey))
          //   ].no = finishnumbers;
          //   setfinishnumber(-1);
          //   //StartBluetooth();
          // }
          finishes[finishes.length - 1].no = finishnumbers;
          finishes[finishes.length - 1].start = response.data.start_time;
          finishes[finishes.length - 1].stop = response.data.total_time;
        })
        .catch((error) => {
          console.error("Error Uploading Start Time:", error);
          throw error; // Rethrow the error to handle it in the caller
        });
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
    <div className="finish-container">
      <div className="times">
        <div className="row">
          <Table
            selectionMode="single"
            selectionBehavior="replace"
            onSelectionChange={(key) => {
              setselectedkey(parseInt(key.currentKey));
            }}
            isStriped
            aria-label="Stop Table">
            <TableHeader>
              <TableColumn>No</TableColumn>
              <TableColumn>Start</TableColumn>
              <TableColumn>Finish</TableColumn>
              <TableColumn>Total</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No cars to display."}>
              {finishes.map((finish) => {
                if (finish.no != "--") {
                  return (
                    <TableRow key={finish.key}>
                      <TableCell>{finish.no}</TableCell>
                      <TableCell>{finish.start}</TableCell>
                      <TableCell>{finish.time}</TableCell>
                      <TableCell>{finish.stop}</TableCell>
                    </TableRow>
                  );
                } else {
                  return (
                    <TableRow className="text-red-700" key={finish.key}>
                      <TableCell className="text-red-700">
                        {finish.no}
                      </TableCell>
                      <TableCell className="text-red-700">
                        {finish.start}
                      </TableCell>
                      <TableCell className="text-red-700">
                        {finish.time}
                      </TableCell>
                      <TableCell className="text-red-700">
                        {finish.stop}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="info">
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
          <h1>{time}</h1>
        </div>
      </div>
      <div className="controls">
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
          <div className="startbuttom" onClick={setNumber}>
            Set Competitor Number
          </div>
        </div>
        <div className="lines">
          <MyButtons color="blue" onClick={StartBluetooth}>
            Start Bluetooth
          </MyButtons>
          <MyButtons color="red" onClick={BeamsSimulator}>
            Beams Simulator
          </MyButtons>
        </div>
      </div>
      <Modal size={"xl"} isOpen={isOpen} onClose={onClose} backdrop={"blur"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Missing Number
              </ModalHeader>
              <ModalBody>
                <p>
                  The Competitor Number Was Not Received. Please Select The Last
                  Finish, Type The Number And Press Set Number.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
export default Finish;
