import AddressPart from "./AddressPart";
import DeliveryChoice from "./DeliveryChoice";
import PaymentMethod from "./PaymentMethod";
import { members } from "@/mock-data/userMockData";
import { Card, CardContent } from "@/components/ui/card";

const AddressBox = () => {
    return (
        <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6">
                <AddressPart address={members[0].address} />
                <div className="mt-4">
                    <DeliveryChoice />
                </div>
                <div className="mt-4">
                    <PaymentMethod />
                </div>
            </CardContent>
        </Card>
    );
};

export default AddressBox;