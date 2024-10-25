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

export default function MembersList() {
  const navigate = useNavigate();
  const [receive, setRecieve] = useState(false);
  const [competitors, setCompetitors] = useState([]);

  useEffect(() => {
    if (receive == false) {
      // setRecieve(receive + 1);
      // console.log(receive);
      // console.log("In Special Stages useEffect");
      window.request
        .request({
          method: "GET",
          url: "http://localhost:8080/api/competitor/getCompetitors",
        })
        .then((response) => {
          console.log("Special Stages received: ", response.data);
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
            setRecieve(true);
            setCompetitors(competitorscopy);
          }
        });
      setRecieve(true);
    }
  }, [competitors]);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "co_number",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...competitors];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (competitor) =>
          competitor.driver.toLowerCase().includes(filterValue.toLowerCase()) ||
          competitor.codriver
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          competitor.vehicle
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          competitor.co_number.toString().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [competitors, filterValue, statusFilter]);

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
    { name: "Number", uid: "co_number", sortable: true },
    { name: "Crew", uid: "driver", sortable: true },
    { name: "Vehicle", uid: "role" },
    { name: "Category", uid: "status" },
    { name: "Class", uid: "class" },
    { name: "Actions", uid: "actions" },
  ];

  const renderCell = React.useCallback((competitor, columnKey) => {
    const cellValue = competitor[columnKey];
    switch (columnKey) {
      case "co_number":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {competitor.key + 1}
            </p>
          </div>
        );
      case "driver":
        return (
          <User
            avatarProps={{ radius: "lg", src: competitor.avatar }}
            description={competitor.codriver}
            name={competitor.driver}>
            {competitor.codriver}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {competitor.vehicle}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {competitor.category}
          </Chip>
        );
      case "class":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {competitor.car_class}
          </Chip>
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
                <DeleteIcon />
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
            <Button
              color="primary"
              endContent={<PlusIcon />}
              onClick={() => {
                navigate("/profile", {
                  state: {
                    userVar: {
                      co_number: "",
                      car_class: "",
                      driver: "",
                      codriver: "",
                      vehicle: "",
                      email: "",
                      telephone: "",
                      category: "",
                    },
                    update: true,
                    newEntry: true,
                  },
                });
              }}>
              Add New Competitor
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {competitors.length} Total Competitors
          </span>
          <label className="flex items-center text-default-400 text-small">
            Competitors per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}>
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
    competitors.length,
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
            onPress={onPreviousPage}>
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
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
      onSortChange={setSortDescriptor}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"There are no competitors"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
