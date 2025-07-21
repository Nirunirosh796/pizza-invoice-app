package models

import "gorm.io/gorm"

var DB *gorm.DB

type Invoice struct {
	gorm.Model
	Items      []InvoiceItem `json:"items" gorm:"foreignKey:InvoiceID"`
	Total      float64       `json:"total"`
	Tax        float64       `json:"tax"`
	GrandTotal float64       `json:"grand_total"`
}

type InvoiceItem struct {
	gorm.Model
	InvoiceID uint    `json:"invoice_id"`
	ItemID    uint    `json:"item_id"`
	Name      string  `json:"name"`
	Price     float64 `json:"price"`
	Quantity  int     `json:"quantity"`
	Subtotal  float64 `json:"subtotal"`
}
