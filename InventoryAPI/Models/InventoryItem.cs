using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace InventoryAPI.Models
{
    public class InventoryItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; } = string.Empty;

        // New fields
        public string Description { get; set; } = string.Empty;

        // Only allow: "in stock", "low stock", or "out of stock"
        public string Status { get; set; } = "in stock";
    }
}
