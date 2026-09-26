"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  Clock3,
  Flame,
  Star,
  Search,
} from "lucide-react";

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

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("ALL");

  /* =========================
     WORKOUT DATA
  ========================= */

  useEffect(() => {
    const fallbackWorkouts: Workout[] = [
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

    setWorkouts(fallbackWorkouts);
    setLoading(false);
  }, []);

  /* =========================
     CATEGORIES
  ========================= */

  const categories = useMemo(() => {
    const allCategories = workouts.flatMap(
      (workout) => workout.muscleGroups
    );

    return [
      "ALL",
      ...new Set(allCategories),
    ];
  }, [workouts]);

  /* =========================
     SEARCH + CATEGORY FILTER
  ========================= */

  const filteredWorkouts = useMemo(() => {
    const search =
      searchTerm.toLowerCase().trim();

    return workouts.filter((workout) => {
      const matchesSearch =
        workout.name
          .toLowerCase()
          .includes(search) ||
        workout.equipment
          .toLowerCase()
          .includes(search) ||
        workout.muscleGroups.some((group) =>
          group
            .toLowerCase()
            .includes(search)
        );

      const matchesCategory =
        selectedCategory === "ALL" ||
        workout.muscleGroups.includes(
          selectedCategory
        );

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    workouts,
    searchTerm,
    selectedCategory,
  ]);

  /* =========================
     SORT
  ========================= */

  const sortedWorkouts = useMemo(() => {
    const copied = [
      ...filteredWorkouts,
    ];

    if (sortBy === "duration") {
      copied.sort(
        (a, b) =>
          a.duration - b.duration
      );
    }

    if (sortBy === "calories") {
      copied.sort(
        (a, b) =>
          b.caloriesBurned -
          a.caloriesBurned
      );
    }

    if (sortBy === "rating") {
      copied.sort(
        (a, b) =>
          b.rating - a.rating
      );
    }

    return copied;
  }, [
    filteredWorkouts,
    sortBy,
  ]);

  return (
    <>
      {/* =========================
          HERO
      ========================= */}

      <section className="hero">
        <div className="container hero-grid">

          <div className="hero-content">

            <p className="eyebrow">
              WORKOUT LIBRARY
            </p>

            <h1 className="hero-title">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="hero-description">
              FitLog is a dark, no-nonsense gym
              companion: pick a lift, lock it into
              today&apos;s plan, and watch the week&apos;s
              work add up.
            </p>

            <a
              href="#library"
              className="primary-button"
            >
              BROWSE WORKOUTS
              <ArrowDown
                size={18}
                strokeWidth={2.5}
              />
            </a>

          </div>

          <div className="hero-image">
            <img
              src="/banner.png"
              alt="Workout Illustration"
            />
          </div>

        </div>
      </section>

      {/* =========================
          LIBRARY
      ========================= */}

      <section
        id="library"
        className="library"
      >

        <div className="container">

          {/* SECTION HEADING */}

          <div className="section-heading">

            <div>

              <p className="eyebrow">
                EXPLORE THE MOVEMENTS
              </p>

              <h2>
                THE LIBRARY
              </h2>

            </div>

            <p>
              Twelve lifts covering every major
              muscle group. Choose your movement
              and build today&apos;s training plan.
            </p>

          </div>

          {/* =========================
              LIBRARY CONTROLS
          ========================= */}

          <div className="library-controls">

            {/* SEARCH */}

            <div className="search-box">

              <Search size={16} />

              <input
                type="text"
                placeholder="Search workouts..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
              />

            </div>

            {/* CATEGORY FILTERS */}

            <div className="category-filters">

              {categories.map(
                (category) => (
                  <button
                    key={category}
                    className={
                      selectedCategory ===
                      category
                        ? "category-filter active"
                        : "category-filter"
                    }
                    onClick={() =>
                      setSelectedCategory(
                        category
                      )
                    }
                  >
                    {category}
                  </button>
                )
              )}

            </div>

            {/* SORT */}

            <label className="sort-control">

              SORT BY

              <div className="sort-select-wrapper">

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
                  }
                >

                  <option value="duration">
                    Duration
                  </option>

                  <option value="calories">
                    Calories
                  </option>

                  <option value="rating">
                    Rating
                  </option>

                </select>

                <ArrowDown size={14} />

              </div>

            </label>

          </div>

          {/* =========================
              LOADING
          ========================= */}

          {loading && (
            <div className="workout-loading">

              <div className="loading-spinner"></div>

              <p>
                Loading workouts...
              </p>

              <span>
                Preparing your workout library
              </span>

            </div>
          )}

          {/* =========================
              WORKOUT CARDS
          ========================= */}

          {!loading &&
            sortedWorkouts.length > 0 && (
              <div className="workout-grid">

                {sortedWorkouts.map(
                  (workout) => (
                    <Link
                      href={`/workout/${workout.id}`}
                      key={workout.id}
                      className="workout-card"
                    >

                      {/* IMAGE */}

                      <div className="card-image">

                        <img
                          src={workout.image}
                          alt={workout.name}
                          loading="lazy"
                        />

                      </div>

                      {/* CONTENT */}

                      <div className="card-content">

                        <div className="tags">

                          {workout.muscleGroups.map(
                            (group) => (
                              <span
                                className="tag"
                                key={group}
                              >
                                {group}
                              </span>
                            )
                          )}

                        </div>

                        <h3 className="card-title">
                          {workout.name.toUpperCase()}
                        </h3>

                        <p className="card-equipment">
                          {workout.equipment}
                        </p>

                        <div className="card-stats">

                          <span className="card-stat">
                            <Clock3 size={14} />
                            {workout.duration} min
                          </span>

                          <span className="card-stat">
                            <Flame size={14} />
                            {workout.caloriesBurned} kcal
                          </span>

                          <span className="card-stat">
                            <Star size={14} />
                            {workout.rating}
                          </span>

                        </div>

                      </div>

                    </Link>
                  )
                )}

              </div>
            )}

          {/* =========================
              NO RESULTS
          ========================= */}

          {!loading &&
            sortedWorkouts.length === 0 && (
              <div className="no-results">

                <div className="empty-icon">
                  <Search size={24} />
                </div>

                <p className="eyebrow">
                  WORKOUT LIBRARY
                </p>

                <h3>
                  NO WORKOUTS FOUND
                </h3>

                <p>
                  Try another workout name,
                  equipment, or muscle group.
                </p>

                <button
                  className="primary-button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory(
                      "ALL"
                    );
                  }}
                >
                  CLEAR FILTERS
                </button>

              </div>
            )}

        </div>

      </section>
    </>
  );
}