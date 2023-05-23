import { collection, doc, getDocs, setDoc, addDoc } from "firebase/firestore"; 
import { db, auth } from '../../config/firebase';
import { useEffect, useState } from "react";
import { Product } from './product'

export interface Product {
    description: string,
    id: string,
    imageurl: string,
    imageurl2: string,
    price: number,
    price2: number,
    productPrice: number,
    productPrice2: number,
    title: string,
    quantity: number,
    quantity2: number,
    productTitle: string;
    productTitle2: string;
}

export const Products = () => {
    const [productsList, setProductsList] = useState<Product[] | null>(null); 
    const productsRef = collection(db, "products");
    
    const getProducts = async () => {
        const data = await getDocs(productsRef)
        setProductsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Product[]);
    };

    useEffect(() => {
        getProducts();
    }, [])

    return <div className="bg-gray-100 w-screen pt-16">
        {/* <h1> Products Page</h1> */}
            <div className="flex flex-col md:flex-row items-center md:space-x-8 place-content-center">
                {productsList?.map((product) => <Product product={product}/>)}
            </div>
        </div>
};