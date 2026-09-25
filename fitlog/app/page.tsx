"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  Clock3,
  Flame,
  Star,
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

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error("Workout fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const sortedWorkouts = useMemo(() => {
    const copied = [...workouts];

    if (sortBy === "duration") {
      copied.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "calories") {
      copied.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    }

    if (sortBy === "rating") {
      copied.sort((a, b) => b.rating - a.rating);
    }

    return copied;
  }, [workouts, sortBy]);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">WORKOUT LIBRARY</p>

            <h1 className="hero-title">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="hero-description">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work
              add up.
            </p>

            <a href="#library" className="primary-button">
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

      {/* LIBRARY */}
      <section id="library" className="library">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORE THE MOVEMENTS</p>

              <h2>THE LIBRARY</h2>
            </div>

            <p>
              Twelve lifts covering every major muscle group. Choose your
              movement and build today&apos;s training plan.
            </p>
          </div>

          {/* Sort */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "24px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#9b9f9a",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              SORT BY

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    appearance: "none",
                    background: "#121513",
                    color: "#f4f5f0",
                    border: "1px solid #292e2a",
                    borderRadius: "7px",
                    padding: "10px 38px 10px 13px",
                    outline: "none",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  <option value="duration">Duration</option>
                  <option value="calories">Calories</option>
                  <option value="rating">Rating</option>
                </select>

                <ArrowDown
                  size={14}
                  style={{
                    position: "absolute",
                    right: "12px",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </label>
          </div>

          {/* Loading */}
          {loading && (
            <div className="loading-screen">
              <div>
                <div className="loader"></div>

                <p
                  style={{
                    marginTop: "16px",
                    color: "#9b9f9a",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  Loading workouts…
                </p>
              </div>
            </div>
          )}

          {/* Cards */}
          {!loading && (
            <div className="workout-grid">
              {sortedWorkouts.map((workout) => (
                <Link
                  href={`/workout/${workout.id}`}
                  key={workout.id}
                  className="workout-card"
                >
                  <div className="card-image">
                    <img src={workout.image} alt={workout.name} />
                  </div>

                  <div className="card-content">
                    <div className="tags">
                      {workout.muscleGroups.map((group) => (
                        <span className="tag" key={group}>
                          {group}
                        </span>
                      ))}
                    </div>

                    <h3 className="card-title">
                      {workout.name.toUpperCase()}
                    </h3>

                    <p className="card-equipment">
                      {workout.equipment}
                    </p>

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
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}