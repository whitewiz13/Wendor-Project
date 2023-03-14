import { Module } from '@nestjs/common';
import { FirebaseStorageService } from './firebaseStorage.service';

@Module({
    providers: [FirebaseStorageService],
    exports: [FirebaseStorageService]
})
export class FirebaseStorageModule { }