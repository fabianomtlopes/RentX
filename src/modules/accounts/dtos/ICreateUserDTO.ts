interface ICreateUserDTO {
  id?: string;
  name: string;
  password: string;
  email: string;
  driver_license: string;
  // isAdmin: boolean;
  avatar?: string;
}

export { ICreateUserDTO };
