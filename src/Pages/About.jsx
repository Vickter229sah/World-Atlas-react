import countryFacts from '../api/countryData.json';

export const About = () => {
  return (
    <section className="section-about container">
      <h2 className="container-title">
        Here are some Interesting Facts <br />
        We are Proud of ................
      </h2>
      <div className="gradient-cards">
        {countryFacts.map(({ id, countryName, capital, population, interestingFact }) => (
          <div className="holographic-card-container" key={id}>
            {/* Holographic Card */}
            <div className="holographic-card">
              <div className="container-card bg-blue-box">
                {/* Information inside the card */}
                <p className="card-title">{countryName}</p>
                <p>
                  <span className="card-description">Capital:</span> {capital}
                </p>
                <p>
                  <span className="card-description">Population:</span> {population.toLocaleString()}
                </p>
                <p>
                  <span className="card-description">Interesting Fact:</span> {interestingFact}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
