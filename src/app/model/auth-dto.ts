export class GetAuthDto {
    message!: string;
    result!: boolean;
    data!: registerDto;
  }

export class registerDto {
    CustId= 0
    Name!: string
    MobileNo!: string
    Password!: string
}

export class userDto {
  custId!: number
  name!: string
  mobileNo!: string
  password!: string
}

export class GetLoginDto {
    message!: string;
    result!: boolean;
    data!: userDto;
  }

export class loginDto {
    UserName!: string
    UserPassword!: string
  }
  

  // get all register user dto
  export class GetRegisterUsernDto {
    message!: string;
    result!: boolean;
    data!: userDto[];
  }