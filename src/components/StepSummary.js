import { cardData } from "./PlanSelection";
import { addOnsData } from "./StepAddOns";

export function StepSummary({
  toggleValue,
  onStepChange,
  selectedPlan,
  selectedAddOns,
}) {
  const planName = selectedPlan.split(" ")[0].toLowerCase();
  const plan = cardData.find((plan) => plan.name === planName);
  const planPrice = plan[toggleValue + "Price"];

  function finalPrice() {
    let addOnsPrice = 0;
    for (let i = 0; i < selectedAddOns.length; i++) {
      const price = addOnsData.find(
        (addOn) => addOn.id === selectedAddOns[i]
      )?.price;

      if (price) addOnsPrice += price;
    }

    addOnsPrice = toggleValue === "monthly" ? addOnsPrice : addOnsPrice * 10;

    return planPrice + addOnsPrice;
  }

  return (
    <div className="summary">
      <div className="summary-container">
        <div className="summary--plan">
          <div className="summary--plan-name-and-change">
            <span className="summary--plan-name">
              {planName} ({toggleValue})
            </span>
            <span
              className="summary--change-plan"
              onClick={() => onStepChange(2)}
            >
              change
            </span>
          </div>
          <p className="summary--plan-price">
            ₹{planPrice}
            {toggleValue === "monthly" ? "/mo" : "/yr"}
          </p>
        </div>
        <div className="summary--add-ons">
          {selectedAddOns.map((addOnId) => (
            <SummaryAddOn
              toggleValue={toggleValue}
              id={addOnId}
              key={addOnId}
            />
          ))}
        </div>
      </div>
      <div className="final-price">
        <p className="final-price--label">
          Total (per {toggleValue === "monthly" ? "month" : "year"})
        </p>
        <p className="final-price--value">
          ₹ {finalPrice()}
          {toggleValue === "monthly" ? "/mo" : "/yr"}
        </p>
      </div>
    </div>
  );
}
function SummaryAddOn({ toggleValue, id }) {
  const addOn = addOnsData.find((addOn) => addOn.id === id);
  return (
    <div className="summary--add-on">
      <p className="summary--add-on-name">{addOn.name}</p>
      <p className="summary--ad-on-price">
        <span>+</span>
        <span>
          ₹
          {toggleValue === "monthly"
            ? `${addOn.price}/mo`
            : `${addOn.price * 10}/yr`}
        </span>
      </p>
    </div>
  );
}
