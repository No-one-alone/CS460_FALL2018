namespace AuctionHouse.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Bid
    {
        public int ID { get; set; }

        public int ItemID { get; set; }

        public int BuyerID { get; set; }

        public decimal Price { get; set; }

        public DateTime TimeStamp { get; set; }

        public virtual Item Item { get; set; }

        public virtual Buyer Buyer { get; set; }
    }
}
