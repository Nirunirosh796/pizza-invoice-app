package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"pizza_hut/models"
)

func CreateInvoice(c *gin.Context) {
	var invoice models.Invoice

	if err := c.ShouldBindJSON(&invoice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// calculate totals
	var total float64
	for i := range invoice.Items {
		invoice.Items[i].Subtotal = invoice.Items[i].Price * float64(invoice.Items[i].Quantity)
		total += invoice.Items[i].Subtotal
	}

	invoice.Total = total
	invoice.Tax = total * 0.1 // 10% tax
	invoice.GrandTotal = total + invoice.Tax

	// Save to DB with associations
	if err := models.DB.Create(&invoice).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save invoice"})
		return
	}

	c.JSON(http.StatusOK, invoice)
}

func GetInvoices(c *gin.Context) {
	var invoices []models.Invoice
	if err := models.DB.Preload("Items").Find(&invoices).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch invoices"})
		return
	}
	c.JSON(http.StatusOK, invoices)
}
