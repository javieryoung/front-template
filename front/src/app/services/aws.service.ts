import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AwsService {

    constructor() { }

    uploadFile(file, file_name, credentials) {
        const contentType = file.type;
        let s3params:any = {
            accessKeyId: credentials['accessKey'],
            secretAccessKey: credentials['accessToken'],
            region: 'us-east-2'
        }
        if (credentials['accessSessionToken'] != 'permanent') {
            s3params.sessionToken = credentials['accessSessionToken'];
        }
        const bucket = new S3(s3params);
        const params = {
            Bucket: environment.bucket,
            Key: file_name,
            Body: file,
            ACL: 'public-read',
            ContentType: contentType
        };
        /*
        UPLOAD WITHOUT PROGRESS
        bucket.upload(params, function (err, data) {
            if (err) {
                console.log('There was an error uploading your file: ', err);
                return false;
            }
            console.log('Successfully uploaded file.', data);
            return true;
        });
        */
        //for upload progress   
        let s = new Subject();
        bucket.upload(params).on('httpUploadProgress', function (evt) {
            s.next(evt);
        }).send(function (err, data) {
            if (err) {
                console.log('There was an error uploading your file: ', err);
                return false;
            }
            s.next('completed');
            return true;
        });
        return s;
    }

}
