const jwt = require('jsonwebtoken')
const prisma = require('../prisma/client')
require('dotenv').config()

const jwtSecret = process.env.JWT_SECRET || 'default_secret'

async function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization']
  if (!authHeader) return res.status(401).json({ message: 'Token no proporcionado' })

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader

  jwt.verify(token, jwtSecret, async (err, payload) => {
    if (err) return res.status(401).json({ message: 'Token inválido o expirado' })

    try {
      const userId = payload.idUsuario
      const foundUser = await prisma.usuario.findUnique({
        where: { idUsuario: userId }
      })

      if (!foundUser) {
        return res.status(403).json({ message: 'Usuario no encontrado' })
      }

      req.user = foundUser
      next()
    } catch (error) {
      console.error('Error al verificar el usuario:', error)
      return res.status(500).json({ message: 'Error al verificar el usuario' })
    }
  })
}

function generateToken(user) {
  const payload = {
    idUsuario: user.idUsuario,
    usuCorreo: user.usuCorreo
  }
  return jwt.sign(payload, jwtSecret, { expiresIn: '3h' })
}

module.exports = { generateToken, verifyToken }