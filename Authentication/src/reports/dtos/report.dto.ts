import { Expose, Exclude , Transform } from 'class-transformer';
import { User } from 'src/users/users.entity';
export class ReportDto{
    @Expose()
    id:number;



    @Expose()
    price:number;

    @Expose()
    make:string;

    @Expose()
    model:string;

    @Expose()
    year:number;

    @Expose()
    lng:number;

    @Expose()
    lat:number;

    @Expose()
    mileage:number;

    @Expose()
    approved:boolean;


    @Transform(({obj}) => obj.user?.id)
    @Expose()
    userID:number;

}