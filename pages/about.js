import Accordion from "@/components/Accordion";
import { getSiteContent } from "@/lib/site-content-blob";

export async function getServerSideProps() {
  const { aboutSections } = await getSiteContent();
  return { props: { aboutSections } };
}

export default function About({ aboutSections }) {
  return (
    <section className="section" style={{ paddingTop: 70 }}>
      <div className="shell">
        <p className="section-label">Self Introduction</p>
        <h1 className="section-title">자기소개서</h1>
        <p className="section-desc">
          안녕하십니까? 한국 게임 산업 발전에 기여하고 이름을 남기고 싶은 예비 기획자
          하승엽입니다. 제목을 눌러 각 항목을 펼쳐볼 수 있습니다.
        </p>
        <Accordion items={aboutSections} />
      </div>
    </section>
  );
}
