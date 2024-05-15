/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as ReactRouter from "react-router";
import Authentication from "./Authentication";

jest.mock("react-router", () => {
  const originalModule = jest.requireActual("react-router");
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

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
    const confirmPassword = getByTestId("confirmPassword");
    const email = getByTestId("signupEmail");
    const phone = getByTestId("signupPhone");
    fireEvent.change(username, { target: { value: "username" } });
    fireEvent.change(confirmPassword, { target: { value: "Password15!" } });
    fireEvent.change(email, { target: { value: "email@test.test" } });
    fireEvent.change(phone, { target: { value: "+12345678912" } });

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
    const email = getByTestId("signupEmail");
    const phone = getByTestId("signupPhone");

    fireEvent.change(username, { target: { value: "username" } });
    fireEvent.change(password, { target: { value: "Password!15" } });
    fireEvent.change(email, { target: { value: "test@test.test" } });
    fireEvent.change(phone, { target: { value: "+12345678912" } });
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
    const email = getByTestId("signupEmail");
    const phone = getByTestId("signupPhone");
    fireEvent.change(username, { target: { value: "username" } });
    fireEvent.change(password, { target: { value: "Password!15" } });
    fireEvent.change(confirmPassword, { target: { value: "Password1!" } });
    fireEvent.change(email, { target: { value: "email@test.test" } });
    fireEvent.change(phone, { target: { value: "+12345678912" } });
    const registerButton = getByTestId("signupBttn");
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith("Passwords do not match");
  });

  //REGEX TESTS

  it("should throw an error if the phone number is formated wrong", () => {
    window.alert = jest.fn();

    const { getByText, getByTestId } = render(<Authentication />);
    const signupButton = getByText("Signup");
    fireEvent.click(signupButton);
    const username = getByTestId("signupUsername");
    const password = getByTestId("signupPassword");
    const confirmPassword = getByTestId("confirmPassword");
    const email = getByTestId("signupEmail");
    const phone = getByTestId("signupPhone");

    fireEvent.change(username, { target: { value: "username" } });
    fireEvent.change(password, { target: { value: "Password!15" } });
    fireEvent.change(email, { target: { value: "test@test.test" } });
    fireEvent.change(phone, { target: { value: "234578912" } });
    fireEvent.change(confirmPassword, { target: { value: "Password!15" } });
    const registerButton = getByTestId("signupBttn");
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith("Invalid phone number");
  });
  it("should throw an error if the email is formated wrong", () => {
    window.alert = jest.fn();

    const { getByText, getByTestId } = render(<Authentication />);
    const signupButton = getByText("Signup");
    fireEvent.click(signupButton);
    const username = getByTestId("signupUsername");
    const password = getByTestId("signupPassword");
    const confirmPassword = getByTestId("confirmPassword");
    const email = getByTestId("signupEmail");
    const phone = getByTestId("signupPhone");

    fireEvent.change(username, { target: { value: "username" } });
    fireEvent.change(password, { target: { value: "Password!15" } });
    fireEvent.change(email, { target: { value: "testtest.test" } });
    fireEvent.change(phone, { target: { value: "+12345678912" } });
    fireEvent.change(confirmPassword, { target: { value: "Password!15" } });
    const registerButton = getByTestId("signupBttn");
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith("Invalid email");
  });
  it("should throw an error if the password does not contain uppercase letter", () => {
    window.alert = jest.fn();

    const { getByText, getByTestId } = render(<Authentication />);
    const signupButton = getByText("Signup");
    fireEvent.click(signupButton);
    const username = getByTestId("signupUsername");
    const password = getByTestId("signupPassword");
    const confirmPassword = getByTestId("confirmPassword");
    const email = getByTestId("signupEmail");
    const phone = getByTestId("signupPhone");

    fireEvent.change(username, { target: { value: "username" } });
    fireEvent.change(password, { target: { value: "password!15" } });
    fireEvent.change(email, { target: { value: "test@test.test" } });
    fireEvent.change(phone, { target: { value: "+12345678912" } });
    fireEvent.change(confirmPassword, { target: { value: "password!15" } });
    const registerButton = getByTestId("signupBttn");
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith("Missing uppercase letters");
  });
  it("should throw an error if the password does not contain lowercase letter", () => {
    window.alert = jest.fn();

    const { getByText, getByTestId } = render(<Authentication />);
    const signupButton = getByText("Signup");
    fireEvent.click(signupButton);
    const username = getByTestId("signupUsername");
    const password = getByTestId("signupPassword");
    const confirmPassword = getByTestId("confirmPassword");
    const email = getByTestId("signupEmail");
    const phone = getByTestId("signupPhone");

    fireEvent.change(username, { target: { value: "username" } });
    fireEvent.change(password, { target: { value: "PASSWORD!15" } });
    fireEvent.change(email, { target: { value: "test@test.test" } });
    fireEvent.change(phone, { target: { value: "+12345678912" } });
    fireEvent.change(confirmPassword, { target: { value: "PASSWORD!15" } });
    const registerButton = getByTestId("signupBttn");
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith("Missing lowercase letters");
  });
  it("should throw an error if the password is too short", () => {
    window.alert = jest.fn();

    const { getByText, getByTestId } = render(<Authentication />);
    const signupButton = getByText("Signup");
    fireEvent.click(signupButton);
    const username = getByTestId("signupUsername");
    const password = getByTestId("signupPassword");
    const confirmPassword = getByTestId("confirmPassword");
    const email = getByTestId("signupEmail");
    const phone = getByTestId("signupPhone");

    fireEvent.change(username, { target: { value: "username" } });
    fireEvent.change(password, { target: { value: "pass" } });
    fireEvent.change(email, { target: { value: "test@test.test" } });
    fireEvent.change(phone, { target: { value: "+12345678912" } });
    fireEvent.change(confirmPassword, { target: { value: "pass" } });
    const registerButton = getByTestId("signupBttn");
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith("Password is too short");
  });

  it('should navigate to "/" after successful login', async () => {
    const navigate = jest.fn();
    ReactRouter.useNavigate.mockReturnValue(navigate);
    window.alert = jest.fn();

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ token: "mocked-token" }),
    });

    const { getByTestId } = render(
        <Authentication setToken={() => {}} setUser={() => {}} />
    );

    fireEvent.change(getByTestId("loginUsername"), {
      target: { value: "loginUsername" },
    });
    fireEvent.change(getByTestId("loginPassword"), {
      target: { value: "loginUsername123!@#" },
    });
    fireEvent.click(getByTestId("loginBttn"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "loginUsername",
          password: "loginUsername123!@#",
        }),
      });
      expect(ReactRouter.useNavigate).toHaveBeenCalledWith();
      expect(window.alert).toHaveBeenCalledWith("User logged in successfully");
    });
  });
});
