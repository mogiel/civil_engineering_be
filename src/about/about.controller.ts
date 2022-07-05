import {Controller, Get, Res} from '@nestjs/common';
import {Response} from "express";
import * as fs from "fs";

@Controller('about')
export class AboutController {

    @Get('download')
    async downloadPdf(
        @Res() res:Response
    ):Promise<void> {

        try {
            const fileName = 'MATEUSZ_MOGIELSKI.pdf'
            const fileURL = './src/about/download/' + fileName
            const stream = fs.createReadStream(fileURL)
            res.setHeader('Content-Type', 'application/pdf');
            res.attachment(fileName);
            stream.pipe(res)
        } catch (e) {
            res.status(500).end()
        }

    }
}
