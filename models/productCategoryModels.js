const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

// Enable slug plugin
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const productCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    parent_id: { type: String, default: "" },
    position: { type: Number, default: 0 },
    description: String,
    status: { type: String, default: "active" },
    image: String,
    deleted: { type: Boolean, default: false},
    deletedAt: Date,
    slug: {
      type: String,
      slug: "title",
      unique: true,
      slugPaddingSize: 4,
    },
  },
  {
    timestamps: true,
  }
);
const ProductCategory = mongoose.model(
  "product-category",
  productCategorySchema,

);
module.exports = ProductCategory;
