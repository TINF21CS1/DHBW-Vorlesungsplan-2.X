import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("nop", () => {
  render(<App />);
  expect(1).toBe(1);
});

/* 
FIXME: This test tries to use the 'real' DB data, but will fail because no DB is initialized.
test("renders first date box", () => {
  render(<App />);
  const e = screen.queryAllByText(/Turing/i);
  expect(e).not.toHaveLength(0);
});
*/

/*
FIXME: ignore functionality is currently not built in
test("does not show Tutorium", () => {
  render(<App />);
  const e = screen.queryAllByText("210B");
  expect(e).toHaveLength(0);
});
*/
