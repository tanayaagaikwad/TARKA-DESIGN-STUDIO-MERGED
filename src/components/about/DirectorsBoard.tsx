import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { directors, type PersonProfile } from "@/data/about";
import DirectorModal from "./DirectorModal";

export default function DirectorsBoard() {
  const [selectedDirector, setSelectedDirector] =
    useState<PersonProfile | null>(null);

  return (
    <section className="about-directors-section">
      <div className="about-section-top">
        <div>
          <p className="about-eyebrow">THE PEOPLE BEHIND THE THINKING</p>
          <h2 className="about-section-heading">
            Meet the <span>Directors.</span>
          </h2>
        </div>

        <p className="about-section-description">
          The people who guide the vision, shape the ideas and move TARKA
          forward.
        </p>
      </div>

      <div className="directors-grid">
        {directors.map((director, index) => (
          <Reveal key={director.id} delay={index * 100}>
            <button
              type="button"
              className="director-card"
              onClick={() => setSelectedDirector(director)}
              aria-label={`View profile of ${
                director.name || `Director ${index + 1}`
              }`}
            >
              <div className="director-card-visual">
                {director.image ? (
                  <img
                    src={director.image}
                    alt={director.name || "Director portrait"}
                    className="director-card-image"
                  />
                ) : (
                  <div className="director-card-placeholder">
                    <span>0{index + 1}</span>
                    <span className="director-placeholder-mark">T.</span>
                  </div>
                )}

                <span className="director-card-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </div>

              <div className="director-card-info">
                <div>
                  <p className="director-card-number">DIRECTOR / 0{index + 1}</p>
                  <h3>{director.name || "Name to be added"}</h3>
                  <p className="director-card-role">
                    {director.department || director.designation}
                  </p>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <DirectorModal
        director={selectedDirector}
        onClose={() => setSelectedDirector(null)}
      />
    </section>
  );
}
