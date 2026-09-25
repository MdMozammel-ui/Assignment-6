# FitLog — Workout Management App

FitLog is a responsive workout management web application where users can explore workouts, view workout details, save workouts for later, and create a personal workout plan.

## Technologies Used

* Next.js
* React
* TypeScript
* Tailwind CSS
* Lucide React Icons
* REST API
* React Context API
* Local State Management

## Features

1. **Workout Library**

   * Browse workouts from the workout API.
   * Responsive workout cards for desktop, tablet, and mobile.

2. **Search, Filter & Sort**

   * Search workouts by name.
   * Filter workouts by category.
   * Sort workouts using the available sorting options.

3. **Workout Details**

   * View detailed information about a workout.
   * See workout instructions, difficulty, equipment, and other information.

4. **My Plan**

   * Add workouts to a personal workout plan.
   * Maximum 5 workouts can be added to the plan.
   * Remove workouts from the plan.
   * Track completed workouts.

5. **Save for Later**

   * Save workouts for later.
   * Move saved workouts to the personal workout plan.
   * Prevent duplicate workouts from being added.

## Responsive Design

FitLog is designed to work on:

* Desktop
* Laptop
* Tablet
* Mobile phones

The interface automatically adapts the navigation, workout cards, images, buttons, and workout plan layout for smaller screens.

## Project Structure

```text
fitlog/
│
├── app/
│   ├── components/
│   │   └── navbar.jsx
│   │
│   ├── context/
│   │   └── PlanContext.jsx
│   │
│   ├── workout/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── my-plan/
│   │   └── page.tsx
│   │
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── public/
│
├── package.json
└── README.md
```

## Getting Started

Install the project dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

## Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Error Handling

FitLog includes:

* Loading states
* Empty states
* Workout not found handling
* Global 404 page
* Toast notifications
* Responsive mobile layout

## Author

**Md. Mozammel Hoque**

FitLog — Workout Management Application
