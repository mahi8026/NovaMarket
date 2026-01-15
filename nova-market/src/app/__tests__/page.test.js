import { render, screen } from "@testing-library/react";
import Home from "../page";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockedLink({ children, href, ...props }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe("Landing Page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  test("renders exactly 7 content sections", () => {
    // Count all section elements which represent the 7 content sections
    const sectionElements = document.querySelectorAll("section");

    expect(sectionElements).toHaveLength(7);
  });

  test("renders hero section with main heading", () => {
    expect(
      screen.getByRole("heading", { name: /welcome to nova marketplace/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/discover amazing products and connect with sellers/i)
    ).toBeInTheDocument();
  });

  test("renders features section", () => {
    expect(
      screen.getByRole("heading", { name: /why choose nova marketplace/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/fast & secure/i)).toBeInTheDocument();
    expect(screen.getByText(/community driven/i)).toBeInTheDocument();
    expect(screen.getByText(/quality assured/i)).toBeInTheDocument();
  });

  test("renders about section", () => {
    expect(
      screen.getByRole("heading", { name: /about nova marketplace/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/founded with a vision to create/i)
    ).toBeInTheDocument();
  });

  test("renders services section", () => {
    expect(
      screen.getByRole("heading", { name: /our services/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/product listing/i)).toBeInTheDocument();
    expect(screen.getByText(/secure payments/i)).toBeInTheDocument();
    expect(screen.getByText(/24\/7 customer support/i)).toBeInTheDocument();
    expect(
      screen.getByText(/detailed analytics and insights/i)
    ).toBeInTheDocument();
  });

  test("renders testimonials section", () => {
    expect(
      screen.getByRole("heading", { name: /what our users say/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/sarah johnson/i)).toBeInTheDocument();
    expect(screen.getByText(/mike chen/i)).toBeInTheDocument();
    expect(screen.getByText(/emily rodriguez/i)).toBeInTheDocument();
  });

  test("renders pricing section", () => {
    expect(
      screen.getByRole("heading", { name: /simple, transparent pricing/i })
    ).toBeInTheDocument();

    // Use more specific text to avoid conflicts
    expect(
      screen.getByRole("heading", { name: /^basic$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /^seller$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /^enterprise$/i })
    ).toBeInTheDocument();
  });

  test("renders contact section", () => {
    expect(
      screen.getByRole("heading", { name: /get in touch/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/support@novamarketplace.com/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/contact information/i)).toBeInTheDocument();
  });

  test("page is accessible without authentication", () => {
    // Test that the page renders without requiring authentication
    // This is implicitly tested by the fact that all other tests pass
    // since we're not mocking any authentication
    expect(
      screen.getByRole("heading", { name: /welcome to nova marketplace/i })
    ).toBeInTheDocument();
  });

  test("contains navigation links to key pages", () => {
    // Test links in hero section
    const browseProductsLink = screen.getByRole("link", {
      name: /browse products/i,
    });
    const getStartedLink = screen.getByRole("link", { name: /get started/i });

    expect(browseProductsLink).toHaveAttribute("href", "/items");
    expect(getStartedLink).toHaveAttribute("href", "/login");
  });

  test("has responsive design elements", () => {
    // Test that responsive classes are present
    const heroSection = document.querySelector("section");
    expect(heroSection).toHaveClass("py-20"); // Responsive padding

    // Test grid layouts have responsive classes
    const gridElements = document.querySelectorAll(".grid");
    expect(gridElements.length).toBeGreaterThan(0);

    // Check for responsive grid classes
    const responsiveGrids = document.querySelectorAll(
      ".md\\:grid-cols-2, .md\\:grid-cols-3, .lg\\:grid-cols-4"
    );
    expect(responsiveGrids.length).toBeGreaterThan(0);
  });
});
