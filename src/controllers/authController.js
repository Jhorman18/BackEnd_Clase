const bcrypt = require('bcrypt')
const prisma = require('../prisma/client')
const { generateToken } = require('../middleware/authMiddleware')

exports.login = async (req, res) => {
  const { usuCorreo, usuPassword } = req.body || {}
  if (!usuCorreo || !usuPassword) {
    return res.status(400).json({ message: 'usuCorreo y usuPassword requeridos' })
  }

  try {
    const user = await prisma.usuario.findFirst({ where: { usuCorreo } })
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' })

    const match = await bcrypt.compare(usuPassword, user.usuPassword)
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' })

    const token = generateToken(user)
    return res.json({ token })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}