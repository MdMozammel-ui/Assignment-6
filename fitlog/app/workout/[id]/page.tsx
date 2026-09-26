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

const workouts: Workout[] = [
  {
    id: 1,
    name: "Push Up",
    image:
      "https://images.unsplash.com/photo-1598971639058-a4f3a0e7f7b1?auto=format&fit=crop&w=900&q=80",
    muscleGroups: ["Chest", "Shoulders", "Triceps"],
    equipment: "None",
    difficulty: "Beginner",
    duration: 15,
    caloriesBurned: 100,
    sets: 3,
    reps: "10-15",
    rating: 4.8,
    description:
      "A simple and effective upper body exercise.",
    instructions: [
      "Start in a plank position.",
      "Lower your body slowly.",
      "Push yourself back up.",
    ],
  },
  {
    id: 2,
    name: "Squat",
    image:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80",
    muscleGroups: ["Legs", "Glutes"],
    equipment: "None",
    difficulty: "Beginner",
    duration: 20,
    caloriesBurned: 140,
    sets: 3,
    reps: "12-15",
    rating: 4.7,
    description:
      "A basic lower body strength exercise.",
    instructions: [
      "Stand with your feet shoulder-width apart.",
      "Lower your hips down.",
      "Return to the starting position.",
    ],
  },
  {
    id: 3,
    name: "Plank",
    image:
      "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=900&q=80",
    muscleGroups: ["Core", "Abs"],
    equipment: "None",
    difficulty: "Beginner",
    duration: 10,
    caloriesBurned: 80,
    sets: 3,
    reps: "30-60 sec",
    rating: 4.9,
    description:
      "An excellent exercise for core stability.",
    instructions: [
      "Place your elbows under your shoulders.",
      "Keep your body straight.",
      "Hold the position.",
    ],
  },
  {
    id: 4,
    name: "Lunges",
    image:
      "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=900&q=80",
    muscleGroups: ["Legs", "Glutes"],
    equipment: "None",
    difficulty: "Intermediate",
    duration: 15,
    caloriesBurned: 120,
    sets: 3,
    reps: "10 each leg",
    rating: 4.6,
    description:
      "A great exercise for legs and balance.",
    instructions: [
      "Stand straight.",
      "Step forward with one leg.",
      "Lower your body and return.",
    ],
  },
  {
    id: 5,
    name: "Bicep Curl",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80",
    muscleGroups: ["Biceps", "Arms"],
    equipment: "Dumbbells",
    difficulty: "Beginner",
    duration: 15,
    caloriesBurned: 90,
    sets: 3,
    reps: "10-12",
    rating: 4.7,
    description:
      "A classic exercise for building biceps strength.",
    instructions: [
      "Hold dumbbells at your sides.",
      "Curl the weights upward.",
      "Lower them slowly.",
    ],
  },
  {
    id: 6,
    name: "Shoulder Press",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
    muscleGroups: ["Shoulders", "Arms"],
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    duration: 20,
    caloriesBurned: 130,
    sets: 3,
    reps: "8-12",
    rating: 4.8,
    description:
      "A compound exercise targeting the shoulders.",
    instructions: [
      "Hold dumbbells at shoulder level.",
      "Press them overhead.",
      "Lower them back down.",
    ],
  },
  {
    id: 7,
    name: "Deadlift",
    image:
      "https://images.unsplash.com/photo-1598971639058-a4f3a0e7f7b1?auto=format&fit=crop&w=900&q=80",
    muscleGroups: ["Back", "Legs", "Glutes"],
    equipment: "Barbell",
    difficulty: "Advanced",
    duration: 30,
    caloriesBurned: 220,
    sets: 4,
    reps: "6-10",
    rating: 4.9,
    description:
      "A powerful full-body strength movement.",
    instructions: [
      "Stand behind the barbell.",
      "Lift the bar while keeping your back straight.",
      "Lower it with control.",
    ],
  },
  {
    id: 8,
    name: "Bench Press",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
    muscleGroups: ["Chest", "Triceps"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    duration: 25,
    caloriesBurned: 180,
    sets: 4,
    reps: "8-12",
    rating: 4.8,
    description:
      "A popular compound chest exercise.",
    instructions: [
      "Lie on the bench.",
      "Grip the bar slightly wider than your shoulders.",
      "Lower and press the bar upward.",
    ],
  },
];

export default function WorkoutDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const { addToPlan, saveWorkout, plan, saved } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = Number(params.id);

    const foundWorkout = workouts.find(
      (item) => item.id === id
    );

    setWorkout(foundWorkout || null);
    setLoading(false);
  }, [params.id]);

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

  if (!workout) {
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

  const alreadyInPlan = plan.some(
    (item: Workout) => item.id === workout.id
  );

  const alreadySaved = saved.some(
    (item: Workout) => item.id === workout.id
  );

  const handleAddToPlan = () => {
    const result = addToPlan(workout);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

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

        <button
          className="back-button"
          onClick={() => router.back()}
        >
          <ArrowLeft size={17} />
          BACK TO LIBRARY
        </button>

        <div className="details-grid">

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

            <div className="specs-panel">

              <div className="spec-row">
                <span>EQUIPMENT</span>
                <strong>
                  {workout.equipment}
                </strong>
              </div>

              <div className="spec-row">
                <span>DIFFICULTY</span>
                <strong>
                  {workout.difficulty}
                </strong>
              </div>

              <div className="spec-row">
                <span>SETS</span>
                <strong>
                  {workout.sets}
                </strong>
              </div>

              <div className="spec-row">
                <span>REPS</span>
                <strong>
                  {workout.reps}
                </strong>
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

            <div className="details-actions">

              <button
                className="primary-button details-action"
                onClick={handleAddToPlan}
              >
                <Dumbbell size={17} />
                {alreadyInPlan
                  ? "ALREADY IN TODAY'S PLAN"
                  : "ADD TO TODAY'S PLAN"}
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