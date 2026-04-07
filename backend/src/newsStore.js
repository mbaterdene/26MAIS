import mongoose from "mongoose";

// News Schema
const newsSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title_mn: { type: String, required: true },
    title_en: { type: String, required: true },
    content_mn: { type: String, required: true },
    content_en: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, default: "news" },
    author: { type: String, default: "Anonymous" },
    status: { type: String, enum: ["draft", "pending", "published"], default: "draft" },
    createdBy: { type: String, default: null },
    approvedBy: { type: String, default: null },
    approvedAt: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const News = mongoose.model("News", newsSchema);

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Transform MongoDB document to include 'id' field
function transformNews(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    id: obj._id.toString(),
  };
}


export async function getNewsByStatus(status) {
  try {
    let results;
    if (status === "all") {
      results = await News.find().sort({ created_at: -1 }).exec();
    } else {
      results = await News.find({ status }).sort({ created_at: -1 }).exec();
    }
    return results.map(transformNews);
  } catch (error) {
    console.error("Error fetching news by status:", error);
    throw error;
  }
}

export async function getAllNews() {
  try {
    const results = await News.find().sort({ created_at: -1 }).exec();
    return results.map(transformNews);
  } catch (error) {
    console.error("Error fetching all news:", error);
    throw error;
  }
}

export async function getNewsById(id) {
  try {
    // Try to find by MongoDB ObjectId if it looks like one, otherwise by slug
    let doc;
    if (mongoose.Types.ObjectId.isValid(id)) {
      doc = await News.findById(id).exec();
    } else {
      doc = await News.findOne({ slug: id }).exec();
    }
    return transformNews(doc);
  } catch (error) {
    console.error("Error fetching news by id:", error);
    throw error;
  }
}

export async function createNews(data) {
  const {
    title_mn,
    title_en,
    content_mn,
    content_en,
    image,
    category,
    author,
    status = "draft",
    createdBy,
  } = data;

  // Validate required fields
  if (!title_mn || !title_en || !content_mn || !content_en) {
    throw new Error("Missing required fields: title_mn, title_en, content_mn, content_en");
  }

  try {
    const slug = generateSlug(title_en);

    const newArticle = new News({
      slug,
      title_mn,
      title_en,
      content_mn,
      content_en,
      image: image || null,
      category: category || "news",
      author: author || "Anonymous",
      status: status || "draft",
      createdBy: createdBy || null,
    });

    const savedArticle = await newArticle.save();
    return transformNews(savedArticle);
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }
}

export async function updateNews(id, data) {
  try {
    const article = await News.findByIdAndUpdate(
      id,
      { ...data, updated_at: new Date() },
      { new: true, runValidators: true }
    ).exec();

    if (!article) {
      throw new Error(`News with id ${id} not found`);
    }

    return transformNews(article);
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
}

export async function deleteNews(id) {
  try {
    const article = await News.findByIdAndDelete(id).exec();

    if (!article) {
      throw new Error(`News with id ${id} not found`);
    }

    return transformNews(article);
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
}

export async function updateNewsStatus(id, newStatus, approverId) {
  try {
    return await updateNews(id, {
      status: newStatus,
      approvedBy: newStatus === "published" ? approverId : null,
      approvedAt: newStatus === "published" ? new Date() : null,
    });
  } catch (error) {
    console.error("Error updating news status:", error);
    throw error;
  }
}

export async function submitForApproval(id) {
  try {
    const article = await getNewsById(id);
    if (!article) {
      throw new Error(`News with id ${id} not found`);
    }
    if (article.status !== "draft") {
      throw new Error("Only draft articles can be submitted for approval");
    }
    return updateNews(id, { status: "pending" });
  } catch (error) {
    console.error("Error submitting for approval:", error);
    throw error;
  }
}

export async function approveNews(id, approverId) {
  try {
    const article = await getNewsById(id);
    if (!article) {
      throw new Error(`News with id ${id} not found`);
    }
    if (article.status !== "pending") {
      throw new Error("Only pending articles can be approved");
    }
    return updateNewsStatus(id, "published", approverId);
  } catch (error) {
    console.error("Error approving news:", error);
    throw error;
  }
}

export async function rejectNews(id) {
  try {
    const article = await getNewsById(id);
    if (!article) {
      throw new Error(`News with id ${id} not found`);
    }
    if (article.status !== "pending") {
      throw new Error("Only pending articles can be rejected");
    }
    return updateNews(id, { status: "draft", approvedBy: null, approvedAt: null });
  } catch (error) {
    console.error("Error rejecting news:", error);
    throw error;
  }
}

export async function searchNews(query) {
  try {
    const lowerQuery = query.toLowerCase();
    const results = await News.find({
      $or: [
        { title_en: { $regex: lowerQuery, $options: "i" } },
        { title_mn: { $regex: lowerQuery, $options: "i" } },
        { author: { $regex: lowerQuery, $options: "i" } },
        { content_en: { $regex: lowerQuery, $options: "i" } },
        { content_mn: { $regex: lowerQuery, $options: "i" } },
      ],
    }).sort({ created_at: -1 }).exec();
    return results.map(transformNews);
  } catch (error) {
    console.error("Error searching news:", error);
    throw error;
  }
}
