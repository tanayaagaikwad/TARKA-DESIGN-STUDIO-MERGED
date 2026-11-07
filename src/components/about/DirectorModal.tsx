import { useEffect } from "react";
import { X } from "lucide-react";
import type { PersonProfile } from "@/data/about";

type Props = {
  director: PersonProfile | null;
  onClose: () => void;
};

export default function DirectorModal({ director, onClose }: Props) {
  useEffect(() => {
    if (!director) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [director, onClose]);

  if (!director) return null;

  const hasDetails = Boolean(
    director.name ||
    director.intro ||
    director.biography ||
    director.experience ||
    director.expertise.length > 0
  );

  return (
    <div
      className="director-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="director-modal-title"
        className="director-modal"
      >
        <button
          type="button"
          onClick={onClose}
          className="director-modal-close"
          aria-label="Close director profile"
        >
          <X size={22} />
        </button>

        <div className="director-modal-content">
          <p className="about-eyebrow">TARKA / DIRECTORS</p>

          {director.image ? (
            <img
              src={director.image}
              alt={director.name || "Director portrait"}
              className="director-modal-image"
            />
          ) : (
            <div className="director-modal-placeholder">
              <span>PROFILE</span>
            </div>
          )}

          <p className="director-designation">{director.designation}</p>

          <h2 id="director-modal-title">
            {director.name || "Profile coming soon"}
          </h2>

          {director.department && (
            <p className="director-department">{director.department}</p>
          )}

          {hasDetails ? (
            <>
              {director.intro && (
                <p className="director-modal-intro">{director.intro}</p>
              )}

              {director.biography && (
                <div className="director-modal-bio">
                  {director.biography.split("\n").map((paragraph, index) =>
                    paragraph.trim() ? (
                      <p key={index}>{paragraph}</p>
                    ) : null
                  )}
                </div>
              )}

              {director.experience && (
                <p className="director-modal-detail">
                  <strong>Experience:</strong> {director.experience}
                </p>
              )}

              {director.responsibilities && (
                <p className="director-modal-detail">
                  <strong>Responsibilities:</strong>{" "}
                  {director.responsibilities}
                </p>
              )}

              {director.expertise.length > 0 && (
                <div className="director-expertise">
                  <h3>Areas of expertise</h3>
                  <div className="director-tags">
                    {director.expertise.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="director-modal-empty">
              This director&apos;s profile will be added soon.
            </p>
          )}

          <div className="director-socials">
            {director.links.linkedin && (
              <a
                href={director.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                LINKEDIN ↗
              </a>
            )}

            {director.links.instagram && (
              <a
                href={director.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
              >
                INSTAGRAM ↗
              </a>
            )}

            {director.links.website && (
              <a
                href={director.links.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Personal website"
              >
                WEBSITE ↗
              </a>
            )}

            {director.links.behance && (
              <a
                href={director.links.behance}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Behance profile"
              >
                BEHANCE ↗
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
