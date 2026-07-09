import { useState } from "react";
import { SITE } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <section className="section" style={{ paddingTop: 70 }}>
      <div className="shell">
        <p className="section-label">Contact</p>
        <h1 className="section-title">연락처</h1>
        <p className="section-desc">
          함께 이야기 나눌 기회가 있다면 언제든 편하게 연락 주세요.
        </p>

        <div className="contact-card">
          <a href={`mailto:${SITE.email}`} className="contact-email">
            {SITE.email}
          </a>
          <button className="contact-copy-btn" onClick={handleCopy}>
            {copied ? "복사됨 ✓" : "이메일 복사"}
          </button>
        </div>

        <div className="contact-channels">
          <div className="channel-card">
            <div className="channel-label">Position</div>
            <div className="channel-value">{SITE.role}</div>
          </div>
          <div className="channel-card">
            <div className="channel-label">Response</div>
            <div className="channel-value">이메일로 연락 주시면 빠르게 답변드립니다</div>
          </div>
        </div>
      </div>
    </section>
  );
}
