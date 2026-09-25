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

const API_URL =
  "https://api.abcz.workers.dev/api/fitlog";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("ALL");

  /* =========================
     FETCH WORKOUTS
  ========================= */

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            "Failed to fetch workouts"
          );
        }

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error(
          "Workout fetch error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
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

          <div>

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
              companion: pick a lift, lock it
              into today&apos;s plan, and watch
              the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="primary-button"
            >
              BROWSE WORKOUTS
              <ArrowDown size={16} />
            </a>

          </div>

          <div className="hero-image">
            <img
              src={
                workouts[0]?.image ||
                "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740"
              }
              alt="Workout"
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
                        />

                      </div>

                      {/* CONTENT */}

                      <div className="card-content">

                        {/* MUSCLE GROUP TAGS */}

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

                        {/* NAME */}

                        <h3 className="card-title">
                          {workout.name.toUpperCase()}
                        </h3>

                        {/* EQUIPMENT */}

                        <p className="card-equipment">
                          {workout.equipment}
                        </p>

                        {/* STATS */}

                        <div className="card-stats">

                          <span className="card-stat">
                            <Clock3 size={13} />
                            {workout.duration} min
                          </span>

                          <span className="card-stat">
                            <Flame size={13} />
                            {workout.caloriesBurned} kcal
                          </span>

                          <span className="card-stat">
                            <Star size={13} />
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

