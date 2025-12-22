import CardScreen from "@/components/ui/card/CardScreen";

export default function ProductPage (){
    return(
        <div className="justify-center items-center flex flex-col m-4">
            <h1 class="h1-style py-12 text-[#9e9957]">Products</h1>
            <div className="flex flex-wrap justify-center mx-120">
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
            </div>
            <button className="button-style bg-[#411D03] text-[#f3ece3] w-35 h-8 rounded-2xl">
                    <p>see more</p>
            </button>
        </div>
    )
}