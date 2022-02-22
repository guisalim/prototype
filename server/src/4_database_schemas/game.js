const mongoose = require("mongoose");

module.exports = {
  schema: mongoose.model(
    "games",
    new mongoose.Schema(
      {
        category: { type: String, required: true, default: "" },
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        description: { type: String, default: "" },
        images: [{ type: Object }],
        type: { type: Number, default: 1 },
        tags: [{ type: String, default: [] }],
        author: { type: String, required: true, default: "" },
        replayBundleUrlJson: { type: String, default: "" },
        duration: { type: Number, default: 0 },
        isDownloadable: { type: Boolean, default: false },
        isStreamable: { type: Boolean, default: false },
        isPremiumContent: { type: Boolean, default: false },
        version: { type: String, default: "1.0" },
      },
      { timestamps: { createDate: "created_at", updatedDate: "updated_at" } },
    ),
  ),
};
