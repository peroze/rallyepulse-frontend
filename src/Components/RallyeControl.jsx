import React from "react";
import styles from "./Style/RallyeControl.css";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import { MyButtons } from "./MyButtons.tsx";
import Select from "react-select";
import { useState, useEffect } from "react";
import MembersList from "./MembersList.jsx";
import { Slider } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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

  const [visibleSecondModal, setVisibleSecondModal] = useState(false);
  // const closeSecondModal = () => setVisibleSecondModal(false);
  // const openSecondModal = () => setVisibleSecondModal(true);
  const [selectedModal, setSelectedModal] = useState();
  const [receive, setRecieve] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [specialStages, setSpecialstages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { isOpen2, onOpen2, onClose2 } = useDisclosure();

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
  }
  function penaltyselectcloses() {
    onClose2();
  }
  function setselect() {
    setSelectedModal("St");
    onOpen();
  }
  function statlistclose() {
    onClose3();
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
    window.request.request({
      method: "DELETE",
      url: "http://localhost:8080/api/rallyeinfo/delete",
    });
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
              <MyButtons color="def">Temporary Results</MyButtons>
              <MyButtons color="def" onClick={onOpen3}>
                Issue Start List
              </MyButtons>
              <MyButtons color="def">Add Rallye 2 Vehicles</MyButtons>
              <MyButtons color="def" onClick={onOpen2}>
                Add Penalty
              </MyButtons>
              <MyButtons color="def" onClick={onOpen}>
                Stage Results
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
                  onChange={handlechange}
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
                />
                <Slider
                  label="Add Minutes"
                  showTooltip={true}
                  step={1}
                  maxValue={60}
                  minValue={0}
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
                  defaultValue={0}
                  className="max-w-md"
                />
                <Slider
                  label="Add Seconds"
                  showTooltip={true}
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
                  defaultValue={0}
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
                  label="Time Control"
                  placeholder="Enter Time Control"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose3}>
                  No
                </Button>
                <Button color="primary" onPress={statlistclose}>
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
    </div>
  );
};

export default RallyeControl;
