const PaymentMethod = () => {
    return (
        <div>
            <form>
                <h3>Payment Method :</h3>
                <input type="radio" id="credit_card" value="Credit Card" />
                <label for="credit_card">Credit Card</label>
                <br />
                <input type="radio" id="qr_code" value="QR Code" />
                <label for="qr_code">QR Code</label>
            </form>
        </div>
    );
};

export default PaymentMethod;