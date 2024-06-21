const { query } = require("../config/connection.sql")

const crearCarrito = async (user_id) => {
    //Verifico si hay carrito para el usuario, si no lo hay, creo uno.
    try {
        const seleccionarCarrito = 'SELECT * FROM carritos WHERE usuarios_id = ?'
        let carritos = await query(seleccionarCarrito, [user_id])
        if (carritos.length === 0) {
            const insertar = 'INSERT INTO carritos (usuarios_id) VALUES (?)'
            await query(insertar, [user_id])//inserto el carrito.
            carritos = await query(seleccionarCarrito, [user_id])//lo selecciono.
        }
        return carritos[0]//lo retorno
    } catch (error) {        
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS al crear el carrito.' }
    }
}

const agregarAlCarrito = async (cart_id, product_id, cantidad) => {
    //verifico si el producto está en el carrito, si no está lo agrego, si está lo actualizo.
    try {
        const seleccionarProducto = 'SELECT * FROM carritos_productos WHERE carritos_id=? AND productos_id=?'
        const productos = await query(seleccionarProducto, [cart_id, product_id])
        if (productos.length === 0) {
            const insertarProducto = 'INSERT INTO carritos_productos (carritos_id,productos_id,cantidad) VALUES (?,?,?)'
            await query(insertarProducto, [cart_id, product_id, cantidad])
        }
        else {
            const actualizar = 'UPDATE carritos_productos SET cantidad = cantidad+? WHERE carritos_id = ? AND productos_id = ?'
            await query(actualizar, [cantidad, cart_id, product_id])
        }
    } catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
    }
}
module.exports = { crearCarrito, agregarAlCarrito }
