// renders a skill-tag <span>
// input: Object
// Object {
//  programming: "beginner",
//  ...
// }
//
//
import "./SkillsHave.css";

const turnIntoEmoji = (level) => {
  switch (level) {
    case "beginner":
      return "🌱";
    case "intermediate":
      return "📈";
    case "advanced":
      return "🔥";
    default:
      return "";
  }
};

export const capitalizeWords = (skill) => {
  return skill
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// {} destructures the props. otherwise we can write
// RenderSkillsHave = (person) => {...}
// and access skills with person.skills, person.levels
export const RenderSkillsHave = ({ skills, levels }) => {
  // Combine skills and levels into an array of objects
  // For neatness
  const skillWithLevels = skills.map((skill, index) => ({
    skill,
    level: levels && levels[index],
  }));

  // Allows us to write it more clearly like this
  // rather than skill and level[index]
  return (
    <div data-testid="skills-list" className="skills-list">
      {skillWithLevels.map(({ skill, level }, index) => (
        <span key={index} className="skill-tag">
          {capitalizeWords(skill)}
          {console.log("new!")}
          {console.log(level)}
          {console.log(turnIntoEmoji(level))}
          {level && turnIntoEmoji(level)}
        </span>
      ))}
    </div>
  );
};
