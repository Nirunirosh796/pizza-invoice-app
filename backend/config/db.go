package config

import (
	"log"
	"pizza_hut/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dsn := "user=postgres password=Niro@1116 dbname=pizzadb sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Failed to connect to database: ", err)
	}

	// ✅ Migrate the schema (AutoMigrate all models)
	err = db.AutoMigrate(
		&models.Pizza{},
		&models.Invoice{},
		&models.InvoiceItem{},
	)
	if err != nil {
		log.Fatal("❌ Failed to auto-migrate database: ", err)
	}

	log.Println("✅ Database connected and migrated successfully")

	// Assign to global variables
	DB = db
	models.DB = db // if you're exposing it in models package
}
