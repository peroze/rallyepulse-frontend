import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import usericon from "../Images/user.png";
import { Image, Input } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import styles from "./Style/Profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const location = useLocation();
  const data = location.state;
  const user = data.userVar;
  const [value, setValue] = React.useState(0);
  const [updatebool, setUpdate] = React.useState(data.update);
  const [newEntry, setnewEntry] = React.useState(data.newEntry);
  const [driver, setDriver] = React.useState(data.userVar.driver);
  const [codriver, setCodriver] = React.useState(data.userVar.codriver);
  const [email, setEmail] = React.useState(data.userVar.email);
  const [telephone, setTelephone] = React.useState(data.userVar.telephone);
  const [vehicle, setVehicle] = React.useState(data.userVar.vehicle);
  const [category, setCategory] = React.useState(data.userVar.category);
  const [car_class, setCarClass] = React.useState(data.userVar.car_class);
  const [co_number, setCoNumber] = React.useState(data.userVar.co_number);
  const navigate = useNavigate();
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const validateNumber = (value) => !isNaN(value);
  const isInvalid = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);
  const isInvalidNumber = React.useMemo(() => {
    if (co_number === "") return false;

    return validateNumber(co_number) ? false : true;
  }, [co_number]);

  const validateTelephone = (value) => !isNaN(value) && value.length == 10;
  const isInvalidTelephone = React.useMemo(() => {
    if (telephone === "") return false;

    return validateTelephone(telephone) ? false : true;
  }, [telephone]);

  const isInvalidDriver = React.useMemo(() => {
    if (driver === "") return false;
    return true;
  }, [driver]);

  const isInvalidCoDriver = React.useMemo(() => {
    if (codriver === "") return false;

    return true;
  }, [codriver]);

  const isInvalidClass = React.useMemo(() => {
    if (car_class === "") return false;

    return true;
  }, [car_class]);

  const isInvalidCategory = React.useMemo(() => {
    if (category === "") return false;

    return true;
  }, [category]);

  const isInvalidVehicle = React.useMemo(() => {
    if (vehicle === "") return false;

    return true;
  }, [vehicle]);

  function onclick() {
    console.log(newEntry);
    if (newEntry) {
      window.request
        .request({
          method: "POST",
          data: {
            co_number: parseInt(co_number),
            driver: driver,
            codriver: codriver,
            email: email,
            telephone: telephone,
            vehicle: vehicle,
            category: category,
            car_class: car_class,
          },
          url: "http://localhost:8080/api/competitor",
        })
        .then((response) => {
          toast.success(
            "The competitor has been succesfully inserted in the database! 😃",
            { autoClose: 5000 }
          );
          console.log("Special Stages received: ", response.data);
          navigate("/control");
        });
      // .catch((error) => {
      //   toast.error(
      //     "There was an issue with the insertion of the competitor. Please try again.",
      //     { autoClose: 15000 }
      //   );
      // });
    } else {
      window.request
        .request({
          method: "PUT",
          data: {
            co_number: co_number,
            driver: driver,
            codriver: codriver,
            email: email,
            telephone: telephone,
            vehicle: vehicle,
            category: category,
            car_class: car_class,
          },
          url: "http://localhost:8080/api/competitors",
        })
        .then((response) => {
          toast.info(
            "The competitor has been succesfully inserted in the database! 😃",
            { autoClose: 5000 }
          );
          console.log("Special Stages received: ", response.data);
        })
        .catch((error) => {
          toast.error(
            "There was an issue with the insertion of the competitor. Please try again.",
            { autoClose: 15000 }
          );
        });
    }

    return;
  }

  function view() {
    return (
      <div className="w-7/12 p-5 gap-5 flex flex-col items-center h-fit backdrop-blur-sm bg-black/30 mr-5 mt-10 br-5 rounded-xl">
        <h1 className="font-bold text-xl">Competitor's Details</h1>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            isDisabled
            type="name"
            label="Driver"
            variant="bordered"
            value={user.driver}
          />
          <Input
            isDisabled
            type="name"
            label="Codriver"
            variant="bordered"
            value={user.codriver}
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            isDisabled
            type="tel"
            label="Telephone"
            variant="bordered"
            value={user.telephone}
          />
          <Input
            isDisabled
            type="email"
            label="Email"
            variant="bordered"
            value={user.email}
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            isDisabled
            type="text"
            label="Vehicle"
            variant="bordered"
            value={user.vehicle}
          />
          <Input
            isDisabled
            type="text"
            label="Category"
            variant="bordered"
            value={user.category}
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            isDisabled
            type="text"
            label="Class"
            variant="bordered"
            value={user.car_class}
          />
        </div>
      </div>
    );
  }

  function update() {
    return (
      <div className="w-7/12 p-5 gap-5 flex flex-col items-center h-fit backdrop-blur-sm bg-black/30 mr-5 mt-10 br-5 rounded-xl">
        <h1 className="font-bold text-xl">Competitor's Details</h1>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            type="name"
            label="Driver"
            variant="bordered"
            value={driver}
            onValueChange={setDriver}
            isInvalid={isInvalidDriver}
            color={isInvalidDriver ? "danger" : "success"}
            errorMessage="Please enter a valid driver name"
          />
          <Input
            type="name"
            label="Codriver"
            variant="bordered"
            value={codriver}
            onValueChange={setCodriver}
            isInvalid={isInvalidCoDriver}
            color={isInvalidCoDriver ? "danger" : "success"}
            errorMessage="Please enter a valid co driver name"
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            type="name"
            label="Number"
            variant="bordered"
            value={co_number}
            onValueChange={setCoNumber}
            isInvalid={isInvalidNumber}
            color={isInvalidNumber ? "danger" : "success"}
            errorMessage="Please enter a valid number"
          />
          <Input
            type="tel"
            label="Telephone"
            variant="bordered"
            value={telephone}
            onValueChange={setTelephone}
            isInvalid={isInvalidTelephone}
            color={isInvalidTelephone ? "danger" : "success"}
            errorMessage="Please enter a valid telephone number (ten digits)."
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            type="email"
            label="Email"
            variant="bordered"
            value={email}
            onValueChange={setEmail}
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "success"}
            errorMessage="Please enter a valid email"
          />
          <Input
            type="text"
            label="Vehicle"
            variant="bordered"
            value={vehicle}
            onValueChange={setVehicle}
            isInvalid={isInvalidVehicle}
            color={isInvalidVehicle ? "danger" : "success"}
            errorMessage="Please enter a valid vehicle"
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            type="text"
            label="Category"
            variant="bordered"
            value={category}
            onValueChange={setCategory}
            isInvalid={isInvalidCategory}
            color={isInvalidCategory ? "danger" : "success"}
            errorMessage="Please enter a valid category"
          />
          <Input
            type="text"
            label="Class"
            variant="bordered"
            value={car_class}
            onValueChange={setCarClass}
            isInvalid={isInvalidClass}
            color={isInvalidClass ? "danger" : "success"}
            errorMessage="Please enter a valid class"
          />
        </div>
        <div className="flex items-center justify-center gap-20 ">
          <Button color="success" variant="shadow" onClick={onclick}>
            Insert in the database
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container flex  justify-between w-screen">
      <div className=" w-4/12 p-5 gap-5 flex flex-col items-center h-fit backdrop-blur-sm bg-black/30 ml-5 mt-10 br-5 rounded-xl">
        <div className="  flex justify-center items-center  ">
          <Image
            isBlurred
            width={240}
            src={usericon}
            alt="NextUI Album Cover"
          />
        </div>
        {newEntry != undefined && (
          <div className="">
            <p className="font-bold text-xl">{user.driver}</p>{" "}
          </div>
        )}
        {newEntry != undefined && (
          <div className="">
            <div className="text-red-500 text-l font-semibold">
              {user.codriver}
            </div>
          </div>
        )}
        {newEntry != undefined && (
          <div className="">
            <div className="text-blue-300 mt-1 text-xs font-semibold">
              {user.vehicle}
            </div>
          </div>
        )}
      </div>
      {updatebool == false ? view() : update()}
    </div>
  );
}
