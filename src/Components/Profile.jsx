import { useLocation } from "react-router-dom";
import React from "react";
import usericon from "../Images/user.png";
import { Image, Input } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import styles from "./Style/Profile.css";

export default function Profile() {
  const location = useLocation();
  const data = location.state;
  const user = data.userVar;
  const [value, setValue] = React.useState(0);
  const [updatebool, setUpdate] = React.useState(data.update);

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
            value={user.driver}
          />
          <Input
            type="name"
            label="Codriver"
            variant="bordered"
            value={user.codriver}
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            type="tel"
            label="Telephone"
            variant="bordered"
            value={user.telephone}
          />
          <Input
            type="email"
            label="Email"
            variant="bordered"
            value={user.email}
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            type="text"
            label="Vehicle"
            variant="bordered"
            value={user.vehicle}
          />
          <Input
            type="text"
            label="Category"
            variant="bordered"
            value={user.category}
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            type="text"
            label="Class"
            variant="bordered"
            value={user.car_class}
          />
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
        <div>
          <p className="font-bold text-xl">{user.driver}</p>
        </div>
        <div className="text-red-500 text-l font-semibold">{user.codriver}</div>
        <div className="text-blue-300 mt-1 text-xs font-semibold">
          {user.vehicle}
        </div>
      </div>
      {updatebool == false ? view() : update()}
    </div>
  );
}
