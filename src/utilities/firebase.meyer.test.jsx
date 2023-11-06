import { describe, it, expect } from "vitest";
import React from "react";
import SwapPage from "../components/SwapPage";
import SearchBar from "../components/SearchBar";
import { waitFor, fireEvent, render, screen } from "@testing-library/react";
import { useAuthState } from "./firebase";
vi.mock("./firebase");
useAuthState.mockReturnValue([null, null]);

import { fetchDataArray } from "./fetch_data";
vi.mock("./fetch_data");
fetchDataArray.mockReturnValue([
  { displayName: "John Doe", email: "johndoe@gmail.com" },
  { displayName: "Jane Doe", email: "janedoe@gmail.com" },
]);

describe("SwapPage tests cont. (interaction)", () => {
  it("has a Contact button that, when clicked, redirects to a mail service with the recipient address filled", async () => {
    // Mock the window.location.href property
    delete window.location;
    window.location = { href: "" };

    vi.mocked(fetchDataArray).mockResolvedValue([
      {
        email: "test@test.com",
        name: "Test User",
        "skills-have": [],
        "skills-want": [],
      },
    ]);
    vi.mocked(useAuthState).mockReturnValue([{ email: "test@test.com" }]);
    render(<SwapPage />);
    const contactButtons = await screen.findAllByText("Contact");

    // Iterate over the buttons and check to see that the buttons' container href redirects to an external mail app
    for (let button of contactButtons) {
      const container = button.closest(".contact-link");
      const href = container.getAttribute("href");
      //Check that the container <a> href is a mailto link
      expect(href).toEqual(expect.stringContaining("mailto:"));
    }
  });

  it("displays cards for each item in filteredData", async () => {
    vi.mocked(fetchDataArray).mockResolvedValue([
      {
        email: "test@test.com",
        name: "Test User",
        "skills-have": [],
        "skills-want": [],
      },
    ]);

    vi.mocked(useAuthState).mockReturnValue([{ email: "test@test.com" }]);
    render(<SwapPage />);

    // pretend that "coding" is being typed
    render(<SearchBar onSearch={() => {}} />); // pass an empty function for onSearch
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "coding" } });

    // Wait for the cards to update
    await waitFor(() => screen.getByTestId("skills-list"));

    // Get all the cards
    const cards = screen.getAllByTestId("skills-list");

    // For each card, get the skills-have values and check if they contain the search value
    cards.forEach((card) => {
      const skills = card.querySelectorAll(".skill-tag");
      skills.forEach((skill) => {
        expect(skill.textContent).toContain("coding");
      });
    });
  });

  // More tests can be added based on the interaction and dynamic features of the component
});
