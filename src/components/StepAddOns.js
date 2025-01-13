export const addOnsData = [
  {
    id: 1,
    name: "Online service",
    description: "Access to multiplayer games",
    price: 1,
  },
  {
    id: 2,
    name: "Larger storage",
    description: "Extra 1TB of cloud",
    price: 2,
  },
  {
    id: 3,
    name: "Customizable Profile",
    description: "Custom theme on your profile",
    price: 2,
  },
];
export function StepAddOns({ selectedAddOns, onSelectAddOns }) {
  return (
    <div className="form-add-ons">
      {addOnsData.map((addOn) => (
        <AddOn
          id={addOn.id}
          price={addOn.price}
          key={addOn.id}
          onSelectAddOns={onSelectAddOns}
          selectedAddOns={selectedAddOns}
        >
          <div className="add-on--text">
            <p className="add-on--title">{addOn.name}</p>
            <p className="add-on--description">{addOn.description}</p>
          </div>
        </AddOn>
      ))}
    </div>
  );
}
function AddOn({ id, children, price, selectedAddOns, onSelectAddOns }) {
  const isActive = selectedAddOns.find((addOnId) => addOnId === id);

  return (
    <div
      className={`add-on ${isActive ? "active" : ""}`}
      onClick={() => onSelectAddOns(id)}
    >
      <input
        type="checkbox"
        name={id}
        id={id}
        checked={isActive ? true : false}
        readOnly
      />
      {children}
      <span className="add-on--price">
        <span>+</span>
        <span>₹{price}/mo</span>
      </span>
    </div>
  );
}
