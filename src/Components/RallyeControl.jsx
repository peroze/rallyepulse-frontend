import React from "react";
import styles from "./Style/RallyeControl.css";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { MyButtons } from "./MyButtons.tsx";
import Select from "react-select";
import { useState, useEffect } from "react";
import MembersList from "./MembersList.jsx";
import { Slider } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StageList from "./StageList.jsx";
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

const RallyeControl = () => {
  const handlechange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [tc, settc] = useState();
  const [tcday, settcday] = useState();
  const [tcmonth, settcmonth] = useState();
  const [tchour, settchour] = useState();
  const [tcminute, settcminute] = useState();
  const [rtitle, setrtitle] = useState();
  const [ntitle, setntitle] = useState();
  const [nbody, setnbody] = useState();
  const [rid, setrid] = useState();
  const [rdate, setrdate] = useState();
  const [rcity, setrcity] = useState();

  const navigate = useNavigate();
  const [penaltycar, setpenaltycar] = useState();
  const [penaltyminutes, setpenaltyminutes] = useState(0);
  const [penaltyseconds, setpenaltyseconds] = useState(0);
  const location = useLocation();
  const [loading, setLoading] = React.useState(true);
  const data = location.state;
  const [selected, setSelected] = React.useState("results");
  useEffect(() => {
    if (loading == true) {
      if (data != null) {
        console.log("data received: ", selected);
        setSelected(data.key);
      } else {
        setSelected("results");
      }
    }
  }, [loading]);

  const [ss, setss] = useState();
  const [catclass, setCatclass] = useState();
  const [visibleSecondModal, setVisibleSecondModal] = useState(false);
  // const closeSecondModal = () => setVisibleSecondModal(false);
  // const openSecondModal = () => setVisibleSecondModal(true);
  const [selectedModal, setSelectedModal] = useState();
  const [receive, setRecieve] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [specialStages, setSpecialstages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { isOpen2, onOpen2, onClose2 } = useDisclosure();

  const handlepenaltycarChange = (e) => {
    setpenaltycar(e.target.value);
    console.log(e.target.value);
  };

  const handlertitle = (e) => {
    setrtitle(e.target.value);
    console.log(e.target.value);
  };
  const handlentitle = (e) => {
    setntitle(e.target.value);
    console.log(e.target.value);
  };
  const handlenbody = (e) => {
    setnbody(e.target.value);
    console.log(e.target.value);
  };

  const handlerdate = (e) => {
    setrdate(e.target.value);
    console.log(e.target.value);
  };

  const handlercity = (e) => {
    setrcity(e.target.value);
    console.log(e.target.value);
  };

  const handlerid = (e) => {
    setrid(e.target.value);
    console.log(e.target.value);
  };

  const handleclasscatselect = (e) => {
    setCatclass(e.target.value);
    console.log(e.target.value);
  };
  const handlepenaltyminuteChange = (newvalue) => {
    setpenaltyminutes(newvalue);
    console.log(newvalue);
  };
  const handlepenaltysecondChange = (newvalue) => {
    setpenaltyseconds(newvalue);
    console.log(newvalue);
  };
  const handlestageselect = (newvalue) => {
    setss(newvalue);
    console.log(newvalue);
  };
  const handletc = (e) => {
    settc(e.target.value);
    console.log(e.target.value);
  };

  const handletcday = (e) => {
    settcday(e.target.value);
    console.log(e.target.value);
  };

  const handletcmonth = (e) => {
    settcmonth(e.target.value);
    console.log(e.target.value);
  };

  const handletchour = (e) => {
    settchour(e.target.value);
    console.log(e.target.value);
  };

  const handletcminute = (e) => {
    settcminute(e.target.value);
    console.log(e.target.value);
  };

  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();

  const {
    isOpen: isOpen4,
    onOpen: onOpen4,
    onClose: onClose4,
  } = useDisclosure();

  const {
    isOpen: isOpen5,
    onOpen: onOpen5,
    onClose: onClose5,
  } = useDisclosure();

  const {
    isOpen: isOpen6,
    onOpen: onOpen6,
    onClose: onClose6,
  } = useDisclosure();

  const {
    isOpen: isOpen7,
    onOpen: onOpen7,
    onClose: onClose7,
  } = useDisclosure();

  const {
    isOpen: isOpen8,
    onOpen: onOpen8,
    onClose: onClose8,
  } = useDisclosure();
  const {
    isOpen: isOpen9,
    onOpen: onOpen9,
    onClose: onClose9,
  } = useDisclosure();

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

  function stageselectcloses() {
    onClose();
    window.request
      .request({
        method: "GET",
        url:
          "http://localhost:8080/api/time/getStageClassification/" + ss.value,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/resultsstage", {
          state: {
            results: response.data,
            stage_name: ss.label,
          },
        });
      });
  }

  function stageselectcloses() {
    onClose();
    window.request
      .request({
        method: "GET",
        url:
          "http://localhost:8080/api/time/getStageClassification/" + ss.value,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/resultsstage", {
          state: {
            results: response.data,
            stage_name: ss.label,
          },
        });
      });
  }

  function overallresults() {
    window.request
      .request({
        method: "GET",
        url: "http://localhost:8080/api/time/getOverallClassification",
      })
      .then((response) => {
        console.log(response.data);
        navigate("/results", {
          state: {
            results: response.data,
            stage_name: "Overall",
          },
        });
      });
  }

  function temporaroverallselectcloses() {
    onClose();
    window.request
      .request({
        method: "GET",
        url: "http://localhost:8080/api/time/getOverallByStage/" + ss.value,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/results", {
          state: {
            results: response.data,
            stage_name: ss.label,
          },
        });
      });
  }

  function catclassrsultcloses() {
    onClose7();
    window.request
      .request({
        method: "GET",
        url: "http://localhost:8080/api/time/getOverallByStage/" + ss.value,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/results", {
          state: {
            results: response.data,
            stage_name: ss.label,
          },
        });
      });
  }

  function penaltyselectcloses() {
    onClose2();
    setpenalty();
  }
  function setselect() {
    setSelectedModal("St");
    onOpen();
  }
  function startlistchange() {
    onClose3();
    if (tc == 0) {
      window.request
        .request({
          method: "POST",
          url: "http://localhost:8080/api/startlist",
          data: {
            hours: tchour,
            minutes: tcminute,
            month: tcmonth,
            day: tcday,
            tc: tc,
          },
        })
        .then((response) => {
          console.log(response.data);
          navigate("/startlist", {
            state: {
              results: response.data,
            },
          });
        });
    }
  }

  function finalresults() {
    onClose5();
    window.request
      .request({
        method: "POST",
        url: "http://localhost:8080/api/rallyeinfo/final",
      })
      .then(() => {
        window.request
          .request({
            method: "GET",
            url: "http://localhost:8080/api/time/getOverallClassification",
          })
          .then((response) => {
            navigate("/results", {
              state: {
                results: response.data,
              },
            });
          });
      });
  }

  function deleterallye() {
    onClose4();
    window.request
      .request({
        method: "DELETE",
        url: "http://localhost:8080/api/rallyeinfo/delete",
      })
      .then((response) => {
        onOpen8();
      });
  }

  function createrallye() {
    onClose4();
    window.request
      .request({
        method: "POST",
        data: {
          id: rid,
          title: rtitle,
          date: rdate,
          city: rcity,
          resulte: false,
        },
        url: "http://localhost:8080/api/rallyeinfo",
      })
      .then((response) => {
        onClose8();
      });
  }

  function rallyenotification() {
    onClose9();
    window.request
      .request({
        method: "POST",
        data: {
          title: ntitle,
          body: nbody,
        },
        url: "http://localhost:8080/api/notifications/send",
      })
      .then((response) => {});
  }

  function setpenalty() {
    let time = new Date();
    time = time.setHours(0, penaltyminutes, penaltyseconds, 0);
    window.request
      .request({
        method: "PUT",
        url: "http://localhost:8080/api/penalty/addPenalty",
        data: {
          co_number: penaltycar,
          minutes: penaltyminutes,
          seconds: penaltyseconds,
        },
      })
      .then(() => {});
  }

  return (
    <div className="control-container w-screen ">
      <Tabs
        className="w-screen justify-center"
        key="tab-panel"
        color={"warning"}
        aria-label="Tabs colors"
        radius="full"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab
          key="results"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faSquarePollHorizontal}
                style={{ color: "#ffffff" }}
              />
              <span>Results</span>
            </div>
          }
        >
          <Card className="control-card ">
            <CardHeader title="Results" />
            <CardBody className="gap-4 h-full">
              <MyButtons color="def" onClick={overallresults}>
                Overall Results
              </MyButtons>
              <MyButtons color="def" onClick={onOpen6}>
                Overall Results by Stage
              </MyButtons>
              <MyButtons color="def" onClick={onOpen7}>
                Overall Results by Category/Class
              </MyButtons>
              <MyButtons color="def" onClick={onOpen}>
                Stage Results
              </MyButtons>
              <MyButtons color="def" onClick={onOpen3}>
                Issue Start List
              </MyButtons>
              <MyButtons color="def" onClick={onOpen2}>
                Add Penalty
              </MyButtons>
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="entrylist"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faIdCard} style={{ color: "#ffffff" }} />
              <span>Entry List</span>
            </div>
          }
        >
          <Card className="control-card  w-screen">
            <CardHeader title="Entry List" />
            <CardBody>
              <MembersList></MembersList>
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="stages"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faRoad} style={{ color: "#ffffff" }} />
              <span>Special Stages</span>
            </div>
          }
        >
          <Card className="control-card  w-screen">
            <CardHeader title="Stage List" />
            <CardBody>
              <StageList></StageList>
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="dangerzone"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#ffffff" }}
              />
              <span>Danger Zone</span>
            </div>
          }
        >
          <Card className="control-card">
            <CardHeader title="Danger Zone" />
            <CardBody className="gap-4 h-full">
              <MyButtons color="red" onClick={onOpen9}>
                Send Notification
              </MyButtons>
              <MyButtons color="red" onClick={onOpen5}>
                Final Results
              </MyButtons>
              <MyButtons color="red" onClick={onOpen4}>
                Delete Database And Start New Rallye
              </MyButtons>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      <Modal size={"xl"} isOpen={isOpen} onClose={onClose} backdrop={"blur"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1> Issue Stage Result </h1>
              </ModalHeader>
              <ModalBody>
                <Select
                  placeholder="Select Special Stage"
                  options={specialStages}
                  styles={styles}
                  onChange={handlestageselect}
                  className="select"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onPress={stageselectcloses}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size={"xl"} isOpen={isOpen2} onClose={onClose2} backdrop={"blur"}>
        <ModalContent>
          {(onClose2) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1> Add Penalty </h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Competitor's Number"
                  placeholder="Enter Competitor's Number"
                  value={penaltycar}
                  onChange={handlepenaltycarChange}
                />
                <Slider
                  label="Add Minutes"
                  showTooltip={true}
                  step={1}
                  maxValue={60}
                  minValue={0}
                  onChange={handlepenaltyminuteChange}
                  value={penaltyminutes}
                  marks={[
                    {
                      value: 15,
                      label: "15m",
                    },
                    {
                      value: 30,
                      label: "30m",
                    },
                    {
                      value: 45,
                      label: "45m",
                    },
                  ]}
                  className="max-w-md"
                />
                <Slider
                  label="Add Seconds"
                  showTooltip={true}
                  onChange={handlepenaltysecondChange}
                  value={penaltyseconds}
                  step={1}
                  maxValue={60}
                  minValue={0}
                  marks={[
                    {
                      value: 15,
                      label: "15s",
                    },
                    {
                      value: 30,
                      label: "30s",
                    },
                    {
                      value: 45,
                      label: "45s",
                    },
                  ]}
                  className="max-w-md"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose2}>
                  No
                </Button>
                <Button color="primary" onPress={penaltyselectcloses}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size={"xl"} isOpen={isOpen3} onClose={onClose3} backdrop={"blur"}>
        <ModalContent>
          {(onClose3) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1> Issue Start List </h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  value={tc}
                  onChange={handletc}
                  label="Time Control"
                  placeholder="Enter Time Control"
                />
                <Input
                  type="text"
                  value={tcday}
                  onChange={handletcday}
                  label="Day Of Month"
                  placeholder="Enter the Day of month"
                />
                <Input
                  type="text"
                  value={tcmonth}
                  onChange={handletcmonth}
                  label="Month of Year"
                  placeholder="Enter the month of year"
                />
                <Input
                  type="text"
                  value={tchour}
                  onChange={handletchour}
                  label="Hour Of Day"
                  placeholder="Enter the hour of day"
                />
                <Input
                  type="text"
                  value={tcminute}
                  onChange={handletcminute}
                  label="Minute Of Hour"
                  placeholder="Enter the minute of hour"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose3}>
                  No
                </Button>
                <Button color="primary" onPress={startlistchange}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size={"xl"} isOpen={isOpen4} onClose={onClose4} backdrop={"blur"}>
        <ModalContent>
          {(onClose4) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>Rallye Deletion</h1>
              </ModalHeader>
              <ModalBody>
                <p>
                  Do you really want to delete this rallye? This action is
                  permanent!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose4}>
                  No
                </Button>
                <Button color="primary" onPress={deleterallye}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size={"xl"} isOpen={isOpen8} onClose={onClose8} backdrop={"blur"}>
        <ModalContent>
          {(onClose4) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>Rallye Creation</h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  value={rid}
                  onChange={handlerid}
                  label="Id"
                  placeholder="Enter the id of the event"
                />
                <Input
                  type="text"
                  value={rtitle}
                  onChange={handlertitle}
                  label="Rallye title"
                  placeholder="Enter the title of the event"
                />
                <Input
                  type="text"
                  value={rdate}
                  onChange={handlerdate}
                  label="Date"
                  placeholder="Enter the date of the event"
                />
                <Input
                  type="text"
                  value={rcity}
                  onChange={handlercity}
                  label="City"
                  placeholder="Enter the City "
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose8}>
                  No
                </Button>
                <Button color="primary" onPress={createrallye}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size={"xl"} isOpen={isOpen5} onClose={onClose5} backdrop={"blur"}>
        <ModalContent>
          {(onClose5) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1> Issue Final Results </h1>
              </ModalHeader>
              <ModalBody>
                <p>
                  Do you really want to issue final results? This action is
                  permanent!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose5}>
                  No
                </Button>
                <Button color="primary" onPress={finalresults}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size={"xl"} isOpen={isOpen6} onClose={onClose6} backdrop={"blur"}>
        <ModalContent>
          {(onClose6) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1> Overall Results by Stage </h1>
              </ModalHeader>
              <ModalBody>
                <Select
                  placeholder="Select Special Stage"
                  options={specialStages}
                  styles={styles}
                  onChange={handlestageselect}
                  className="select"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose6}>
                  No
                </Button>
                <Button color="primary" onPress={temporaroverallselectcloses}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size={"xl"} isOpen={isOpen7} onClose={onClose7} backdrop={"blur"}>
        <ModalContent>
          {(onClose6) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1> Results by Category/Class </h1>
              </ModalHeader>
              <ModalBody>
                <Select
                  placeholder="Select Category or Class"
                  options={specialStages}
                  styles={styles}
                  onChange={handleclasscatselect}
                  className="select"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose7}>
                  No
                </Button>
                <Button color="primary" onPress={catclassrsultcloses}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size={"xl"} isOpen={isOpen9} onClose={onClose9} backdrop={"blur"}>
        <ModalContent>
          {(onClose9) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>Create Notification</h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  value={ntitle}
                  onChange={handlentitle}
                  label="Notification title"
                  placeholder="Enter the title of the notification"
                />
                <Input
                  type="text"
                  value={nbody}
                  onChange={handlenbody}
                  label="Notification body"
                  placeholder="Enter the body of the notification"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose9}>
                  No
                </Button>
                <Button color="primary" onPress={rallyenotification}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RallyeControl;
