import { useState } from "react";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div className="accordion-item" key={item.title}>
            <button
              className="accordion-trigger"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span className="accordion-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="accordion-title">{item.title}</span>
              <span className={"accordion-icon" + (isOpen ? " open" : "")}>
                +
              </span>
            </button>
            <div className={"accordion-panel" + (isOpen ? " open" : "")}>
              <div className="accordion-panel-inner">
                {item.paragraphs.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
