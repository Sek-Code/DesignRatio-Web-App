import axios from "axios";
import {  useState } from "react";

export function useProducts() {
    const[products,setProducts] = useState([]);

    const fetchData = async() => {
        try {
            const products = await axios.get("https://fakestoreapi.com/products");
            setProducts(products.data)
        } catch (error) {
            console.log(error);
        }
    }

        fetchData();

    return products;
}