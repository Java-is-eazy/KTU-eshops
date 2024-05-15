/* eslint-disable no-undef */
/* eslint-disable testing-library/no-wait-for-side-effects */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CheckoutPage from "./checkout";
import { MemoryRouter, useNavigate, Routes, Route } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Import and spread the actual library
  useNavigate: jest.fn(), // Mock useNavigate specifically
}));

test("renders all input fields", () => {
  render(
    <MemoryRouter>
      <CheckoutPage />
    </MemoryRouter>
  );

  const fullNameInput = screen.getByLabelText("Full Name:");
  const emailInput = screen.getByLabelText("Email:");
  const addressInput = screen.getByLabelText("Address:");
  const cityInput = screen.getByLabelText("City:");
  const postalCodeInput = screen.getByLabelText("Postal Code:");

  expect(fullNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(addressInput).toBeInTheDocument();
  expect(cityInput).toBeInTheDocument();
  expect(postalCodeInput).toBeInTheDocument();
});

test("shows error message when email is invalid (without @)", () => {
  const fullNameInput = screen.getByLabelText("Full Name:");
  const emailInput = screen.getByLabelText("Email:");
  const submitButton = screen.getByText("Payment");

  fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "invalidemail" } });
  fireEvent.click(submitButton);

  const errorMessage = screen.getByText("Please fill in all required fields!");
  expect(errorMessage).toBeInTheDocument();
});

test("shows error message when email is invalid (missing domain)", () => {
  const fullNameInput = screen.getByLabelText("Full Name:");
  const emailInput = screen.getByLabelText("Email:");
  const submitButton = screen.getByText("Payment");

  fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "johndoe@" } });
  fireEvent.click(submitButton);

  const errorMessage = screen.getByText("Please fill in all required fields!");
  expect(errorMessage).toBeInTheDocument();
});

describe("CheckoutPage component", () => {
  it("should navigate to payment page on successful form submission", async () => {
    const mockedNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockedNavigate);

    render(
      <MemoryRouter initialEntries={["/checkout/23"]}>
        {" "}
        {/* Simulating navigating to /checkout/123 */}
        <Routes>
          <Route path="/checkout/:productId" element={<CheckoutPage />} />
        </Routes>
      </MemoryRouter>
    );
    const fullNameInput = screen.getByLabelText("Full Name:");
    const emailInput = screen.getByLabelText("Email:");
    const addressInput = screen.getByLabelText("Address:");
    const cityInput = screen.getByLabelText("City:");
    const postalCodeInput = screen.getByLabelText("Postal Code:");
    const submitButton = screen.getByText("Payment");

    fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(cityInput, { target: { value: "Anytown" } });
    fireEvent.change(postalCodeInput, { target: { value: "12345" } });

    fireEvent.click(submitButton);
    await waitFor(() => fireEvent.click(screen.getByText("Card")), {
      timeout: 500,
    });
    expect(mockedNavigate).toHaveBeenCalledWith(
      expect.stringContaining("/payment/"),
      expect.anything()
    );
  });
});
