import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href, ...props }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe("Footer", () => {
  test("renders footer with company name and description", () => {
    render(<Footer />);

    expect(screen.getByText("Nova Marketplace")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Your premier destination for discovering and managing quality products/
      )
    ).toBeInTheDocument();
  });

  test("renders quick links section", () => {
    render(<Footer />);

    expect(screen.getByText("Quick Links")).toBeInTheDocument();

    // Check for navigation links in footer
    const footerLinks = screen.getAllByRole("link");
    const linkTexts = footerLinks.map((link) => link.textContent);

    expect(linkTexts).toContain("Home");
    expect(linkTexts).toContain("Products");
    expect(linkTexts).toContain("Login");
  });

  test("renders support section", () => {
    render(<Footer />);

    expect(screen.getByText("Support")).toBeInTheDocument();
    expect(screen.getByText("Help Center")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
  });

  test("footer links have correct href attributes", () => {
    render(<Footer />);

    // Get all links and filter by href
    const allLinks = screen.getAllByRole("link");

    const homeLink = allLinks.find((link) => link.getAttribute("href") === "/");
    const productsLink = allLinks.find(
      (link) => link.getAttribute("href") === "/items"
    );
    const loginLink = allLinks.find(
      (link) => link.getAttribute("href") === "/login"
    );

    expect(homeLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });

  test("renders copyright notice with current year", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        `© ${currentYear} Nova Marketplace. All rights reserved.`
      )
    ).toBeInTheDocument();
  });

  test("renders social media icons", () => {
    render(<Footer />);

    // Check for social media links (they have sr-only text)
    expect(screen.getByText("Facebook")).toBeInTheDocument();
    expect(screen.getByText("Twitter")).toBeInTheDocument();
  });

  test("has proper footer structure and styling", () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector("footer");
    expect(footer).toHaveClass("bg-gray-900", "text-white");

    // Check for responsive grid
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-4");
  });

  test("renders all required footer sections", () => {
    render(<Footer />);

    // Company info section
    expect(
      screen.getByText(
        /Built with modern technology for a seamless shopping experience/
      )
    ).toBeInTheDocument();

    // Quick Links section
    expect(screen.getByText("Quick Links")).toBeInTheDocument();

    // Support section
    expect(screen.getByText("Support")).toBeInTheDocument();

    // Bottom bar with copyright
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });
});
