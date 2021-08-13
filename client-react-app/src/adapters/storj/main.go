package main

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"storj.io/uplink"
)

const (
	myAccessGrant = "1cCYAHiNyogwPRkZbkpo8C6txEeJ4cktWZoHzwAKTwNzGeAKhXyJZojfb8jSGGFSAc5M3zGgswJQXVEkrJ8na6nj4aeRRdtwvjgGFC5G7kwpwgSYyw6U1AMoqeiWLPMnWHR7tWmktVpPNSzT546P2xfxZTmcTJohRmNfKYNj8cWBboBKx9duocxjxbCGi1RYY4FqRvkw2RKzfS6jA46RY3fYTDGk6F5kidkvjs5orViWRsRyJTmK97SgcvTvfUSVwuy2aRPRuJec"
	myBucket = "cakes"
	myObjectKey = "cakes/cheesecake.jpg"
	myData = "one fish two fish red fish blue fish"
	accessKeyId = "jvb5t2zenb45q5ax2kixybc2pggq"
	secretAccessKey = "jytolnva6gkp3ld22eijxkjlahfiowrqbpu4ygyedh33attodgaa6"

)





// UploadAndDownloadData uploads the data to objectKey in
// bucketName, using accessGrant.
func UploadAndDownloadData(ctx context.Context,
	accessGrant, bucketName, objectKey string,
	data []byte) error {

	// Parse the Access Grant.
	access, err := uplink.ParseAccess(accessGrant)
	if err != nil {
		return fmt.Errorf("could not parse access grant: %v", err)
	}

	// Open up the Project we will be working with.
	project, err := uplink.OpenProject(ctx, access)
	if err != nil {
		return fmt.Errorf("could not open project: %v", err)
	}
	defer project.Close()

	// Ensure the desired Bucket within the Project is created.
	_, err = project.EnsureBucket(ctx, bucketName)
	if err != nil {
		return fmt.Errorf("could not ensure bucket: %v", err)
	}

	// Intitiate the upload of our Object to the specified bucket and key.
	upload, err := project.UploadObject(ctx, bucketName, objectKey, nil)
	if err != nil {
		return fmt.Errorf("could not initiate upload: %v", err)
	}

	// Copy the data to the upload.
	buf := bytes.NewBuffer(data)
	_, err = io.Copy(upload, buf)
	if err != nil {
		_ = upload.Abort()
		return fmt.Errorf("could not upload data: %v", err)
	}

	// Commit the uploaded object.
	err = upload.Commit()
	if err != nil {
		return fmt.Errorf("could not commit uploaded object: %v", err)
	}

	// Initiate a download of the same object again
	download, err := project.DownloadObject(ctx, bucketName, objectKey, nil)
	if err != nil {
		return fmt.Errorf("could not open object: %v", err)
	}
	defer download.Close()

	// Read everything from the download stream
	receivedContents, err := ioutil.ReadAll(download)
	if err != nil {
		return fmt.Errorf("could not read data: %v", err)
	}

	// Check that the downloaded data is the same as the uploaded data.
	if !bytes.Equal(receivedContents, data) {
		return fmt.Errorf("got different object back: %q != %q", data, receivedContents)
	}

	return nil
}

// ? 1. create access grant

func CreateAccessGrant(ctx context.Context, satelliteAddress, apiKey, rootPassphrase string) error {
	access, err1 := uplink.RequestAccessWithPassphrase(ctx, satelliteAddress, apiKey, rootPassphrase)
	if err1 != nil {
		return err1
	}

	// create an access grant for reading bucket "logs"
	permission := uplink.ReadOnlyPermission()
	shared := uplink.SharePrefix{Bucket: "logs"}
	restrictedAccess, err2 := access.Share(permission, shared)
	if err2 != nil {
		return err2
	}

	// serialize the restricted access grant
	jere, err3 := restrictedAccess.Serialize()
	if err3 != nil {
		return err3
	}

	fmt.Println(jere)
	return nil
}


// ? 2. delete access grant




func main() {
	err1 := UploadAndDownloadData(context.Background(),
		myAccessGrant, myBucket, myObjectKey, []byte(myData))
	if err1 != nil {
		log.Fatalln("error:", err1)
	}
	fmt.Println("success!")

	err2 := CreateAccessGrant(context.Background(), "12L9ZFwhzVpuEKMUNUqkaTLGzwY9G24tbiigLiXpmZWKwmcNDDs@eu1.storj.io:7777",
	 "1dfJ6Ph3orLfb3j1MrekHgYseQbVst4ZaScTq4N8B8VPrMgTaQDBe8ZXUBRT2Wdt3biUoKCHfDicJXfvYoxQnb3K4ULbW3Nz52HuZJKLFYCyP7zLvGXt", "x")
	if err2 != nil {
		log.Fatalln("error:", err2)
	}

	fmt.Println("success!")
}