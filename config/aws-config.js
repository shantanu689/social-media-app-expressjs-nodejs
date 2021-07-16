const aws = require('aws-sdk');
const fs = require('fs')
const env = require('../config/environment');
const S3 = require('aws-sdk/clients/s3')

const bucketName = env.aws_bucket_name
const region = env.aws_bucket_region
const accessKeyId = env.aws_access_key
const secretAccessKey = env.aws_secret_access

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

// uploads a file to s3
module.exports.uploadFile = (file) => {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}

// downloads a file from s3
module.exports.getFileStream = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}

module.exports.deleteFile = (fileKey) => {
    return s3.deleteObject({
        Bucket: bucketName,
        Key: fileKey
    }).promise()
}
