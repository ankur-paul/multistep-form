import { useState } from "react";
import { stepsText } from "./Steps";
import { Form } from "./Form";
import { PlanSelection } from "./PlanSelection";
import { Steps } from "./Steps";
import { StepAddOns } from "./StepAddOns";
import { StepSummary } from "./StepSummary";

export default function App() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [selectedPlan, setSelectedPlan] = useState("advanced");

  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const [toggleValue, setToggleValue] = useState("monthly");
  function handleToggle(value) {
    const newToggleValue = value === "monthly" ? "yearly" : "monthly";
    setToggleValue(newToggleValue);
  }

  function handleSelectPlan(plan) {
    setSelectedPlan(plan);
  }

  function handleSelectAddOns(id) {
    const isSelected = selectedAddOns.find((addOnId) => addOnId === id);

    if (isSelected)
      setSelectedAddOns((cur) => [...cur.filter((addOnId) => addOnId !== id)]);
    else setSelectedAddOns((cur) => [...cur, id]);
  }

  return (
    <MultiStepForm
      formValues={formValues}
      setFormValues={setFormValues}
      selectedPlan={selectedPlan}
      onSelectPlan={handleSelectPlan}
      selectedAddOns={selectedAddOns}
      onSelectAddOns={handleSelectAddOns}
      toggleValue={toggleValue}
      onToggle={handleToggle}
    />
  );
}

function MultiStepForm({
  formValues,
  setFormValues,
  selectedPlan,
  onSelectPlan,
  selectedAddOns,
  onSelectAddOns,
  toggleValue,
  onToggle,
}) {
  const [step, setStep] = useState(1);
  function handleStepChange(step) {
    setStep(step);
  }

  function submitForm() {
    return <div>thank you</div>;
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Steps step={step} />
      </div>

      <div className="main-form">
        <Main
          step={step}
          heading={step < 5 && stepsText[step - 1].heading}
          subHeading={step < 5 && stepsText[step - 1].subheading}
          onStepChange={handleStepChange}
          formValues={formValues}
          setFormValues={setFormValues}
          selectedPlan={selectedPlan}
          onSelectPlan={onSelectPlan}
          selectedAddOns={selectedAddOns}
          onSelectAddOns={onSelectAddOns}
          toggleValue={toggleValue}
          onToggle={onToggle}
          submitForm={submitForm}
        />
      </div>
    </div>
  );
}

function Main({
  step,
  heading,
  subHeading,
  onStepChange,
  formValues,
  setFormValues,
  selectedPlan,
  onSelectPlan,
  selectedAddOns,
  onSelectAddOns,
  toggleValue,
  onToggle,
  submitForm,
}) {
  if (step === 5) return <EndForm />;
  return (
    <div className="main">
      <h2 className="heading">{heading}</h2>
      <p className="subheading">{subHeading}</p>
      {step === 1 && (
        <Form
          step={step}
          onNextStep={onStepChange}
          formValues={formValues}
          setFormValues={setFormValues}
        />
      )}
      {step === 2 && (
        <PlanSelection
          step={step}
          selectedPlan={selectedPlan}
          onSelectPlan={onSelectPlan}
          onStepChange={onStepChange}
          toggleValue={toggleValue}
          onToggle={onToggle}
        />
      )}

      {step === 3 && (
        <StepAddOns
          selectedAddOns={selectedAddOns}
          onSelectAddOns={onSelectAddOns}
        />
      )}

      {step === 4 && (
        <StepSummary
          onStepChange={onStepChange}
          selectedAddOns={selectedAddOns}
          selectedPlan={selectedPlan}
          toggleValue={toggleValue}
        />
      )}

      {step > 1 && (
        <Button
          step={step}
          onStepChange={onStepChange}
          submitForm={step === 4 ? submitForm : ""}
        />
      )}
    </div>
  );
}

function EndForm() {
  return (
    <div className="end-form">
      <img src="./images/icon-thank-you.svg" alt="check-mark" />
      <p className="thank-you">Thank You!</p>
      <p className="end-info">
        {" "}
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}

export function Button({ step, onStepChange, submitForm }) {
  return (
    <div className="nav-btns">
      {step === 1 ? (
        <span></span>
      ) : (
        <span onClick={() => onStepChange(step - 1)}> Go Back</span>
      )}

      <button onClick={() => onStepChange(step + 1)}>
        {step === 4 ? "Confirm" : "Next Step"}
      </button>
    </div>
  );
}
