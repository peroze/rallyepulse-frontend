import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import styles from "./Style/Tables.css";
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

const Results = () => {
  const location = useLocation();

  const data = location.state.results;
  const [finals, setfinals] = useState([]);

  useEffect(() => {
    let tempresults = [];
    for (let i = 0; i < data.length; i++) {
      tempresults.push({
        pos: i + 1,
        co_number: data[i].co_number,
        name: data[i].name,
        time: data[i].time,
        car_class: data[i].car_class,
        category: data[i].category,
        difftoFirst: "+" + data[i].first,
        difftoPrevious: "+" + data[i].prev,
        penalty: data[i].penalty,
      });
    }
    setfinals(tempresults);
  });

  return (
    <div className="results-container">
      <h3 class="h-fit text-center w-100 m-10">
        Overall Results after {location.state.stage_name}
      </h3>
      <Table
        selectionMode="single"
        selectionBehavior="replace"
        isStriped
        aria-label="Stop Table">
        <TableHeader>
          <TableColumn>Pos</TableColumn>
          <TableColumn>Number</TableColumn>
          <TableColumn>Driver</TableColumn>
          <TableColumn>Co Driver</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Class</TableColumn>
          <TableColumn>Time</TableColumn>
          <TableColumn>Gap to First</TableColumn>
          <TableColumn>Gap to Previous</TableColumn>
          <TableColumn>Penalty</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No cars to display."}>
          {finals.map((finish) => {
            return (
              <TableRow key={finish.pos}>
                <TableCell>{finish.pos}</TableCell>
                <TableCell>{finish.co_number}</TableCell>
                <TableCell>{finish.name.split("-")[0]}</TableCell>
                <TableCell>{finish.name.split("-")[1]}</TableCell>
                <TableCell>{finish.category}</TableCell>
                <TableCell>{finish.car_class}</TableCell>
                <TableCell>{finish.time}</TableCell>
                <TableCell>{finish.difftoFirst}</TableCell>
                <TableCell>{finish.difftoPrevious}</TableCell>
                <TableCell className="text-red-700">{finish.penalty}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default Results;
