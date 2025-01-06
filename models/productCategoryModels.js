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
    slug: {
      type: String,
      slug: "title",
      unique: true,
      slugPaddingSize: 4,
    },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    },
    deletedBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
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
