/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Authentication from "./Authentication";

window.alert = jest.fn();

describe("Authentication Component", () => {
  it("should throw an error if the user does not fill in all fields in signup", () => {
    window.alert = jest.fn();

    const { getByText, getByTestId } = render(<Authentication />);
    const signupButton = getByText("Signup");
    fireEvent.click(signupButton);
    const registerButton = getByTestId("signupBttn");
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields");
  });
  it("should throw an error if the user does not fill in username in signup", () => {
    window.alert = jest.fn();

    const { getByText, getByTestId } = render(<Authentication />);
    const signupButton = getByText("Signup");
    fireEvent.click(signupButton);

    const password = getByTestId("signupPassword");
    const confirmPassword = getByTestId("confirmPassword");
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(confirmPassword, { target: { value: "password" } });
    const registerButton = getByTestId("signupBttn");

    fireEvent.click(registerButton);
    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields");
  });
  it("should throw an error if the user does not fill in password in signup", () => {
    window.alert = jest.fn();

    const { getByText, getByTestId } = render(<Authentication />);
    const signupButton = getByText("Signup");
    fireEvent.click(signupButton);
    const username = getByTestId("signupUsername");
    fireEvent.change(username, { target: { value: "username" } });
    const registerButton = getByTestId("signupBttn");
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields");
  });
  it("should throw an error if the user does not fill in confirmPassword in signup", () => {
    window.alert = jest.fn();

    const { getByText, getByTestId } = render(<Authentication />);
    const signupButton = getByText("Signup");
    fireEvent.click(signupButton);
    const username = getByTestId("signupUsername");
    const password = getByTestId("signupPassword");
    fireEvent.change(username, { target: { value: "username" } });
    fireEvent.change(password, { target: { value: "password" } });
    const registerButton = getByTestId("signupBttn");
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields");
  });
  it("should throw an error if the user does not fill in all fields in login", () => {
    window.alert = jest.fn();

    const { getByTestId } = render(<Authentication />);
    const loginButton = getByTestId("loginBttn");
    fireEvent.click(loginButton);

    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields");
  });
  it("should throw an error if the user does not fill in username in login", () => {
    window.alert = jest.fn();

    const { getByTestId } = render(<Authentication />);
    const password = getByTestId("loginPassword");
    fireEvent.change(password, { target: { value: "password" } });
    const loginButton = getByTestId("loginBttn");
    fireEvent.click(loginButton);

    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields");
  });
  it("should throw an error if the user does not fill in password in login", () => {
    window.alert = jest.fn();

    const { getByTestId } = render(<Authentication />);
    const username = getByTestId("loginUsername");
    fireEvent.change(username, { target: { value: "username" } });
    const loginButton = getByTestId("loginBttn");
    fireEvent.click(loginButton);

    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields");
  });
  it("should throw an error if passwords dont match", () => {
    window.alert = jest.fn();

    const { getByText, getByTestId } = render(<Authentication />);
    const signupButton = getByText("Signup");
    fireEvent.click(signupButton);
    const username = getByTestId("signupUsername");
    const password = getByTestId("signupPassword");
    const confirmPassword = getByTestId("confirmPassword");
    fireEvent.change(username, { target: { value: "username" } });
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(confirmPassword, { target: { value: "password1" } });
    const registerButton = getByTestId("signupBttn");
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith("Passwords do not match");
  });
});
