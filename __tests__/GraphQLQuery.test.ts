import { MockedProvider } from "@apollo/client/testing";
import { GET_USERS } from "@/graphql/users/frontedQueries";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import UsersList from "@/components/UsersList"; // Ensure correct import

const mocks = [
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        getUsers: [
          { id: "1", name: "John Doe", email: "john@example.com" },
          { id: "2", name: "Jane Doe", email: "jane@example.com" },
        ],
      },
    },
  },
];

describe("GraphQL Query", () => {
  it("renders users from the query", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UsersList />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Jane Doe")).toBeInTheDocument());
  });
});
