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

const ResultsStage = () => {
  const location = useLocation();
  const data = location.state.results;
  const Stagename = data.stage_name;
  const [finals, setfinals] = useState([]);

  useEffect(() => {
    let tempresults = [];
    for (let i = 0; i < data.length; i++) {
      tempresults.push({
        pos: i + 1,
        co_number: data[i].id.competitorid,
        driver: data[i].competitor.split("-")[0],
        co_driver: data[i].competitor.split("-")[1],
        category: data[i].category,
        car_class: data[i].car_class,
        finish_time: data[i].finish_time,
        start_time: data[i].start_time,
        total_time: data[i].total_time,
        difftoFirst: data[i].diffToFirst,
        difftoPrevious: data[i].diffToPrevious,
      });
    }
    setfinals(tempresults);
  });

  return (
    <div className="results-container">
      <h3 class="h-fit text-center w-100 m-10">
        Stage Results of {location.state.stage_name}
      </h3>
      <Table
        selectionMode="single"
        selectionBehavior="replace"
        onSelectionChange={(key) => {
          setselectedkey(parseInt(key.currentKey));
        }}
        isStriped
        aria-label="Stop Table">
        <TableHeader>
          <TableColumn>Pos</TableColumn>
          <TableColumn>Number</TableColumn>
          <TableColumn>Driver</TableColumn>
          <TableColumn>Co Driver</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Class</TableColumn>
          <TableColumn>Finish Time</TableColumn>
          <TableColumn>Start Time</TableColumn>
          <TableColumn>Total Time</TableColumn>
          <TableColumn>Diff to First</TableColumn>
          <TableColumn>Diff to Previous</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No cars to display."}>
          {finals.map((finish) => {
            return (
              <TableRow key={finish.pos}>
                <TableCell>{finish.pos}</TableCell>
                <TableCell>{finish.co_number}</TableCell>
                <TableCell>{finish.driver}</TableCell>
                <TableCell>{finish.codriver}</TableCell>
                <TableCell>{finish.category}</TableCell>
                <TableCell>{finish.car_class}</TableCell>
                <TableCell>{finish.finish_time}</TableCell>
                <TableCell>{finish.start_time}</TableCell>
                <TableCell>{finish.total_time}</TableCell>
                <TableCell>{finish.difftoFirst}</TableCell>
                <TableCell>{finish.difftoPrevious}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default ResultsStage;
