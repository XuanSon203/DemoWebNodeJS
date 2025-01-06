const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

// Kích hoạt plugin slug
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    description: String,
    status: String,
    product_category_id: {
      type: String,
      default: ""
    },
    image: String,
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
    slug: {
      type: String,
      slug: "name",
      unique: true,
      slugPaddingSize: 4,
    },
    createdBy: {
      account_id: String,
      createdAt: {
        type: String,
        default: Date.now
      }
    },
    position: String,
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("products", productSchema);
module.exports = product;
