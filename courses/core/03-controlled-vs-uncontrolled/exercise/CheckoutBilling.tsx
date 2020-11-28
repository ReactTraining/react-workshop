import * as React from "react";
import { MdShoppingCart } from "react-icons/md";
import serializeForm from "form-serialize";
import Heading from "YesterTech/Heading";

interface CheckoutBillingProps {
  onSubmit(...args: any): void;
}

const CheckoutBilling: React.FC<CheckoutBillingProps> = function CheckoutBilling({
  onSubmit,
}) {
  const [sameAsBilling, setSameAsBilling] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // When the fields are stored in state above, this fields variable can just be
    // an object filled with the field states. We don't need `serializeForm` anymore
    const fields = serializeForm(event.target as HTMLFormElement, {
      hash: true,
    });
    onSubmit(sameAsBilling, fields);
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Billing &amp; Shipping
      </Heading>
      <form onSubmit={handleSubmit} className="spacing">
        <Heading as="h2" size={3}>
          Billing Info
        </Heading>
        <hr />
        <div className="form-field">
          <label htmlFor="billing:name">Name</label>
          <input
            id="billing:name"
            type="text"
            required
            name="billingName"
            autoComplete="off"
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input
            id="billing:address"
            type="text"
            required
            name="billingAddress"
          />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label>
          <input
            type="checkbox"
            defaultChecked={sameAsBilling}
            onChange={() => setSameAsBilling(!sameAsBilling)}
          />{" "}
          Same as Billing
        </label>

        <div className="form-field">
          <label htmlFor="shipping:name">Name</label>
          <input
            id="shipping:name"
            type="text"
            required
            name="shippingName"
            autoComplete="off"
          />
        </div>
        <div className="form-field">
          <label htmlFor="shipping:address">Address</label>
          <input
            id="shipping:address"
            type="text"
            required
            name="shippingAddress"
            autoComplete="off"
          />
        </div>

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckoutBilling;

// 👀
type Fields = {
  billingName: string;
  billingAddress: string;
  shippingName: string;
  shippingAddress: string;
};
