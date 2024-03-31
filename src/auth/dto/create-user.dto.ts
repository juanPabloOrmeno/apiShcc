import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {

    @IsOptional()
    @IsString()
    _id: string;

    @IsString()
    @MinLength(9)
    @MaxLength(10)
    rut: string;

    @IsString()
    email: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    nombre: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;


    @IsOptional()
    @IsString()
    rol: string;
    

}