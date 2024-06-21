const { crearCarrito, agregarAlCarrito } = require("./carts.repository")

const postCartsService = async (datos) => {// datos viene de postCartsController.
    try {
        const { user_id, product_id, cantidad } = datos
        const carrito = await crearCarrito(user_id)
        const carritoId = carrito.id//id igual que en la bd.

        await agregarAlCarrito(carritoId, product_id, cantidad)
        return { status: 200, message: 'PRODUCTO AGREGADO AL CARRITO CORRECTAMENTE' }

    } catch (error) {
        if (error.status) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR DESCONOCIDO.' }
        }
    }
}
module.exports = { postCartsService }




