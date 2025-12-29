const AddressBox = () => {
    return (
        <div className="w-1/5 bg-(--color-cream) px-10 py-7 rounded-2xl flex flex-col justify-start gap-y-5">
            <div>
                <h3>Address :</h3>
                <p>address from profile</p>
                <hr />
                <p>address from profile</p>
                <hr />
            </div>
            <div>
                <h3>Delivery :</h3>
                <input type="radio" id="postTH" value="Post Thailand" />
                <label for="postTH">Post Thailand + 40THB</label>
                <br />
                <input type="radio" id="kex" value="KEX" />
                <label for="kex">KEX + 60THB</label>
                <br />
                <input type="radio" id="shopee" value="Shopee Express" />
                <label for="shopee">Shopee Express + 60THB</label>
            </div>
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
        </div>
    );
};

export default AddressBox;