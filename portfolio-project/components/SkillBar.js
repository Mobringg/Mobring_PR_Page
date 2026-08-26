export default function SkillBar({ name, level }) {
  return (
    <div className="skill-row">
      <div className="skill-row-head">
        <span className="skill-name">{name}</span>
        <span className="skill-level">{level}</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}
