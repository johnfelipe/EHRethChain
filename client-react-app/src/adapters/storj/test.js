// // import S3 from "aws-sdk/clients/s3";
// // import storj from "uplink-nodejs";

// const S3 = require("aws-sdk/clients/s3");
// // const storj = require("uplink-nodejs");

// const accessKeyId = "jvb5t2zenb45q5ax2kixybc2pggq";
// const secretAccessKey = "jytolnva6gkp3ld22eijxkjlahfiowrqbpu4ygyedh33attodgaa6";
// const endpoint = "https://gateway.eu1.storjshare.io";

// const s3 = new S3({
//   accessKeyId,
//   secretAccessKey,
//   endpoint,
//   s3ForcePathStyle: true,
//   signatureVersion: "v4",
//   connectTimeout: 0,
//   httpOptions: { timeout: 0 },
// });

// (async () => {
//   const { Buckets } = await s3.listBuckets({}).promise();

//   console.log(Buckets);
// })();

// var bucketParams = { Bucket: "cakes", Key: "cheesecake.jpg" };

// // const run = async () => {
// //   try {
// //     const data = await s3.send(new S3.GetBucketAclCommand(bucketParams));
// //     console.log("Success", data.Grants);
// //     return data; // For unit tests.
// //   } catch (err) {
// //     console.log("Error", err);
// //   }
// // };

// // run();
// // var bucketParams = { Bucket: "cakes" };
// s3.getObjectAcl(bucketParams, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// s3.getb;

// // var AWS = require("aws-sdk");
// // // Set the Region
// // AWS.config.update({ region: "eu-west-2" });

// // // Create S3 service object
// // const s3 = new AWS.S3({
// //   accessKeyId,
// //   secretAccessKey,
// //   endpoint,
// //   s3ForcePathStyle: true,
// //   signatureVersion: "v4",
// //   connectTimeout: 0,
// //   httpOptions: { timeout: 0 },
// // });

// // s3.listBuckets(function (err, data) {
// //   if (err) {
// //     console.log("Error", err);
// //   } else {
// //     console.log("Success", data.Buckets);
// //   }
// // });

// // // ? List Objects in a bucket

// // var bucketParams = { Bucket: "cakes" };

// // s3.listObjects(bucketParams, (err, data) => {
// //   if (err) {
// //     console.log("Error", err);
// //   } else {
// //     console.log("Success", data);
// //     console.log("Success", data.Contents[0].Owner);
// //   }
// // });

// // ? Upload a File to a Bucket

// // ? Create New Bucket

// // var bucketParams = {Bucket: "EHRs"}

// // s3.createBucket(bucketParams, (err, data) => {
// //     if(err) {
// //         console.log('Error', err);
// //     } else {
// //         console.log("Success", data.Location);
// //     }
// // } )

// // ? Delete Bucket
