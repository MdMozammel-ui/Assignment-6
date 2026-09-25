"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Clock3,
  Dumbbell,
  Flame,
  Heart,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import { usePlan } from "../../../context/PlanContext";

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
};

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const { addToPlan, saveWorkout, plan, saved } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        setLoading(true);
        setNotFoundError(false);

        const response = await fetch(`${API_URL}/${params.id}`);

        if (!response.ok) {
          setNotFoundError(true);
          return;
        }

        const data = await response.json();

        if (!data || !data.id) {
          setNotFoundError(true);
          return;
        }

        setWorkout(data);
      } catch (error) {
        console.error("Workout fetch error:", error);
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [params.id]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="details-page">
        <div className="container">
          <div className="details-loading">
            <div className="loading-spinner"></div>

            <p>Loading workout...</p>

            <span>
              Preparing your workout details
            </span>
          </div>
        </div>
      </main>
    );
  }

  /* =========================
     WORKOUT NOT FOUND
  ========================= */

  if (notFoundError || !workout) {
    return (
      <main className="details-page">
        <div className="container">
          <div className="workout-not-found">

            <div className="not-found-icon">
              <Dumbbell size={28} />
            </div>

            <p className="eyebrow">
              FITLOG / WORKOUT
            </p>

            <h1>404</h1>

            <h2>WORKOUT NOT FOUND</h2>

            <p>
              We couldn&apos;t find the workout you&apos;re
              looking for. It may have been removed or the
              workout ID may be invalid.
            </p>

            <div className="not-found-actions">

              <button
                className="primary-button"
                onClick={() => router.push("/")}
              >
                <ArrowLeft size={16} />
                BACK TO WORKOUTS
              </button>

              <button
                className="secondary-button"
                onClick={() => router.back()}
              >
                GO BACK
              </button>

            </div>

          </div>
        </div>
      </main>
    );
  }

  /* =========================
     PLAN / SAVED STATUS
  ========================= */

  const alreadyInPlan = plan.some(
    (item: Workout) => item.id === workout.id
  );

  const alreadySaved = saved.some(
    (item: Workout) => item.id === workout.id
  );

  /* =========================
     ADD TO PLAN
  ========================= */

  const handleAddToPlan = () => {
    const result = addToPlan(workout);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  /* =========================
     SAVE WORKOUT
  ========================= */

  const handleSave = () => {
    const result = saveWorkout(workout);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <main className="details-page">
      <div className="container">

        {/* BACK BUTTON */}

        <button
          className="back-button"
          onClick={() => router.back()}
        >
          <ArrowLeft size={17} />
          BACK TO LIBRARY
        </button>

        <div className="details-grid">

          {/* =========================
              LEFT IMAGE
          ========================= */}

          <div className="details-image-wrapper">

            <img
              src={workout.image}
              alt={workout.name}
              className="details-image"
            />

            <div className="image-label">
              FITLOG / WORKOUT
            </div>

          </div>

          {/* =========================
              RIGHT CONTENT
          ========================= */}

          <div className="details-content">

            <p className="eyebrow">
              WORKOUT DETAILS
            </p>

            <h1 className="details-title">
              {workout.name.toUpperCase()}
            </h1>

            <p className="details-description">
              {workout.description}
            </p>

            {/* TAGS */}

            <div className="details-tags">
              {workout.muscleGroups.map((group) => (
                <span
                  className="tag"
                  key={group}
                >
                  {group}
                </span>
              ))}
            </div>

            {/* SPECS */}

            <div className="specs-panel">

              <div className="spec-row">
                <span>EQUIPMENT</span>
                <strong>{workout.equipment}</strong>
              </div>

              <div className="spec-row">
                <span>DIFFICULTY</span>
                <strong>{workout.difficulty}</strong>
              </div>

              <div className="spec-row">
                <span>SETS</span>
                <strong>{workout.sets}</strong>
              </div>

              <div className="spec-row">
                <span>REPS</span>
                <strong>{workout.reps}</strong>
              </div>

              <div className="spec-row">
                <span>DURATION</span>
                <strong>
                  {workout.duration} min
                </strong>
              </div>

              <div className="spec-row">
                <span>CALORIES</span>
                <strong>
                  {workout.caloriesBurned} kcal
                </strong>
              </div>

              <div className="spec-row">
                <span>RATING</span>

                <strong className="rating-value">
                  <Star size={15} />
                  {workout.rating}
                </strong>
              </div>

            </div>

            {/* INSTRUCTIONS */}

            <div className="instructions">

              <h2>INSTRUCTIONS</h2>

              <ol>
                {workout.instructions.map(
                  (instruction, index) => (
                    <li key={index}>

                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p>{instruction}</p>

                    </li>
                  )
                )}
              </ol>

            </div>

            {/* ACTIONS */}

            <div className="details-actions">

              <button
                className="primary-button details-action"
                onClick={handleAddToPlan}
                disabled={
                  alreadyInPlan ||
                  plan.length >= 5
                }
              >
                {alreadyInPlan ? (
                  <>
                    <Check size={17} />
                    IN TODAY&apos;S PLAN
                  </>
                ) : (
                  <>
                    <Dumbbell size={17} />
                    ADD TO TODAY&apos;S PLAN
                  </>
                )}
              </button>

              <button
                className="secondary-button details-action"
                onClick={handleSave}
                disabled={alreadySaved}
              >
                {alreadySaved ? (
                  <>
                    <Check size={17} />
                    SAVED
                  </>
                ) : (
                  <>
                    <Heart size={17} />
                    SAVE FOR LATER
                  </>
                )}
              </button>

            </div>

            {/* QUICK STATS */}

            <div className="quick-stats">

              <div>
                <Clock3 size={16} />
                <span>
                  {workout.duration} MIN
                </span>
              </div>

              <div>
                <Flame size={16} />
                <span>
                  {workout.caloriesBurned} KCAL
                </span>
              </div>

              <div>
                <Star size={16} />
                <span>
                  {workout.rating} RATING
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

