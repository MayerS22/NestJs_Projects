import { IsString, IsNumber, Min, Max } from "class-validator";
import { Transform } from "class-transformer";
export class GetEstimateDto{
    
    @IsString()
    make:string;


    @IsString()
    model:string;


    @Transform(({value}) => parseInt(value))
    @Min(1990)
    @Max(2025)
    @IsNumber()
    year:number;
    
    
    @Transform(({value}) => parseFloat(value))
    @Min(0)
    @Max(1000000)
    @IsNumber()
    lng:number;

    @Transform(({value}) => parseFloat(value))
    @Min(0)
    @Max(1000000)
    @IsNumber()
    lat:number;

    
    @Transform(({value}) => parseFloat(value))
    @Min(0)
    @Max(1000000)
    @IsNumber()
    mileage:number;
}