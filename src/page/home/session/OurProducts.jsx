import CardScreen from "@/components/ui/card/CardScreen"

export default function OurProduct() {
    return (
        <div className="justify-center items-center flex flex-col">
            <h1 class="h1-style py-12 text-[#9e9957]">Our Products</h1>
            <div className="flex flex-wrap justify-center mx-120">
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
            </div>


        </div>
    )
}