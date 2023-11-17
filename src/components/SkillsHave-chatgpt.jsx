import React from "react";

const RenderSkillsHave = ({ skills, levels }) => {
  // Function to capitalize each word in a skill
  const capitalizeWords = (skill) => {
    return skill
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Mapping skill levels to emojis
  const levelToEmoji = {
    beginner: "🌱",
    intermediate: "📈",
    advanced: "🔥"
  };

  return (
    <ul>
      {skills.map((skill, index) => {
        const level = levels[index];
        const emoji = levelToEmoji[level.toLowerCase()] || "";
        return (
          <li key={index}>
            {capitalizeWords(skill)} {emoji}
          </ul>
        );
      })}
    </ul>
  );
};

export default RenderSkillsHave;
