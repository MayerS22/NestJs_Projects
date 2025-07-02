import { Controller ,Get} from '@nestjs/common';
import {CpuService} from '../cpu/cpu.service';
import {DiskService} from '../disk/disk.service';


@Controller('computer')
export class ComputerController {
    constructor(private cpuService:CpuService,private diskService:DiskService){}
    @Get()
    run(){
        return [this.cpuService.Compute(1,2),this.diskService.getData()]
    }
}
