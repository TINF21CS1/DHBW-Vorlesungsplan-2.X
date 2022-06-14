import { render, screen } from "@testing-library/react";
import Nav from "./Nav";
import {
  HashRouter as Router,
} from "react-router-dom";

describe("Nav", () => {
  it("renders", () => {
    // overwrite fetch
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve([]),
      });
    });
    render(<Router><Nav /></Router>);
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
  });
  it("renders Settings Link with logged in user", () => {
    // overwrite fetch of /api/settings with a mock that returns a user
    global.fetch = jest.fn().mockImplementation((url) => {
      return Promise.resolve({
        json: () => {
          if (url.includes("api/settings")) {
            return Promise.resolve({
              name: "Test User",
              email: "testuser@example.com",
              notification: false,
              course: null
            })
          } else {
            throw new Error("Unexpected fetch call to " + url);
          }
        },
      });
    });
    render(<Router><Nav /></Router>);
    setTimeout(() => {
      expect(screen.getAllByText("Settings").length).toBeGreaterThan(0);
    }, 0); // need to assert after the promise is resolved
  });
  it("does not render Settings Link with logged out user", () => {
    // overwrite fetch of /api/settings with a mock that returns a 401
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        status: 401
      });
    });
    render(<Router><Nav /></Router>);    
    setTimeout(() => {
      expect(screen.queryByText("Settings")).toBeNull();
    }, 0); // need to assert after the promise is resolved
  });
});