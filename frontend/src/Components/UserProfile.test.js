import React, { useState } from "react";
import { render, waitFor, fireEvent, debug } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserProfile from "./UserProfile";

// Mocking the fetch function
global.fetch = jest.fn();

describe("UserProfile Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading message while fetching user data", async () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({ username: "testUser" }),
    }));

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        username: "testUser",
        created_at: "2024-04-17",
        email: "test@example.com",
      }),
    });

    const { getByTestId } = render(<UserProfile />);

    expect(getByTestId("loading-message")).toBeInTheDocument();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  it("renders user profile data after successful API call", async () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({ username: "testUser" }),
    }));

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        username: "testUser",
        created_at: "2024-04-17",
        email: "test@example.com",
      }),
    });

    const { getByTestId } = render(<UserProfile myUsername="testUser" />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(getByTestId("test-username")).toHaveTextContent("testUser");
      expect(getByTestId("test-created-at")).toHaveTextContent("2024-04-17");
      expect(getByTestId("test-email")).toHaveTextContent("test@example.com");
    });
  });

  it("handles account deletion when user matches myUsername", async () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({ username: "testUser" }),
    }));

    const useStateMock = jest.spyOn(React, "useState");
    useStateMock.mockImplementation(() =>
      useState({
        username: "testUser",
        email: "awaawdawdawdwawd@gmail.com",
        phone: "+37011111111",
        created_at: "2024-04-17",
      })
    );

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        username: "testUser",
        created_at: "2024-04-17",
        email: "test@example.com",
      }),
    });

    const handleLogoutMock = jest.fn();

    fetch.mockResolvedValueOnce({ ok: true });

    // Mock window.confirm
    window.confirm = jest.fn().mockImplementation(() => true);

    const { getByTestId, queryByTestId } = render(
      <UserProfile
        myUsername="testUser"
        token="yourAuthToken"
        handleLogout={handleLogoutMock}
      />
    );

    // Wait for the component to finish rendering and data fetching to complete
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(getByTestId("test-delete")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("test-delete"));

    expect(window.confirm).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      `${window.location.protocol}//${window.location.hostname}:3001/user`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "yourAuthToken",
        },
        body: JSON.stringify({ username: "testUser" }),
      }
    );

    await waitFor(() => {
      expect(handleLogoutMock).toHaveBeenCalledTimes(1);
    });
  });
});
