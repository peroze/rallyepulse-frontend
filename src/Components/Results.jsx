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
        time: data[i].time,
      });
    }
    setfinals(tempresults);
  });

  return (
    <div className="results-container">
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
          <TableColumn>Time</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No cars to display."}>
          {finals.map((finish) => {
            return (
              <TableRow key={finish.pos}>
                <TableCell>{finish.pos}</TableCell>
                <TableCell>{finish.co_number}</TableCell>
                <TableCell>{finish.time}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default Results;
