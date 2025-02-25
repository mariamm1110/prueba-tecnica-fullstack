import Button from "@/components/ui/atomic-design/atoms/Button";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect ,vi} from "bun:test";

describe("Button Component", () => {
  it("calls onClick function when clicked", () => {
    const handleClick = vi.fn(); 

    render(<Button label="Click Me" onClick={handleClick} />);

    const button = screen.getByText("Click Me");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
