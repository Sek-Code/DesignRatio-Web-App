import AddressPart from "./AddressPart";
import DeliveryChoice from "./DeliveryChoice";
import PaymentMethod from "./PaymentMethod";

const AddressBox = () => {
    return (
        <div className="w-1/5 bg-(--color-cream) px-10 py-7 rounded-2xl flex flex-col justify-start gap-y-5">
            <div>
                <AddressPart />
            </div>
            <div>
                <DeliveryChoice />
            </div>
            <div>
                <PaymentMethod />
            </div>
        </div>
    );
};

export default AddressBox;