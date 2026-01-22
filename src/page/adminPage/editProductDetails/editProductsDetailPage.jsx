import ProductTable from "./ProductTable";

export default function EditDetailProduct(){
    return(
        <div className="w-full px-[7%] py-12">
            <h1 className="mb-6 font-semibold text-2xl">Edit Products</h1>
            <ProductTable />
        </div>
    );
}
