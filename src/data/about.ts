export type SocialLinks = {
  linkedin?: string;
  instagram?: string;
  behance?: string;
  website?: string;
};

export type PersonProfile = {
  id: string;
  name: string;
  designation: string;
  department?: string;
  intro: string;
  biography: string;
  experience?: string;
  expertise: string[];
  responsibilities?: string;
  image?: string;
  links: SocialLinks;
};

export type InternProfile = {
  id: string;
  name: string;
  role: string;
  department?: string;
  intro?: string;
  image?: string;
  portfolio?: string;
};

export const directors: PersonProfile[] = [
  { id: "director-01", name: "", designation: "Director", intro: "", biography: "", expertise: [], links: {} },
  { id: "director-02", name: "", designation: "Director", intro: "", biography: "", expertise: [], links: {} },
  { id: "director-03", name: "", designation: "Director", intro: "", biography: "", expertise: [], links: {} },
  { id: "director-04", name: "", designation: "Director", intro: "", biography: "", expertise: [], links: {} },
];

export const employees: PersonProfile[] = [];
export const interns: InternProfile[] = [];

export const aboutContent = {
  eyebrow: "GET TO KNOW US",
  heading: "Ideas deserve to become something real.",
  introduction:
    "TARKA is a design and creative technology studio bringing ideas to life through thoughtful design, technology and visual storytelling.",
  visionHeading: "Our Vision",
  vision:
    "To create meaningful digital experiences that bring people, ideas and technology closer together.",
  missionHeading: "Our Mission",
  mission:
    "To turn ambitious ideas into purposeful products, identities and experiences through creativity and thoughtful execution.",
  approachHeading: "Our Approach",
  approach:
    "We listen, explore, experiment and build. Every project begins with understanding the problem before deciding what the solution should look like.",
  philosophyHeading: "Our Philosophy",
  philosophy:
    "Good design is not only about appearance. It is about clarity, intention and making every detail count.",
};
