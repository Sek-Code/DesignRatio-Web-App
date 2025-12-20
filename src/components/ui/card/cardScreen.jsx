export default function CardScreen() {
    return (
        <div>
            <div class="flex flex-col items-center w-64 h-114">
                    <img src="/img/tea.jpg" class="w-60 h-60 rounded-tl-[35%] rounded-br-[35%] shadow-lg" />
                    <h3 class="h3-style pt-5 pb-4 text-[#411D03]">Tea</h3>
                    <p class="p-style text-[#411D03] pb-5">Size S │ Size L</p>
                    <div class="flex flex-row gap-5 h3-style text-[#411D03] pb-5">
                        <button class="flex items-center justify-center border border-[#411D03] rounded-full w-8 h-8">
                            <p>-</p>
                        </button>
                        <p>0</p>
                        <button class="flex items-center justify-center border border-[#411D03] rounded-full w-8 h-8">
                            <p>+</p>
                        </button>
                    </div>
                    <button class="button-style bg-[#411D03] text-[#f3ece3] w-35 h-8 rounded-2xl">
                        Add to Cart
                    </button>
                </div>
        </div>
    )
}