"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    setHydrated(true);
  }, []);

  // Save plan
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }
  }, [plan, hydrated]);

  // Save saved workouts
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [saved, hydrated]);

  const addToPlan = (workout) => {
    if (plan.length >= 5) {
      return {
        success: false,
        message: "Today's plan can contain maximum 5 lifts.",
      };
    }

    const alreadyExists = plan.some((item) => item.id === workout.id);

    if (alreadyExists) {
      return {
        success: false,
        message: "This workout is already in today's plan.",
      };
    }

    setPlan((previous) => [...previous, workout]);

    return {
      success: true,
      message: "Added to today's plan",
    };
  };

  const removeFromPlan = (id) => {
    setPlan((previous) => previous.filter((item) => item.id !== id));
  };

  const saveWorkout = (workout) => {
    const alreadySaved = saved.some((item) => item.id === workout.id);

    if (alreadySaved) {
      return {
        success: false,
        message: "Workout is already saved.",
      };
    }

    setSaved((previous) => [...previous, workout]);

    return {
      success: true,
      message: "Saved for later",
    };
  };

  const removeSaved = (id) => {
    setSaved((previous) => previous.filter((item) => item.id !== id));
  };

  const markAsDone = (id) => {
    setPlan((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, completed: true } : item
      )
    );
  };

  const planMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const planCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const value = {
    plan,
    saved,

    addToPlan,
    removeFromPlan,

    saveWorkout,
    removeSaved,

    markAsDone,

    planMinutes,
    planCalories,

    planCount: plan.length,
    savedCount: saved.length,

    hydrated,
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}