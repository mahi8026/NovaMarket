# Implementation Plan: Nova Marketplace

## Overview

This implementation plan breaks down the Nova Marketplace application into discrete, manageable coding tasks. Each task builds incrementally on previous work, ensuring a functional application at every checkpoint. The plan prioritizes core functionality first, with optional testing tasks marked for flexibility.

## Tasks

- [x] 1. Set up project foundation and dependencies

  - Install and configure Tailwind CSS for styling
  - Set up project structure with proper directories
  - Configure Next.js 16 App Router settings
  - Install testing dependencies (Jest, React Testing Library, fast-check)
  - _Requirements: 8.4_

- [x] 2. Create core UI components and layout

  - [x] 2.1 Implement RootLayout with navigation structure

    - Create app/layout.js with global navigation and footer
    - Implement responsive Navbar component with authentication-aware links
    - Create Footer component with site information
    - _Requirements: 1.1, 1.2, 1.4_

  - [x] 2.2 Write unit tests for layout components
    - Test navbar link presence and navigation behavior
    - Test footer content and structure
    - _Requirements: 1.2, 1.4_

- [x] 3. Build landing page with required sections

  - [x] 3.1 Create landing page with 7 content sections

    - Implement app/page.js with hero, features, about, services, testimonials, pricing, and contact sections
    - Ensure responsive design and professional styling
    - _Requirements: 1.1, 1.3_

  - [x] 3.2 Write unit tests for landing page
    - Test that exactly 7 content sections are rendered
    - Test page accessibility without authentication
    - _Requirements: 1.1, 1.3_

- [x] 4. Implement authentication system

  - [x] 4.1 Create mock authentication with cookies

    - Implement app/api/auth/login/route.js for credential validation
    - Create login form component with email/password fields
    - Implement cookie-based session management
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 4.2 Build login page and authentication flow

    - Create app/(auth)/login/page.js with login form
    - Implement logout functionality with cookie clearing
    - Add redirect logic for successful authentication
    - _Requirements: 2.4, 2.5_

  - [x] 4.3 Write authentication tests
    - Test hardcoded credential validation
    - Test cookie storage and clearing
    - Test redirect behavior after login/logout
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 5. Create route protection middleware

  - [x] 5.1 Implement middleware for protected routes

    - Create src/middleware.js for authentication checks
    - Implement redirect logic for unauthenticated users
    - Configure protected route patterns
    - _Requirements: 6.1, 6.2, 6.4_

  - [x] 5.2 Write property test for route protection
    - **Property 2: Route Protection Enforcement**
    - **Validates: Requirements 6.1, 6.2**

- [x] 6. Build product listing functionality

  - [x] 6.1 Create product list page and API integration

    - Implement app/items/page.js for product display
    - Create API client for Express server communication
    - Implement ProductCard component for product display
    - Add loading states and error handling
    - _Requirements: 3.1, 3.2, 3.4, 3.5_

  - [x] 6.2 Implement product grid and display logic

    - Create ProductGrid component with responsive layout
    - Ensure all product properties are displayed in cards
    - Handle empty product lists gracefully
    - _Requirements: 3.3_

  - [x] 6.3 Write property test for product display

    - **Property 1: Product Display Completeness**
    - **Validates: Requirements 3.3, 4.2, 4.3**

  - [x] 6.4 Write unit tests for product listing
    - Test API integration and error handling
    - Test empty state and loading states
    - _Requirements: 3.2, 3.4, 3.5_

- [x] 7. Checkpoint - Ensure core functionality works

  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Implement product details page

  - [x] 8.1 Create dynamic product details route

    - Implement app/items/[id]/page.js for individual products
    - Create ProductDetails component with full product information
    - Add navigation back to product list
    - Handle invalid product IDs with 404 errors
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 8.2 Write unit tests for product details
    - Test product detail rendering
    - Test invalid ID error handling
    - Test navigation elements
    - _Requirements: 4.2, 4.4, 4.5_

- [x] 9. Build protected product management

  - [x] 9.1 Create add item page with form

    - Implement app/items/add/page.js as protected route
    - Create ProductForm component with validation
    - Include fields for name, description, price, and image
    - _Requirements: 5.1, 5.3_

  - [x] 9.2 Implement product creation API integration

    - Add API client methods for product creation
    - Implement form submission with proper data formatting
    - Add success and error notification handling
    - _Requirements: 5.4, 5.5, 5.6_

  - [x] 9.3 Write property test for API request formatting

    - **Property 3: API Request Format Consistency**
    - **Validates: Requirements 7.3**

  - [x] 9.4 Write unit tests for product creation
    - Test form validation and submission
    - Test success and error notifications
    - Test protected route access
    - _Requirements: 5.1, 5.4, 5.5, 5.6_

- [x] 10. Implement comprehensive error handling and user feedback

  - [x] 10.1 Create error boundary component

    - Implement ErrorBoundary component for catching React errors
    - Add error display UI with recovery options
    - Integrate error boundary at app layout level
    - _Requirements: 8.1, 8.5_

  - [x] 10.2 Create toast notification system

    - Implement Toast component for user notifications
    - Add toast context provider for global notification management
    - Support success, error, info, and warning notification types
    - Add auto-dismiss functionality with configurable duration
    - _Requirements: 8.1, 8.3_

  - [x] 10.3 Enhance API error handling with retry logic

    - Implement exponential backoff retry logic for failed API calls
    - Add comprehensive error messages for different failure modes
    - Ensure graceful degradation when Express server is unavailable
    - Update API client to use retry logic
    - _Requirements: 7.4_

  - [x] 10.4 Add loading spinners to async operations

    - Ensure all data fetching operations show loading states
    - Add skeleton loaders for better UX during data loading
    - Verify loading states are consistent across all pages
    - _Requirements: 8.3_

  - [x] 10.5 Write property tests for user feedback and API handling

    - **Property 4: API Response Handling**
    - **Property 5: User Feedback Consistency**
    - **Validates: Requirements 7.2, 7.4, 8.1, 8.3, 8.5**

- [x] 11. Optional: NextAuth.js integration

  - [x] 11.1 Set up NextAuth.js with Google provider

    - Install and configure NextAuth.js v5
    - Create app/api/auth/[...nextauth]/route.js
    - Configure Google OAuth provider with environment variables
    - Update middleware to work with NextAuth sessions
    - _Requirements: 2.6_

  - [x] 11.2 Update authentication components for NextAuth

    - Modify LoginForm to support both mock and NextAuth authentication
    - Update Navbar to use NextAuth session data
    - Add session provider to app layout
    - _Requirements: 2.6_

  - [ ]\* 11.3 Write tests for NextAuth integration
    - Test Google OAuth flow
    - Test credential provider functionality
    - Test session persistence
    - _Requirements: 2.6_

- [x] 12. Final integration and polish

  - [x] 12.1 Verify complete user workflows

    - Test browse → login → add product workflow
    - Verify authentication state persistence across page refreshes
    - Ensure seamless navigation between all pages
    - Test logout and re-login flow
    - _Requirements: 6.3_

  - [x] 12.2 Add responsive design improvements

    - Verify mobile responsiveness across all pages
    - Test tablet and desktop layouts
    - Ensure touch-friendly interactions on mobile
    - _Requirements: 8.2_

  - [x] 12.3 Write integration tests

    - Test complete user journeys (browse → login → add product)
    - Test authentication state across page refreshes
    - Test error scenarios and recovery
    - _Requirements: 6.3_

- [x] 13. Final checkpoint - Complete application validation
  - Run all tests and ensure they pass
  - Verify all requirements are met
  - Ask the user if questions arise

## Notes

- All tasks are required for comprehensive development from start to finish
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties across all inputs
- Unit tests validate specific examples and edge cases
- Checkpoints ensure incremental validation and user feedback opportunities
- The Express.js server is assumed to be running separately and accessible via API calls
