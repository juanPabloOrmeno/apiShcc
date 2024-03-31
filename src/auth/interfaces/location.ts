import { ArrayNotEmpty, IsArray, IsIn, IsNumber, IsString } from "class-validator";

export class LocationType {
    @IsString()
    @IsIn(['Point'])
    type: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    coordinates: number[];
}
