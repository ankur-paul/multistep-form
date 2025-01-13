export const stepsText = [
  {
    name: "Your Info",
    heading: "Personal info",
    subheading: "Please provide your name, email address, and phone number",
  },
  {
    name: "select plan",
    heading: "Select your plan",
    subheading: "You have the option of monthly or yearly billing. Arcade",
  },
  {
    name: "add-ons",
    heading: "Pick add-ons",
    subheading: "Add-ons help enhance your gaming experience.",
  },
  {
    name: "summary",
    heading: "Finishing up",
    subheading: "Double-check everything looks OK before confirming.",
  },
];

export function Steps({ step }) {
  return (
    <div className="steps">
      {stepsText.map((stepData, i) => (
        <Step step={step} num={i + 1} key={i}>
          {stepData.name}
        </Step>
      ))}
    </div>
  );
}
function Step({ num, step, children }) {
  return (
    <li className={`step ${num === step ? "active" : ""}`}>
      <div className={`step-num-icon ${num === step ? "active" : ""}`}>
        <span>{num}</span>
      </div>
      <div className="step-description">
        <p className="step-num">step {num}</p>
        <p className="step-name">{children}</p>
      </div>
    </li>
  );
}
