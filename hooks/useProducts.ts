import { v4 as uuid } from 'uuid'
import { ref, set, get } from 'firebase/database'
import { database } from '../pages/api/firebase'
type IProduct = {
    title: string
    price: string
    category: string
    description: string
    options: string
}

export async function addNewProduct(product: IProduct, image: string) {
    const id = uuid()
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image,
        options: product.options.split(','),
    })
}

export async function getProducts() {
    return get(ref(database, 'products')).then((snapshot) => {
        if (snapshot.exists()) {
            return Object.values(snapshot.val())
        }
        return []
    })
}
