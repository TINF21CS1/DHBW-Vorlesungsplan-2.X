import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";

describe("Register", () => {
  it("validates the password confirmation", () => {
    render(<Register />);
    const password = screen.getByTestId("password_div").querySelector("input");
    const confirmPassword = screen.getByTestId("password_confirmation_div").querySelector("input");
    const submit = screen.getByText("Registrieren");
    if (!password || !confirmPassword || !submit) {
      throw new Error("Could not find elements");
    }
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(confirmPassword, { target: { value: "password1" } });
    fireEvent.click(submit);
    expect(screen.getByText("Passwörter stimmen nicht überein!")).toBeInTheDocument();
  });
});