"use client";

import Link from "next/link";
import {
  Check,
  Clock3,
  Dumbbell,
  Flame,
  Star,
  X,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { usePlan } from "../../context/PlanContext";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
  completed?: boolean;
};

export default function MyPlanPage() {
  const {
    plan,
    saved,
    addToPlan,
    removeFromPlan,
    removeSaved,
    markAsDone,
    planMinutes,
    planCalories,
    hydrated,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  if (!hydrated) {
    return (
      <main className="my-plan-page">
        <div className="container">
          <div className="plan-loading">
            <div className="loader"></div>
            <p>Loading workouts…</p>
          </div>
        </div>
      </main>
    );
  }

  const handleRemovePlan = (id: number) => {
    removeFromPlan(id);
    toast.success("Workout removed from today's plan");
  };

  const handleRemoveSaved = (id: number) => {
    removeSaved(id);
    toast.success("Workout removed from saved");
  };

  const handleAddSavedToPlan = (workout: Workout) => {
    const result = addToPlan(workout);

    if (result.success) {
      toast.success("Added to today's plan");
    } else {
      toast.error(result.message);
    }
  };

  const handleDone = (id: number) => {
    markAsDone(id);
    toast.success("Workout marked as done");
  };

  return (
    <main className="my-plan-page">
      <div className="container">

        {/* PAGE HEADER */}
        <section className="plan-header">
          <div>
            <p className="eyebrow">YOUR TRAINING LOG</p>

            <h1>MY PLAN</h1>

            <p>
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          <Link href="/" className="browse-link">
            BROWSE WORKOUTS
            <ArrowRight size={16} />
          </Link>
        </section>

        {/* METRICS */}
        <section className="metrics-grid">

          <div className="metric-card">
            <div className="metric-icon">
              <Dumbbell size={19} />
            </div>

            <div>
              <span>EXERCISES</span>
              <strong>{plan.length}</strong>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Clock3 size={19} />
            </div>

            <div>
              <span>MINUTES</span>
              <strong>{planMinutes}</strong>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Flame size={19} />
            </div>

            <div>
              <span>CALORIES</span>
              <strong>{planCalories}</strong>
            </div>
          </div>

        </section>

        {/* TABS */}
        <div className="plan-tabs">

          <button
            className={
              activeTab === "plan"
                ? "plan-tab active"
                : "plan-tab"
            }
            onClick={() => setActiveTab("plan")}
          >
            TODAY&apos;S PLAN
            <span>{plan.length}</span>
          </button>

          <button
            className={
              activeTab === "saved"
                ? "plan-tab active"
                : "plan-tab"
            }
            onClick={() => setActiveTab("saved")}
          >
            SAVED
            <span>{saved.length}</span>
          </button>

        </div>

        {/* TODAY'S PLAN */}
        {activeTab === "plan" && (
          <section className="plan-list">

            {plan.length === 0 ? (
              <EmptyState />
            ) : (
              plan.map((workout: Workout) => (
                <PlanWorkoutCard
                  key={workout.id}
                  workout={workout}
                  onRemove={handleRemovePlan}
                  onDone={handleDone}
                />
              ))
            )}

          </section>
        )}

        {/* SAVED */}
        {activeTab === "saved" && (
          <section className="plan-list">

            {saved.length === 0 ? (
              <SavedEmptyState />
            ) : (
              saved.map((workout: Workout) => (
                <SavedWorkoutCard
                  key={workout.id}
                  workout={workout}
                  onRemove={handleRemoveSaved}
                  onAddToPlan={handleAddSavedToPlan}
                  alreadyInPlan={plan.some(
                    (item: Workout) => item.id === workout.id
                  )}
                />
              ))
            )}

          </section>
        )}

      </div>
    </main>
  );
}

/* =========================================================
   PLAN WORKOUT CARD
========================================================= */

function PlanWorkoutCard({
  workout,
  onRemove,
  onDone,
}: {
  workout: Workout;
  onRemove: (id: number) => void;
  onDone: (id: number) => void;
}) {
  return (
    <article
      className={
        workout.completed
          ? "plan-workout-card completed"
          : "plan-workout-card"
      }
    >
      <div className="plan-card-image">
        <img
          src={workout.image}
          alt={workout.name}
        />
      </div>

      <div className="plan-card-content">

        <div className="plan-card-main">

          <div className="tags">
            {workout.muscleGroups.map((group) => (
              <span
                className="tag"
                key={group}
              >
                {group}
              </span>
            ))}
          </div>

          <h2>{workout.name.toUpperCase()}</h2>

          <p>{workout.equipment}</p>

          <div className="plan-card-stats">

            <span>
              <Clock3 size={14} />
              {workout.duration} min
            </span>

            <span>
              <Flame size={14} />
              {workout.caloriesBurned} kcal
            </span>

            <span>
              <Star size={14} />
              {workout.rating}
            </span>

          </div>

        </div>

        <div className="plan-card-actions">

          <Link
            href={`/workout/${workout.id}`}
            className="small-button secondary-small"
          >
            VIEW DETAILS
          </Link>

          <button
            className="small-button done-button"
            onClick={() => onDone(workout.id)}
            disabled={workout.completed}
          >
            <Check size={15} />

            {workout.completed
              ? "DONE"
              : "MARK AS DONE"}
          </button>

          <button
  className="remove-button"
  onClick={() => onRemove(workout.id)}
  aria-label="Remove workout"
>
  <X size={18} strokeWidth={2.5} />
</button>

        </div>

      </div>
    </article>
  );
}

/* =========================================================
   SAVED WORKOUT CARD
========================================================= */

function SavedWorkoutCard({
  workout,
  onRemove,
  onAddToPlan,
  alreadyInPlan,
}: {
  workout: Workout;
  onRemove: (id: number) => void;
  onAddToPlan: (workout: Workout) => void;
  alreadyInPlan: boolean;
}) {
  return (
    <article className="plan-workout-card">

      <div className="plan-card-image">
        <img
          src={workout.image}
          alt={workout.name}
        />
      </div>

      <div className="plan-card-content">

        <div className="plan-card-main">

          <div className="tags">
            {workout.muscleGroups.map((group) => (
              <span
                className="tag"
                key={group}
              >
                {group}
              </span>
            ))}
          </div>

          <h2>{workout.name.toUpperCase()}</h2>

          <p>{workout.equipment}</p>

          <div className="plan-card-stats">

            <span>
              <Clock3 size={14} />
              {workout.duration} min
            </span>

            <span>
              <Flame size={14} />
              {workout.caloriesBurned} kcal
            </span>

            <span>
              <Star size={14} />
              {workout.rating}
            </span>

          </div>

        </div>

        <div className="plan-card-actions">

          <Link
            href={`/workout/${workout.id}`}
            className="small-button secondary-small"
          >
            VIEW DETAILS
          </Link>

          <button
            className="small-button done-button"
            onClick={() => onAddToPlan(workout)}
            disabled={alreadyInPlan}
          >
            <Dumbbell size={14} />

            {alreadyInPlan
              ? "ALREADY IN PLAN"
              : "ADD TO PLAN"}
          </button>

          <button
  className="remove-button"
  onClick={() => onRemove(workout.id)}
  aria-label="Remove saved workout"
>
  <X size={18} strokeWidth={2.5} />
</button>

        </div>

      </div>
    </article>
  );
}

/* =========================================================
   EMPTY STATES
========================================================= */

function EmptyState() {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        <Dumbbell size={25} />
      </div>

      <p className="eyebrow">
        TODAY&apos;S PLAN
      </p>

      <h2>NOTHING HERE YET</h2>

      <p>
        Browse the library and add a lift to get today moving.
      </p>

      <Link
        href="/"
        className="primary-button"
      >
        GO TO WORKOUTS
        <ArrowRight size={16} />
      </Link>

    </div>
  );
}

function SavedEmptyState() {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        <Star size={25} />
      </div>

      <p className="eyebrow">
        SAVED WORKOUTS
      </p>

      <h2>NOTHING SAVED YET</h2>

      <p>
        Save your favorite workouts here and come back to them later.
      </p>

      <Link
        href="/"
        className="primary-button"
      >
        GO TO WORKOUTS
        <ArrowRight size={16} />
      </Link>

    </div>
  );
}

