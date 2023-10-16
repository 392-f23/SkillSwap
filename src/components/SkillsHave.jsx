// renders a skill-tag <span> 
// input: Object
// Object {
//  programming: "beginner",
//  ...
// }
// 
// 
import './SkillsHave.css';

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
}

export const capitalizeWords = (skill) => {
    return skill.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}


export const RenderSkillsHave = ({skills}) => {
    return (
    <div className="skills-list">
        {skills.map((item, index) => {
            const [ skill, level ] = item; // Destructure the object
            return (
                <span key={index} className="skill-tag">
                    {capitalizeWords(skill)}    {turnIntoEmoji(level)}
                </span>
            );
        })}
    </div>);
}