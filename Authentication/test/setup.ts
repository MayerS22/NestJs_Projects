import { rm } from "fs/promises";
import { join } from "path";


global.beforeEach(async () => {
    try {
        await rm(join(__dirname, '..', 'test.sqlite'));
    } catch (error) {
        // if the file does not exist, do nothing
    }


});