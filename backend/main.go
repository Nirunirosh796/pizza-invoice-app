package main

import (
	"log"
	"pizza_hut/config"
	"pizza_hut/routes"
	"github.com/rs/cors"
	"net/http"
)

func main() {
	// Connect to DB
	config.Connect()

	// Initialize router
	router := routes.SetupRouter()

	// Apply CORS middleware
	handler := cors.AllowAll().Handler(router)

	// Start server
	log.Println("Server started at :8080")
	http.ListenAndServe(":8080", handler)
}
