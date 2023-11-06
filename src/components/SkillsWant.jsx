import {capitalizeWords} from './SkillsHave'

export const RenderSkillsWant = ({skills}) => 

{
    return (
    <div className="skills-list">
        {skills.map((skill, index) => (
            <span key={index} className="skill-tag">
            {capitalizeWords(skill)}
            </span>
        ))}
    </div>)
}