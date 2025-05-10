using InventoryAPI.Data;
using InventoryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InventoryController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/inventory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventoryItem>>> GetInventoryItems()
        {
            return await _context.InventoryItems.ToListAsync();
        }

        // GET: api/inventory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InventoryItem>> GetInventoryItem(int id)
        {
            var item = await _context.InventoryItems.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // POST: api/inventory
        //[HttpPost]
        //public async Task<ActionResult<InventoryItem>> PostInventoryItem(InventoryItem item)
        //{
        //    _context.InventoryItems.Add(item);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetInventoryItem), new { id = item.Id }, item);
        //}

        // PUT: api/inventory/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutInventoryItem(int id, InventoryItem item)
        //{
        //    if (id != item.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(item).State = EntityState.Modified;
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        // DELETE: api/inventory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventoryItem(int id)
        {
            var item = await _context.InventoryItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.InventoryItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();


        }
        // POST
        [HttpPost]
        public async Task<ActionResult<InventoryItem>> PostInventoryItem(InventoryItem item)
        {
            item.Status = GetStockStatus(item.Quantity);
            _context.InventoryItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetInventoryItem), new { id = item.Id }, item);
        }

        // PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventoryItem(int id, InventoryItem item)
        {
            if (id != item.Id)
                return BadRequest();

            item.Status = GetStockStatus(item.Quantity); // update status if quantity changes
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Private helper function
        private string GetStockStatus(int quantity)
        {
            if (quantity == 0)
                return "Out of Stock";
            else if (quantity < 5)
                return "Low Stock";
            return "In Stock";
        }

    }
}
