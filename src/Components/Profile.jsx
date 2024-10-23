import { useLocation } from "react-router-dom";
import React from "react";
import usericon from "../Images/user.png";
import { Image, Input } from "@nextui-org/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Checkout from "./Checkout.jsx";
import { Checkbox } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

export default function Profile() {
  const location = useLocation();
  const data = location.state;
  const user = data.userVar;
  const [value, setValue] = React.useState(0);
  const [updatebool, setUpdate] = React.useState(data.update);
  const team = user.team.split(",");
  const [isDriver, setIsDriver] = React.useState(user.athlete);
  const [isMarshall, setIsMarhsall] = React.useState(user.executive);
  const [car, setCar] = React.useState(new Set([user.car]));
  const [active, setActive] = React.useState(new Set([user.active]));
  const [shirt, setShirt] = React.useState(new Set([user.shirt]));

  const degrees = [
    { key: "Κριτής", label: "Κριτής" },
    { key: "Φύλακας", label: "Φύλακας" },
    { key: "Αλυτάρχης", label: "Αλυτάρχης" },
    { key: "Τεχν. Έφορο", label: "Τεχν. Έφορος" },
    { key: "Παρατήρητης", label: "Παρατήρητης" },
    { key: "Αγωνοδίκης", label: "Αγωνοδίκης" },
    { key: "Βαθμολογήτης", label: "Βαθμολογήτης" },
  ];

  const sSizes = [
    { key: "S", label: "Small" },
    { key: "M", label: "Medium" },
    { key: "L", label: "Large" },
    { key: "XL", label: "Extra Large" },
    { key: "XXL", label: "2 Extra Large" },
    { key: "XXXL", label: "3 Extra Large" },
  ];

  const [degree, setDegree] = React.useState(new Set(user.degree.split(",")));

  const initialOptions = {
    "client-id":
      "ActcHzw_bg09DjHq39JSUnRMapQO92Rkli2f2sXIGDyRPRRDeBWaUu_Ef7ttkOoETkfaz-j7d7_dH0nb",
    currency: "EUR",
    intent: "capture",
  };

  function paidSuscriptions() {
    let subs = "";
    for (let i = 0; i < user.subscriptions.length; i++) {
      if (subs == "") {
        subs = subs + user.subscriptions[i];
      } else {
        subs = subs + "-" + user.subscriptions[i];
      }
    }
    return subs;
  }

  function view() {
    return (
      <div className="w-7/12 p-5 gap-5 flex flex-col items-center h-fit backdrop-blur-sm bg-black/30 mr-5 mt-10 br-5 rounded-xl">
        <h1 className="font-bold text-xl">Πλήρης Στοιχεία Μέλους</h1>
        <h2 className="mt-5">Βασικά Στοιχεία Μέλους</h2>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            isDisabled
            type="name"
            label="Όνομα"
            variant="bordered"
            value={user.name.split(" ")[0]}
          />
          <Input
            isDisabled
            type="name"
            label="Επίθετο"
            variant="bordered"
            value={user.name.split(" ")[1]}
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            isDisabled
            type="tel"
            label="Τηλέφωνο"
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
            label="Ηλικία"
            variant="bordered"
            value={user.age}
          />
          <Input
            isDisabled
            type="text"
            label="Μπλούζα"
            variant="bordered"
            value={user.shirt}
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            isDisabled
            type="text"
            label="ΙΒΑΝ"
            variant="bordered"
            value={user.iban}
          />
          <Input
            isDisabled
            type="text"
            label="Αυτοκίνητο"
            variant="bordered"
            value={user.car}
          />
        </div>

        {user.executive == true ? <h2>Στοιχεία Στελέχους ΟΜΑΕ</h2> : null}
        <div className="flex items-center justify-center gap-20 w-full">
          {user.executive == true ? omaeNumber() : null}
          {user.executive == true ? omaeDeg() : null}
        </div>
        {user.athlete == true ? <h2>Στοιχεία Αθλητή ΟΜΑΕ</h2> : null}
        <div className="flex items-center justify-center gap-20 w-full">
          {user.athlete == true ? omaeLisc() : null}
          {user.athlete == true ? omaeActive() : null}
        </div>
        <h2>Οικονομικά</h2>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            isDisabled
            type="text"
            label="Πληρώθεν Συνδρομές"
            variant="bordered"
            value={paidSuscriptions()}
          />
          <Input
            isDisabled
            type="text"
            label="Χρώστούμενες Συνδρομές"
            variant="bordered"
            value={unpaidSubscriptions()}
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            isDisabled
            type="text"
            label="Πληρώθεν Ποσό"
            variant="bordered"
            value={user.subscriptions.length * 20}
          />
          <Input
            isDisabled
            type="text"
            label="Χρώστούμενο Ποσό"
            variant="bordered"
            value={ownedMoney()}
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            isDisabled
            type="text"
            label="Δικαιώμα Ψήφου"
            variant="bordered"
            value={user.vote}
          />
          <Input
            isDisabled
            type="text"
            label="Οικονονικά Ενήμερος"
            variant="bordered"
            value={user.status}
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <PayPalScriptProvider options={initialOptions}>
            <Checkout />
          </PayPalScriptProvider>
        </div>
      </div>
    );
  }

  function update() {
    return (
      <div className="w-7/12 p-5 gap-5 flex flex-col items-center h-fit backdrop-blur-sm bg-black/30 mr-5 mt-10 br-5 rounded-xl">
        <h1 className="font-bold text-xl">Πλήρης Στοιχεία Μέλους</h1>
        <h2 className="mt-5">Βασικά Στοιχεία Μέλους</h2>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            type="name"
            label="Όνομα"
            variant="bordered"
            value={user.name.split(" ")[0]}
          />
          <Input
            type="name"
            label="Επίθετο"
            variant="bordered"
            value={user.name.split(" ")[1]}
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            type="tel"
            label="Τηλέφωνο"
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
            type="name"
            label="Ηλικία"
            variant="bordered"
            value={user.age}
          />
          <Select
            variant="bordered"
            label="Μπλούζα"
            placeholder="Επιλογή Μεγέθους Μπλούζας"
            className="max-w-xs"
            selectedKeys={shirt}
            onSelectionChange={setShirt}
            defaultSelectedKeys={[user.shirt]}
          >
            {sSizes.map((size) => (
              <SelectItem key={size.key} textValue={size.label}>
                {size.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            type="text"
            label="ΙΒΑΝ"
            variant="bordered"
            value={user.iban}
          />

          <Select
            variant="bordered"
            label="Αυτοκίνητο"
            className="max-w-xs"
            selectedKeys={car}
            onSelectionChange={setCar}
            defaultSelectedKeys={["Ναι"]}
          >
            <SelectItem key="Ναι">Ναί</SelectItem>
            <SelectItem key="Οχι">Όχι</SelectItem>
          </Select>
        </div>
        <Checkbox isSelected={isMarshall} onValueChange={setIsMarhsall}>
          <h2> Είναι Στέλεχος της ΟΜΑΕ;</h2>
        </Checkbox>
        <div className="flex items-center justify-center gap-20 w-full">
          {isMarshall == true ? omaeNumberEdit() : null}
          {isMarshall == true ? omaeDegEdit() : null}
        </div>
        <Checkbox isSelected={isDriver} onValueChange={setIsDriver}>
          <h2> Είναι Αθλητής της ΟΜΑΕ;</h2>
        </Checkbox>
        <div className="flex items-center justify-center gap-20 w-full">
          {isDriver == true ? omaeLiscEdit() : null}
          {isDriver == true ? omaeActiveEdit() : null}
        </div>
        <h2>Οικονομικά</h2>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            isDisabled
            type="text"
            label="Πληρώθεν Συνδρομές"
            variant="bordered"
            value={paidSuscriptions()}
          />
          <Input
            isDisabled
            type="text"
            label="Χρώστούμενες Συνδρομές"
            variant="bordered"
            value={unpaidSubscriptions()}
          />
        </div>
        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            isDisabled
            type="text"
            label="Πληρώθεν Ποσό"
            variant="bordered"
            value={user.subscriptions.length * 20}
          />
          <Input
            isDisabled
            type="text"
            label="Χρώστούμενο Ποσό"
            variant="bordered"
            value={ownedMoney()}
          />
        </div>

        <div className="flex items-center justify-center gap-20 w-full">
          <Input
            isDisabled
            type="name"
            label="Δικαιώμα Ψήφου"
            variant="bordered"
            value={user.vote}
          />
          <Input
            isDisabled
            type="email"
            label="Οικονονικά Ενήμερος"
            variant="bordered"
            value={user.status}
          />
        </div>
        {ownedMoney() != 0 && (
          <div className="flex items-center justify-center gap-20 w-full">
            <Slider
              size="sm"
              step={20}
              color="primary"
              showSteps={true}
              onChange={setValue}
              maxValue={ownedMoney()}
              minValue={0}
              defaultValue={0}
              className=""
            />
            <p className="text-default-500 font-medium text-small w-full">
              Πληρωθέν Ποσό: {value}€
            </p>
          </div>
        )}
        <div className="flex items-center justify-center gap-20 ">
          <Button color="success" variant="shadow">
            Ενημέρωση
          </Button>
        </div>
      </div>
    );
  }

  function unpaidSubscriptions() {
    let subs = "";
    for (let i = 2022; i < new Date().getFullYear() + 1; i++) {
      if (!user.subscriptions.includes(i)) {
        if (subs == "") {
          subs = subs + i;
        } else {
          subs = subs + "-" + i;
        }
      }
    }
    if (subs == "") {
      subs = "Καμία";
    }
    return subs;
  }

  function ownedMoney() {
    let subs = 0;
    console.log(new Date().getFullYear());
    for (let i = 2022; i < new Date().getFullYear() + 1; i++) {
      if (!user.subscriptions.includes(i)) {
        subs = subs + 20;
      }
    }
    return subs;
  }

  function omaeNumber() {
    return (
      <div className="flex items-center justify-center gap-20 w-full">
        <Input
          isDisabled
          type="name"
          label="Αριθμός Μητρώου ΟMAE"
          variant="bordered"
          value={user.omaeNum}
        />
      </div>
    );
  }

  function omaeNumberEdit() {
    return (
      <div className="flex items-center justify-center gap-20 w-full">
        <Input
          type="name"
          label="Αριθμός Μητρώου ΟMAE"
          variant="bordered"
          value={user.omaeNum}
        />
      </div>
    );
  }

  function omaeDeg() {
    return (
      <div className="flex items-center justify-center gap-20 w-full">
        <Input
          isDisabled
          type="name"
          label="Πτυχείο"
          variant="bordered"
          value={user.degree}
        />
      </div>
    );
  }

  function omaeDegEdit() {
    return (
      <div className="flex items-center justify-center gap-20 w-full">
        <Select
          variant="bordered"
          label="Πτυχείο"
          className="max-w-xs"
          selectionMode="multiple"
          selectedKeys={degree}
          onSelectionChange={setDegree}
          defaultSelectedKeys={user.degree.split(",")}
        >
          {degrees.map((item) => (
            <SelectItem key={item.key} textValue={item.label}>
              <span>{item.label}</span>{" "}
            </SelectItem>
          ))}
        </Select>
      </div>
    );
  }

  function omaeLisc() {
    return (
      <div className="flex items-center justify-center gap-20 w-full">
        <Input
          isDisabled
          type="name"
          label="Liscence"
          variant="bordered"
          value={user.liscence}
        />
      </div>
    );
  }

  function omaeLiscEdit() {
    return (
      <div className="flex items-center justify-center gap-20 w-full">
        <Input
          type="name"
          label="Liscence"
          variant="bordered"
          value={user.liscence}
        />
      </div>
    );
  }

  function omaeActive() {
    return (
      <div className="flex items-center justify-center gap-20 w-full">
        <Input
          isDisabled
          type="name"
          label="Ενεργός"
          variant="bordered"
          value={user.active}
        />
      </div>
    );
  }

  function omaeActiveEdit() {
    return (
      <div className="flex items-center justify-center gap-20 w-full">
        <Select
          variant="bordered"
          label="Ενεργή Liscence"
          className="max-w-xs"
          selectedKeys={active}
          onSelectionChange={setActive}
          defaultSelectedKeys={[user.active]}
        >
          <SelectItem key="Ναι">Ναί</SelectItem>
          <SelectItem key="Οχι">Όχι</SelectItem>
        </Select>
      </div>
    );
  }

  return (
    <div className="flex  justify-between w-s w-100 ">
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
          <p className="font-bold text-xl">{user.name}</p>
        </div>
        <div className="text-red-500 text-l font-semibold">{user.role}</div>
        {team.map((t) => {
          return (
            <div className="text-blue-300 mt-1 text-xs font-semibold">{t}</div>
          );
        })}
      </div>
      {updatebool == false ? view() : update()}
    </div>
  );
}
