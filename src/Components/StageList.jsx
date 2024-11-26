import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";

import { useState, useEffect, useMemo, useCallback } from "react";
import usericon from "../Images/user.png";

import { useAsyncList } from "@react-stately/data";

import { EditIcon } from "./SVG/EditIcon.jsx";
import { DeleteIcon } from "./SVG/DeleteIcon.jsx";
import { EyeIcon } from "./SVG/EyeIcon.jsx";
import { PlusIcon } from "./SVG/PlusIcon.jsx";
import { SearchIcon } from "./SVG/SearchIcon.jsx";
import { ChevronDownIcon } from "./SVG/ChevronDownIcon.jsx";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function StageList() {
  const navigate = useNavigate();
  const [receive, setRecieve] = useState(false);
  const [stages, setStages] = useState([]);
  const [sid, setid] = useState();
  const [sname, setrname] = useState();
  const [sdistance, setdistance] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reload, setReload] = useState(false);

  const handlesid = (e) => {
    setid(e.target.value);
    console.log(e.target.value);
  };

  const handlesname = (e) => {
    setrname(e.target.value);
    console.log(e.target.value);
  };

  const handlesdistance = (e) => {
    setdistance(e.target.value);
    console.log(e.target.value);
  };

  function createstage() {
    onClose();
    window.request
      .request({
        method: "POST",
        data: {
          id: sid,
          name: sname,
          distance: sdistance,
        },
        url: "http://localhost:8080/api/specialstage",
      })
      .then((response) => {
        setReload(true);
        setRecieve(false);
      });
  }

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
          let stagescopy = [];
          if (receive == false) {
            for (let i = 0; i < stageslocal.length; i++) {
              stagescopy.push({
                key: i,
                id: "S.S." + stageslocal[i].id,
                name: stageslocal[i].name,
                distance: stageslocal[i].distance,
              });
            }
            setRecieve(true);
            setReload(false);
            setStages(stagescopy);
          }
        });
      setRecieve(true);
    }
  }, [stages, reload]);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...stages];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (competitor) =>
          competitor.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          competitor.id.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [stages, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      console.log(sortDescriptor);
      const second = b[sortDescriptor.column];
      console.log(second);
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const columns = [
    { name: "Id", uid: "id", sortable: true },
    { name: "Name", uid: "name", sortable: true },
    { name: "Distance", uid: "distance" },
  ];

  const renderCell = React.useCallback((competitor, columnKey) => {
    const cellValue = competitor[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "distance":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon
                  onClick={() => {
                    navigate("/profile", {
                      state: {
                        userVar: competitor,
                        update: false,
                        newEntry: false,
                      },
                    });
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon
                  onClick={() => {
                    navigate("/profile", {
                      state: {
                        userVar: competitor,
                        update: true,
                        newEntry: false,
                      },
                    });
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon
                  onClick={() => {
                    window.request
                      .request({
                        method: "DELETE",
                        url:
                          "http://localhost:8080/api/competitor/" +
                          competitor.co_number,
                      })
                      .then((response) => {
                        window.request
                          .request({
                            method: "GET",
                            url: "http://localhost:8080/api/competitor/getCompetitors",
                          })
                          .then((response) => {
                            console.log(
                              "Special Stages received: ",
                              response.data
                            );
                            let stageslocal = response.data;
                            let competitorscopy = [];
                            if (receive == false) {
                              for (let i = 0; i < stageslocal.length; i++) {
                                competitorscopy.push({
                                  key: i,
                                  co_number: stageslocal[i].co_number,
                                  car_class: stageslocal[i].car_class,
                                  driver: stageslocal[i].driver,
                                  codriver: stageslocal[i].codriver,
                                  vehicle: stageslocal[i].vehicle,
                                  email: stageslocal[i].email,
                                  telephone: stageslocal[i].telephone,
                                  category: stageslocal[i].category,
                                  passcode: stageslocal[i].passcode,
                                });
                              }
                              setStages(competitorscopy);
                            }
                          });
                      });
                  }}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button color="primary" endContent={<PlusIcon />} onClick={onOpen}>
              Add New Stage
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {stages.length} Total Stages
          </span>
          <label className="flex items-center text-default-400 text-small">
            Stages per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onRowsPerPageChange,
    stages.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div>
      <Table
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          base: "h-screen",
        }}
        className="h-full p-2"
        // selectedKeys={selectedKeys}
        // selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"There are no competitors"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal size={"xl"} isOpen={isOpen} onClose={onClose} backdrop={"blur"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>Add Special Stage</h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  value={sid}
                  onChange={handlesid}
                  label="Id"
                  placeholder="Enter the id of the special stage"
                />
                <Input
                  type="text"
                  value={sname}
                  onChange={handlesname}
                  label="Name"
                  placeholder="Enter the name of the special stage"
                />
                <Input
                  type="text"
                  value={sdistance}
                  onChange={handlesdistance}
                  label="Length"
                  placeholder="Enter the length of the Stage "
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={createstage}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
