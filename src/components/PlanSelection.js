export const cardData = [
  {
    name: "arcade",
    image: "./images/icon-arcade.svg",
    monthlyPrice: 7,
    yearlyPrice: 70,
  },
  {
    name: "advanced",
    image: "./images/icon-advanced.svg",
    monthlyPrice: 12,
    yearlyPrice: 120,
  },
  {
    name: "pro",
    image: "./images/icon-pro.svg",
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
];
export function PlanSelection({
  step,
  onStepChange,
  selectedPlan,
  onSelectPlan,
  toggleValue,
  onToggle,
}) {
  return (
    <div className="select-plan">
      <div className="plan-cards-and-toggle">
        <div className="plan-cards">
          {cardData.map((card) => (
            <PlanCard
              toggleValue={toggleValue}
              onToggle={onToggle}
              cardImage={card.image}
              cardName={card.name}
              selectedPlan={selectedPlan}
              onSelectPlan={onSelectPlan}
              cardPrice={
                toggleValue === "monthly"
                  ? `₹${card.monthlyPrice}/mo`
                  : `₹${card.yearlyPrice}/yr`
              }
              key={card.name}
            />
          ))}
        </div>
        <ToggleSwitch toggleValue={toggleValue} onToggle={onToggle} />
      </div>
    </div>
  );
}
function PlanCard({
  cardImage,
  cardName,
  toggleValue,
  onToggle,
  cardPrice,
  selectedPlan,
  onSelectPlan,
}) {
  function handleClick() {
    console.log(toggleValue);
    const plan =
      toggleValue === "monthly" ? cardName + " Monthly" : cardName + " Yearly";
    onSelectPlan(plan);
  }
  return (
    <div
      className={`plan-card arcade ${cardName} ${
        selectedPlan?.includes(cardName) ? "active" : ""
      }`}
      onClick={handleClick}
    >
      <div className="image">
        <img src={cardImage} alt="arcade" />
      </div>
      <div className="card-text">
        <p className="card--name">{cardName}</p>
        <p className="card--price">{cardPrice}</p>
        {toggleValue === "yearly" && (
          <p className="discount-message">2 months free</p>
        )}
      </div>{" "}
    </div>
  );
}
function ToggleSwitch({ toggleValue, onToggle }) {
  return (
    <div className="toggle">
      <div className="toggle-switch-and-content">
        <span className="monthly">monthly</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            value={toggleValue}
            checked={toggleValue === "yearly" ? true : false}
            onChange={(e) => onToggle(e.target.value)}
          />
          <span className="slider"></span>
        </label>
        <span className="yearly">yearly</span>
      </div>
    </div>
  );
}
