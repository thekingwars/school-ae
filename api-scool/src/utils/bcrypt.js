  import bcrypt from 'bcrypt'

  export const passwordEncrypt = (password) => {
      const salt = bcrypt.genSaltSync(10);

      return bcrypt.hashSync(password, salt)
  }

  export const comparePassword = (password, passwordBD) => {
      return bcrypt.compareSync(password, passwordBD)
  }