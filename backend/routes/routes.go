package routes

import (
	"github.com/gin-gonic/gin"
	"pizza_hut/controllers"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/favicon.ico", func(c *gin.Context) {
		c.Status(204)
	})

	r.GET("/pizzas", controllers.GetPizzas)
	r.POST("/pizzas", controllers.CreatePizza)
	r.PUT("/pizzas/:id", controllers.UpdatePizza)
	r.DELETE("/pizzas/:id", controllers.DeletePizza)
	r.POST("/invoices", controllers.CreateInvoice)
	r.GET("/invoices", controllers.GetInvoices)

	return r
}
