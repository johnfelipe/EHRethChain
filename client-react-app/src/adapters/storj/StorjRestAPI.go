// !? Server handle HTTP requests
package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
)

// file structure [modules]
// variables
// arrays and slices
// maps
// conditionals
// loops
// ignore a value _
// functions
// errors
// custom types
// pointers

type Article struct {
	Title string `json:"Title"`
	Desc string `json:"desc"`
	Content string `json:"content"`
}

type Articles []Article
 
func allArticles(w http.ResponseWriter, r *http.Request) {

	articles := Articles{
		Article{Title: "Test Title", Desc: "Test Description", Content: "Hello World"},
	}

	fmt.Println("Endpoint Hit: All Articles Endpoint")
	json.NewEncoder(w).Encode(articles)
}

func testPostArticles(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Test POST endpoint worked")
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Homepage  Endpoint Hit")
}

func handleRequests() {

	myRouter := mux.NewRouter().StrictSlash(true)


	myRouter.HandleFunc("/", homePage)
	
	myRouter.HandleFunc("/articles", allArticles).Methods("GET")
	myRouter.HandleFunc("/articles", testPostArticles).Methods("POST")




	log.Fatal(http.ListenAndServe(":8081", myRouter))
}


func main() {
	handleRequests()
}

