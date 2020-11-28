import * as React from "react";
import { MdShoppingCart } from "react-icons/md";
import serializeForm from "form-serialize";
import Heading from "YesterTech/Heading";

interface CheckoutBillingProps {
  onSubmit(fields: ReturnType<typeof serializeForm>): void;
}

const CheckoutBilling: React.FC<CheckoutBillingProps> = function CheckoutBilling({
  onSubmit,
}) {
  const sameAsBilling = false;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = serializeForm(event.target as HTMLFormElement, {
      hash: true,
    });
    onSubmit(fields);
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Billing &amp; Shipping
      </Heading>
      <form onSubmit={handleSubmit} className="spacing" autoComplete="off">
        <Heading as="h2" size={3}>
          Billing Info
        </Heading>
        <hr />
        <div className="form-field">
          <label htmlFor="billing:name">Name</label>
          <input
            id="billing:name"
            type="text"
            name="billingName"
            autoComplete="off"
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input id="billing:address" type="text" name="billingAddress" />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label>
          <input type="checkbox" /> <span>Same as Billing</span>
        </label>

        <div className="spacing">
          <div className="form-field">
            <label htmlFor="shipping:name">Name</label>
            <input
              id="shipping:name"
              type="text"
              name="shippingName"
              autoComplete="off"
            />
          </div>
          <div className="form-field">
            <label htmlFor="shipping:address">Address</label>
            <input
              id="shipping:address"
              type="text"
              name="shippingAddress"
              autoComplete="off"
            />
          </div>
        </div>

        <footer>
          <button type="submit" className="button">
            Submit
          </button>
        </footer>
      </form>
    </div>
  );
};

export default CheckoutBilling;
