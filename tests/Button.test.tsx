
import { describe, expect, test, vi } from "bun:test";
import { render, fireEvent } from "@testing-library/react";
import Button from "@/components/ui/atomic-design/atoms/Button";
import "@testing-library/jest-dom";


describe("Button Component", () => {
  test("renders with correct label", () => {
    const { getByText } = render(<Button label="Click Me" onClick={() => {}} />);
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button label="Click Me" onClick={handleClick} />);
    fireEvent.click(getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
