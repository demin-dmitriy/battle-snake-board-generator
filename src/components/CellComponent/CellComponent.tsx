import React from "react";
import { generateColour } from "../../shared/utils";
import "./CellComponent.css";

export interface ICell {
  onChange?: () => void;
  colour?: string;
  isHead?: boolean;
  isHazard?: boolean;
}

export const CellComponent: React.SFC<ICell> = ({ colour, onChange, isHead, isHazard }) => (
  <button
    className="cell"
    style={{ backgroundColor: colour ? colour : isHazard ? "#a1a1a1" : "#d4d4d4" }}
    onClick={onChange}
  >
    <span>{isHead && "H"}</span>
  </button>
);