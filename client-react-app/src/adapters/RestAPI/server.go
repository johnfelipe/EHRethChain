package main

import (
	"bytes"
	"context"
	// "encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"io"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	// "os"
	"storj.io/uplink"
	"time"
)

const (
	satelliteAddress = "12L9ZFwhzVpuEKMUNUqkaTLGzwY9G24tbiigLiXpmZWKwmcNDDs@eu1.storj.io:7777"
	APIkey = "1dfJM9eJk2moVshSxL8xa5btQEacjvK4ymm6XRCpNqCcZFgcg5KEZfrJ5v6x21RpGBxVYCti9jbcdxMHp449uLgdoRxwUwS7YvRiwTGfNc2XELBrdgNu"
	
)

var accessGrant *uplink.Access


func makeAccessGrant(ctx context.Context, satelliteAddress, apiKey, rootPassphrase string) error {
	access, err := uplink.RequestAccessWithPassphrase(ctx, satelliteAddress, apiKey, rootPassphrase)
	if err != nil {
		return err
	}

	// Create an access grant for reading bucket "AppBucket"
	permission := uplink.ReadOnlyPermission()
	shared := uplink.SharePrefix{Bucket: "AppBucket"}
	restrictedAccess, err2 := access.Share(permission, shared)
	if err2 != nil {
		return err2
	}

	// Serialise the restricted access grant
	serialisedAccess, err3 := restrictedAccess.Serialize()

	if err3 != nil {
		return err3 
	}
	
	fmt.Println(serialisedAccess)
	accessGrant = access
	return nil
}

func createAppBucket(ctx context.Context, access *uplink.Access) error {
	fmt.Println(access)

	project, err := uplink.OpenProject(ctx, access)
	if err != nil {
		return err 
	}
	// Create App Bucket
	appBucket, err2 := project.CreateBucket(ctx, "app") 
	if err2 != nil {
		return err2 
	} 
	fmt.Println(appBucket.Name, appBucket.Created);
	
	// List Buckets 
	buckets := project.ListBuckets(ctx, nil)
	for buckets.Next() {
    	fmt.Println(buckets.Item().Name)
	}

	if err3 := buckets.Err(); err3 != nil {
    	return err3
	}

	defer project.Close()
	return nil 
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Endpoint called: homePage()")
}

func handleRequests() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homePage).Methods("GET")
	log.Fatal(http.ListenAndServe(":8000", router))
}

// Authenticated User, generates user-specific access grant as follows
// Return: userAccessGrant, salt, error
func UserAccessGrant(appAccess *uplink.Access, userID string) (string, []byte, error) {

	// User Specific Salt
	salt := make([]byte, 16)
	rand.Read(salt)

	now :=  time.Now()
	permission := uplink.FullPermission()

	// 2 minutes leeway to avoid time sync issues with the satellite
	permission.NotBefore = now.Add(-2 * time.Minute)
	permission.NotAfter  = now.Add(8 * time.Hour)
	userPrefix := uplink.SharePrefix{
		Bucket: "app",
		Prefix: userID + "/",
	}

	userAccess, err := appAccess.Share(permission, userPrefix)
	if err != nil {
		return "", salt, err 
	}

	// Serialize the user access  grant
	seralizedAccess, err := userAccess.Serialize()
	if err != nil {
		return "", salt, err
	}

	return seralizedAccess, salt, nil

	

	

}

func main() {
	// handleRequests()
	// makeAccessGrant(context.Background(), satelliteAddress, APIkey, "")

	ctx := context.Background()
	// When initialised the authentication server creates the main application access grant with empty passphrase as follows
	appAccess, _ := uplink.RequestAccessWithPassphrase(ctx, satelliteAddress, APIkey, "")
	permission := uplink.ReadOnlyPermission()
	shared := uplink.SharePrefix{Bucket: "app"}
	restrictedAccess, _ := appAccess.Share(permission, shared)
	// Serialise the restricted access grant
	serialisedAccess, _ := restrictedAccess.Serialize()

	fmt.Println(serialisedAccess)
	userID := "user1"
	userPassphrase := "super secret phrase"

	serializedUserAccess, userSalt, err := UserAccessGrant(appAccess, userID)
	if err != nil {
		fmt.Println("There was an error : %s ", err)
	}
	

	userAccess, err := uplink.ParseAccess(serializedUserAccess)
	if err != nil {
		fmt.Println("There was an error parsing access : %s", err)
	}
	// fmt.Println(serializedUserAccess)
	// add := userAccess.SatelliteAddress()
	// fmt.Println(add)

	saltedUserKey, err := uplink.DeriveEncryptionKey(userPassphrase, userSalt)
	if err != nil {
		fmt.Println("There was an error deriving user encryption key : %s", err)
	}

	err = userAccess.OverrideEncryptionKey("app", userID+"/", saltedUserKey)
	if err != nil {
		fmt.Println("There was an error overiding user derived encryption key : %s", err)
	}

	project, err := uplink.OpenProject(ctx, appAccess)
	if err != nil {
		fmt.Println("There was an error opening project : %s", err)
	}
	defer project.Close()

	// Ensure the desired Bucket within the Project is created.
	// _, err = project.EnsureBucket(ctx, "user1")
	// if err != nil {
	// 	fmt.Errorf("could not ensure bucket: %v", err)
	// }


	// buckets := project.ListBuckets(ctx, nil)
	// for buckets.Next() {
	// 	fmt.Println(buckets.Item().Name)
	// }
	// if err := buckets.Err(); err != nil {
	// 	fmt.Println( err )
	
	// }

	uploadObj, _ := project.UploadObject(ctx, "user1", userID+"/EHR/record1.txt", nil) //&uplink.UploadOptions{Expires: time.Time{}}
	
	fileBytes, ferr := ioutil.ReadFile("./User1EHR1.txt")
	if ferr != nil {
		fmt.Println("There was an error opening file : %s", ferr)
	}

	buf := bytes.NewBuffer(fileBytes)
	_, err = io.Copy(uploadObj, buf)
	if err != nil {
		_ = uploadObj.Abort()
		fmt.Errorf("could not upload data: %v", err)
	}

	// Commit the uploaded object.
	err = uploadObj.Commit()	
	if err != nil {
		fmt.Errorf("could not commit uploaded object: %v", err)
	}

	// // list objects inside app buccket 
	// objects := project.ListObjects(ctx, "app", &uplink.ListObjectsOptions{Prefix: "user1/", Recursive: true})
	// for objects.Next() {
	// 	item := objects.Item()
	// 	fmt.Println(item.IsPrefix, item.Key)
	// }
	// if err := objects.Err(); err != nil {
	// 	fmt.Println( err )
	// }

	





}