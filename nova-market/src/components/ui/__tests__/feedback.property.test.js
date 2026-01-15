/**
 * Property-based tests for User Feedback Consistency
 * Feature: nova-marketplace, Property 5: User Feedback Consistency
 * Validates: Requirements 8.1, 8.3, 8.5
 */

import * as fc from "fast-check";
import { render, screen, waitFor } from "@testing-library/react";
import Toast from "../Toast";
import LoadingSpinner from "../LoadingSpinner";
import { ToastProvider, useToast } from "@/contexts/ToastContext";

describe("User Feedback Consistency (Property-Based Tests)", () => {
  /**
   * Property 5: User Feedback Consistency
   * For any user operation (successful or failed), the system should provide
   * appropriate feedback through loading states, success notifications, or error messages
   */
  test("Property 5: Toast notifications display all message types with appropriate styling", async () => {
    // Generator for toast types and messages (non-empty strings)
    const toastArbitrary = fc.record({
      message: fc
        .string({ minLength: 1, maxLength: 500 })
        .filter((s) => s.trim().length > 0),
      type: fc.oneof(
        fc.constant("success"),
        fc.constant("error"),
        fc.constant("warning"),
        fc.constant("info")
      ),
    });

    await fc.assert(
      fc.asyncProperty(toastArbitrary, async ({ message, type }) => {
        const onClose = jest.fn();

        const { container } = render(
          <Toast message={message} type={type} onClose={onClose} duration={0} />
        );

        // Verify message is displayed
        expect(screen.getByText(message)).toBeInTheDocument();

        // Verify toast has role="alert" for accessibility
        const alert = container.querySelector('[role="alert"]');
        expect(alert).toBeInTheDocument();

        // Verify appropriate styling is applied based on type
        const expectedColors = {
          success: "green",
          error: "red",
          warning: "yellow",
          info: "blue",
        };

        const colorClass = expectedColors[type];
        expect(alert.className).toContain(colorClass);

        // Verify close button is present
        const closeButton = screen.getByLabelText("Close notification");
        expect(closeButton).toBeInTheDocument();
      }),
      { numRuns: 100 }
    );
  });

  test("Property 5: Toast auto-dismiss works for reasonable durations", async () => {
    // Generator for reasonable durations (not too long for testing)
    const durationArbitrary = fc.integer({ min: 100, max: 2000 });

    await fc.assert(
      fc.asyncProperty(durationArbitrary, async (duration) => {
        const onClose = jest.fn();
        const message = "Test message";

        render(
          <Toast
            message={message}
            type="info"
            onClose={onClose}
            duration={duration}
          />
        );

        // Verify toast is displayed initially
        expect(screen.getByText(message)).toBeInTheDocument();

        // Wait for auto-dismiss
        await waitFor(
          () => {
            expect(onClose).toHaveBeenCalledTimes(1);
          },
          { timeout: duration + 1000 }
        );
      }),
      { numRuns: 20 } // Reduced runs due to time-based testing
    );
  }, 60000); // Increased timeout for time-based tests

  test("Property 5: Loading spinner renders with all size variants", async () => {
    // Generator for spinner sizes
    const sizeArbitrary = fc.oneof(
      fc.constant("sm"),
      fc.constant("md"),
      fc.constant("lg"),
      fc.constant("xl")
    );

    await fc.assert(
      fc.asyncProperty(sizeArbitrary, async (size) => {
        const { container } = render(<LoadingSpinner size={size} />);

        // Verify spinner has role="status" for accessibility
        const spinner = container.querySelector('[role="status"]');
        expect(spinner).toBeInTheDocument();

        // Verify loading text is present for screen readers
        expect(screen.getByText("Loading...")).toBeInTheDocument();

        // Verify size class is applied
        const sizeClasses = {
          sm: "w-4 h-4",
          md: "w-8 h-8",
          lg: "w-12 h-12",
          xl: "w-16 h-16",
        };

        expect(spinner.className).toContain(sizeClasses[size]);
      }),
      { numRuns: 100 }
    );
  });

  test("Property 5: ToastProvider manages multiple toasts consistently", async () => {
    // Generator for multiple toast operations (non-empty messages)
    const toastOperationsArbitrary = fc.array(
      fc.record({
        message: fc
          .string({ minLength: 1, maxLength: 100 })
          .filter((s) => s.trim().length > 0),
        type: fc.oneof(
          fc.constant("success"),
          fc.constant("error"),
          fc.constant("warning"),
          fc.constant("info")
        ),
      }),
      { minLength: 1, maxLength: 3 } // Reduced max to avoid overwhelming the UI
    );

    await fc.assert(
      fc.asyncProperty(toastOperationsArbitrary, async (toastOps) => {
        // Test component that uses toast
        function TestComponent({ operations }) {
          const toast = useToast();

          return (
            <div>
              {operations.map((op, index) => (
                <button
                  key={index}
                  onClick={() => toast[op.type](op.message, 0)}
                  data-testid={`toast-trigger-${index}`}
                >
                  Show Toast {index}
                </button>
              ))}
            </div>
          );
        }

        const { getByTestId } = render(
          <ToastProvider>
            <TestComponent operations={toastOps} />
          </ToastProvider>
        );

        // Trigger all toasts
        for (let i = 0; i < toastOps.length; i++) {
          const button = getByTestId(`toast-trigger-${i}`);
          button.click();
        }

        // Wait for toasts to appear
        await waitFor(() => {
          // Verify all toast messages are displayed
          toastOps.forEach((op) => {
            expect(screen.getByText(op.message)).toBeInTheDocument();
          });
        });

        // Verify correct number of toasts
        const alerts = screen.getAllByRole("alert");
        expect(alerts.length).toBe(toastOps.length);
      }),
      { numRuns: 50 }
    );
  });

  test("Property 5: All feedback mechanisms are accessible", async () => {
    // Generator for feedback component types
    const feedbackArbitrary = fc.oneof(
      fc.record({
        component: fc.constant("toast"),
        props: fc.record({
          message: fc
            .string({ minLength: 1, maxLength: 100 })
            .filter((s) => s.trim().length > 0),
          type: fc.oneof(
            fc.constant("success"),
            fc.constant("error"),
            fc.constant("warning"),
            fc.constant("info")
          ),
        }),
      }),
      fc.record({
        component: fc.constant("spinner"),
        props: fc.record({
          size: fc.oneof(
            fc.constant("sm"),
            fc.constant("md"),
            fc.constant("lg"),
            fc.constant("xl")
          ),
        }),
      })
    );

    await fc.assert(
      fc.asyncProperty(feedbackArbitrary, async ({ component, props }) => {
        let container;

        if (component === "toast") {
          const result = render(
            <Toast {...props} onClose={() => {}} duration={0} />
          );
          container = result.container;

          // Verify alert role for screen readers
          expect(container.querySelector('[role="alert"]')).toBeInTheDocument();
        } else if (component === "spinner") {
          const result = render(<LoadingSpinner {...props} />);
          container = result.container;

          // Verify status role for screen readers
          expect(
            container.querySelector('[role="status"]')
          ).toBeInTheDocument();

          // Verify screen reader text
          expect(screen.getByText("Loading...")).toBeInTheDocument();
        }

        // All feedback components should have proper ARIA attributes
        const ariaElements = container.querySelectorAll(
          '[role="alert"], [role="status"], [aria-label], [aria-live]'
        );
        expect(ariaElements.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  test("Property 5: Error messages are always non-empty and informative", async () => {
    // Generator for various error scenarios (non-empty messages)
    const errorScenarioArbitrary = fc.record({
      message: fc
        .string({ minLength: 1, maxLength: 500 })
        .filter((s) => s.trim().length > 0),
    });

    await fc.assert(
      fc.asyncProperty(errorScenarioArbitrary, async (errorScenario) => {
        const onClose = jest.fn();

        render(
          <Toast
            message={errorScenario.message}
            type="error"
            onClose={onClose}
            duration={0}
          />
        );

        // Verify error message is displayed
        const displayedMessage = screen.getByText(errorScenario.message);
        expect(displayedMessage).toBeInTheDocument();

        // Verify message is non-empty
        expect(errorScenario.message.trim().length).toBeGreaterThan(0);

        // Verify error styling is applied
        const alert = screen.getByRole("alert");
        expect(alert.className).toContain("red");
      }),
      { numRuns: 100 }
    );
  });

  test("Property 5: Success notifications are visually distinct from errors", async () => {
    // Generator for success and error messages (non-empty)
    const messageArbitrary = fc
      .string({ minLength: 1, maxLength: 200 })
      .filter((s) => s.trim().length > 0);

    await fc.assert(
      fc.asyncProperty(messageArbitrary, async (message) => {
        const onClose = jest.fn();

        // Render success toast
        const { container: successContainer } = render(
          <Toast
            message={message}
            type="success"
            onClose={onClose}
            duration={0}
          />
        );

        // Render error toast
        const { container: errorContainer } = render(
          <Toast
            message={message}
            type="error"
            onClose={onClose}
            duration={0}
          />
        );

        // Get the alert elements
        const successAlert = successContainer.querySelector('[role="alert"]');
        const errorAlert = errorContainer.querySelector('[role="alert"]');

        // Verify both are rendered
        expect(successAlert).toBeInTheDocument();
        expect(errorAlert).toBeInTheDocument();

        // Verify they have different color schemes
        expect(successAlert.className).toContain("green");
        expect(errorAlert.className).toContain("red");

        // Verify they are visually distinct
        expect(successAlert.className).not.toEqual(errorAlert.className);
      }),
      { numRuns: 100 }
    );
  });
});
