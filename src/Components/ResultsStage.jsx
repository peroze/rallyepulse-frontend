import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import styles from "./Style/Results.css";

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
        finish_time: data[i].finish_time,
        start_time: data[i].start_time,
        total_time: data[i].total_time,
      });
    }
    setfinals(tempresults);
  });

  return (
    <div className="results-container">
      <h1>{Stagename}</h1>
      <Table
        selectionMode="single"
        selectionBehavior="replace"
        onSelectionChange={(key) => {
          setselectedkey(parseInt(key.currentKey));
        }}
        isStriped
        aria-label="Stop Table"
      >
        <TableHeader>
          <TableColumn>Pos</TableColumn>
          <TableColumn>Number</TableColumn>
          <TableColumn>Finish Time</TableColumn>
          <TableColumn>Start Time</TableColumn>
          <TableColumn>Total Time</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No cars to display."}>
          {finals.map((finish) => {
            return (
              <TableRow key={finish.pos}>
                <TableCell>{finish.pos}</TableCell>
                <TableCell>{finish.co_number}</TableCell>
                <TableCell>{finish.finish_time}</TableCell>
                <TableCell>{finish.start_time}</TableCell>
                <TableCell>{finish.total_time}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default ResultsStage;
