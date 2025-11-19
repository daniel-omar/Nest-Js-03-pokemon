import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePookemonDto {

    @IsNumber()
    @IsPositive()
    @Min(1)
    no: number

    @IsString()
    @MinLength(2)
    name: string;
}
