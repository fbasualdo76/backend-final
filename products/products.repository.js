const { query } = require("../config/connection.sql")

const insertarProducto = async ({ titulo, imagen, descripcion, stock, precio, codigo }) => {

    try {
        const insertar = 'INSERT INTO productos (titulo,imagen,descripcion,stock,precio,codigo) VALUES (?,?,?,?,?,?)'
        const valores = [titulo, imagen, descripcion, stock, precio, codigo]
        const resultadoInsertar = await query(insertar, valores)
        return resultadoInsertar.insertId//retorno el id del producto insertado.
    } catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
    }
}

const seleccionarProductoPorId = async (pid) => {
    try {
        const seleccionar = 'SELECT * FROM productos WHERE id = ?'
        const resultadoSeleccionar = await query(seleccionar, [pid])
        //console.log(resultadoSeleccionar)
        if (resultadoSeleccionar.length === 0) {
            throw { status: 404, message: 'PRODUCTO CON ID ' + pid + ' NO ENCONTRADO' }
        }
        else {
            return resultadoSeleccionar[0]
        }
    } catch (error) {
        if (error.status === 404) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
        }
    }
}

const eliminarProductoPorId = async (pid) => {
    try {
        //console.log(pid)
        const eliminar = 'DELETE FROM productos WHERE id = ?'
        const resultadoEliminar = await query(eliminar, [pid])
        //console.log(resultadoEliminar)
        if (resultadoEliminar.affectedRows === 0) {
            throw { status: 404, message: 'PRODUCTO CON ID ' + pid + ' NO ENCONTRADO' }
        }
        else {
            return { status: 200, message: 'PRODUCTO CON ID ' + pid + ' ELIMINADO CORRECTAMENTE' }
        }

    } catch (error) {
        if (error.status === 404) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
        }
    }
}

const seleccionarTodosLosProductos = async () => {
    try {
        const seleccionarTodos = 'SELECT * FROM productos'
        const resultadoSeleccionarTodos = await query(seleccionarTodos)
        return resultadoSeleccionarTodos
    } catch (error) {
        if (error.status === 404) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
        }
    }
}

const modificarProductoPorId = async (pid, producto) => {
    const { titulo, imagen, descripcion, stock, precio, codigo } = producto
    try {
        const modificar = 'UPDATE productos SET titulo = ?, imagen = ?, descripcion = ?, stock = ?, precio = ?, codigo = ? WHERE id = ?'
        const valores = [titulo, imagen, descripcion, stock, precio, codigo, pid]
        const resultadoModificar = await query(modificar, valores)
        if (resultadoModificar.affectedRows === 0) {
            throw { status: 404, message: 'PRODUCTO CON ID ' + pid + ' NO ENCONTRADO' }
        }
        /*else {
            return { status: 200, message: 'PRODUCTO CON ID ' + pid + ' MODIFICADO CORRECTAMENTE' }
        }*/
    } catch (error) {
        if (error.status === 404) {
            throw error
        }
        else {

            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
        }
    }
}
module.exports = { insertarProducto, seleccionarProductoPorId, eliminarProductoPorId, seleccionarTodosLosProductos, modificarProductoPorId }