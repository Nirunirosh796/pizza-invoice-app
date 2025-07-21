package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"pizza_hut/config"
	"pizza_hut/models"
)

// Get all pizzas
func GetPizzas(c *gin.Context) {
	var pizzas []models.Pizza
	if err := config.DB.Find(&pizzas).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, pizzas)
}

// Create a new pizza
func CreatePizza(c *gin.Context) {
	var pizza models.Pizza

	if err := c.BindJSON(&pizza); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&pizza).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, pizza)
}



// Update an existing pizza
func UpdatePizza(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var pizza models.Pizza
	if err := c.ShouldBindJSON(&pizza); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	pizza.ID = id
	if err := config.DB.Model(&pizza).Updates(pizza).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Pizza updated successfully"})
}

// Delete a pizza
func DeletePizza(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := config.DB.Delete(&models.Pizza{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Pizza deleted successfully"})
}
