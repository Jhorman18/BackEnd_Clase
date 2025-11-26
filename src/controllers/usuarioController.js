const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    crearUsuario: async (data)  => {
        try {
            if (!data.usuCorreo || !data.usuPassword) {
                const e = new Error("Correo y contraseña son obligatorios");
                e.status = 400;
                throw e;
            }

            const hashPassword = await bcrypt.hash(data.usuPassword, 10);

            const nuevoUsuario = await prisma.usuario.create({
                data:{
                    usuNombres: data.usuNombres,
                    usuCorreo: data.usuCorreo,
                    usuTelefono: data.usuTelefono,
                    usuPassword: hashPassword
                }
            });

            return nuevoUsuario;

        } catch (error) {
            console.error("Error al crear el usuario:", error);
            throw error;
        }
    },

    obtenerUsuarios: async () => {
        try {
            const listarUsuarios = await prisma.usuario.findMany();

            if(listarUsuarios.length <= 0){
                throw new Error('No hay Usuarios Registrados')
            }
            return listarUsuarios;
        } catch (error) {
            console.error('Error al listar usuarios', error);
            throw error
        }
    }
}
