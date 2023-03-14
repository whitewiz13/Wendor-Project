import firebaseApp from '../config/firebaseConfig';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseStorageService {
    private bucket: any;
    constructor() {
        this.bucket = firebaseApp.storage().bucket();
    }

    async uploadFile(file: any): Promise<string> {
        const destination = 'path/to/destination/folder';
        const filename = `${Date.now()}_${file.originalname}`;
        const fileUpload = this.bucket.file(`${destination}/${filename}`);

        const options = {
            metadata: {
                contentType: file.mimetype,
            },
        };

        const stream = fileUpload.createWriteStream(options);
        stream.on('error', (error: any) => {
            throw new Error(`Failed to upload file: ${error}`);
        });

        return new Promise((resolve) => {
            stream.on('finish', () => {
                resolve(`https://firebasestorage.googleapis.com/v0/b/${this.bucket.name}/o/${encodeURIComponent(fileUpload.name)}?alt=media`);
            });

            stream.end(file.buffer);
        });
    }

    async deleteFile() {
        //Implement delete file
        return null;
    }
}