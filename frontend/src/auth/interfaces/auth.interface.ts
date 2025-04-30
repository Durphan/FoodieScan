export interface UserRegister {
  name: string,
  email: string,
  phoneNumber: string,
  password: string,
  dateOfBirth: string
}

export type UserLogin = Omit<UserRegister, "name" | "phoneNumber" | "dateOfBirth">;