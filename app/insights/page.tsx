import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights on Indian Green Coffee",
  description: "Practical articles on Indian coffee origins, processing methods and green coffee specifications for international buyers.",
  alternates: { canonical: "/insights" },
};

const insights = [
  {
    number: "01",
    title: "Why Indian coffee is closely connected to shade",
    summary: "Much of India’s coffee is cultivated beneath a layered shade canopy. The system is associated with the coffee landscapes of Karnataka, Kerala, and Tamil Nadu, where farms may also grow pepper and other companion crops.",
    points: [
      "Karnataka is the country’s principal coffee-growing state.",
      "Chikkamagalur and Kodagu are widely recognised coffee-producing districts.",
      "Elevation, rainfall, shade, variety, and processing all influence the final lot.",
    ],
  },
  {
    number: "02",
    title: "Washed, natural, and monsooned preparations",
    summary: "Preparation changes both the physical appearance of green coffee and the way buyers evaluate a lot. Indian export catalogues commonly distinguish washed plantation coffee, natural cherry coffee, and monsooned grades.",
    points: [
      "Washed coffee is pulped and processed before drying.",
      "Natural or cherry coffee dries with the fruit around the seed.",
      "Monsooned coffee is conditioned by moist monsoon winds on India’s west coast.",
    ],
  },
  {
    number: "03",
    title: "What to request before confirming a green coffee lot",
    summary: "A grade name is only the beginning of a useful procurement discussion. Buyers should align the commercial confirmation with the actual lot specification and destination requirements.",
    points: [
      "Origin, crop or lot reference, and preparation method.",
      "Moisture, screen retention, and defect tolerance.",
      "Packing format, liner preference, quantity, and shipment terms.",
    ],
  },
];

export default function InsightsPage() {
  return <main id="main">
    <section className="page-hero insights-hero">
      <img src="/images/insights-indian-coffee.jpg" alt="Ripe coffee cherries under shade in the Western Ghats" />
      <div className="page-hero-content">
        <p className="kicker">Field notes for buyers</p>
        <h1>Insights into Indian coffee.</h1>
        <p>Clear introductions to origin, preparation, grading, and the information behind an export-ready lot.</p>
      </div>
    </section>
    <section className="section insights-intro">
      <div className="section-head">
        <span className="section-no">INDIA / GREEN COFFEE</span>
        <h2>Useful context before the specification request.</h2>
      </div>
      <div className="insights-grid">
        {insights.map(article =>
          <article className="insight-card reveal" key={article.number}>
            <span className="insight-number">{article.number}</span>
            <p className="kicker">Buyer insight</p>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <ul>{article.points.map(point => <li key={point}>{point}</li>)}</ul>
          </article>
        )}
      </div>
      <aside className="insights-note">
        <p className="kicker">A note on procurement</p>
        <p>General origin and processing information supports evaluation, but the confirmed contract specification should govern every purchase.</p>
      </aside>
    </section>
  </main>;
}