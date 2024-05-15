/* eslint-disable no-undef */
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Cart Component", () => {
  it("should render cart items correctly", () => {
    const mockItems = [
      { title: "Item 1", image: "item1.jpg", price: 10.99, quantity: 2 },
      { title: "Item 2", image: "item2.jpg", price: 5.99, quantity: 1 },
    ];

    localStorage.setItem("cart", JSON.stringify(mockItems));

    mockItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(`${item.price} €`)).toBeInTheDocument();
      expect(screen.getByAltText(item.title)).toBeInTheDocument();
      expect(screen.getByAltText(item.title)).toHaveAttribute(
        "src",
        item.image
      );
    });
  });

  it("should update quantity when quantity input changes", () => {
    const mockItems = [
      { title: "Item 1", image: "item1.jpg", price: 10.99, quantity: 2 },
    ];

    localStorage.setItem("cart", JSON.stringify(mockItems));

    const quantityInput = screen.getByDisplayValue("2");
    fireEvent.change(quantityInput, { target: { value: "3" } });

    expect(quantityInput.value).toBe("3");
  });

  it("should clear cart when clear cart button is clicked", () => {
    const mockItems = [
      { title: "Item 1", image: "item1.jpg", price: 10.99, quantity: 2 },
      { title: "Item 2", image: "item2.jpg", price: 5.99, quantity: 1 },
    ];

    localStorage.setItem("cart", JSON.stringify(mockItems));

    const clearCartButton = screen.getByText("CLEAR CART");
    fireEvent.click(clearCartButton);

    expect(localStorage.getItem("cart")).toBe(null);
  });
  it("should calculate total price correctly", () => {
    const mockItems = [
      { title: "Item 1", image: "item1.jpg", price: 10.99, quantity: 2 },
      { title: "Item 2", image: "item2.jpg", price: 5.99, quantity: 1 },
    ];

    localStorage.setItem("cart", JSON.stringify(mockItems));

    const totalPrice = mockItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    expect(
      screen.getByText(`TOTAL: ${totalPrice.toFixed(2)} €`)
    ).toBeInTheDocument();
  });
  it("should remove item from cart when clear cart button is clicked", () => {
    const mockItems = [
      { title: "Item 1", image: "item1.jpg", price: 10.99, quantity: 2 },
    ];

    localStorage.setItem("cart", JSON.stringify(mockItems));

    const clearCartButton = screen.getByText("CLEAR CART");
    fireEvent.click(clearCartButton);

    expect(screen.queryByText(mockItems[0].title)).not.toBeInTheDocument();
  });
  it("should handle quantity change correctly", () => {
    const mockItems = [
      { title: "Item 1", image: "item1.jpg", price: 10.99, quantity: 2 },
    ];

    localStorage.setItem("cart", JSON.stringify(mockItems));

    const quantityInput = screen.getByDisplayValue("2");
    fireEvent.change(quantityInput, { target: { value: "3" } });

    const updatedCart = JSON.parse(localStorage.getItem("cart"));
    expect(updatedCart[0].quantity).toBe(3);
  });
});
