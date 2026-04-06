import { News, getNextNewsId } from "./models/News.js";

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function getNewsByStatus(status) {
  try {
    if (status === "all") {
      return await News.find().sort({ created_at: -1 }).lean();
    }
    return await News.find({ status }).sort({ created_at: -1 }).lean();
  } catch (error) {
    console.error("Error fetching news by status:", error);
    throw error;
  }
}

export async function getAllNews() {
  try {
    return await News.find().sort({ created_at: -1 }).lean();
  } catch (error) {
    console.error("Error fetching all news:", error);
    throw error;
  }
}

export async function getNewsById(id) {
  try {
    return await News.findOne({ id }).lean();
  } catch (error) {
    console.error("Error fetching news by ID:", error);
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
    const id = await getNextNewsId();
    const slug = generateSlug(title_en);
    const now = new Date().toISOString();

    const newArticle = new News({
      id,
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
      approvedBy: null,
      approvedAt: null,
      created_at: now,
      updated_at: now,
    });

    const saved = await newArticle.save();
    return saved.toObject();
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }
}

export async function updateNews(id, data) {
  try {
    const existing = await News.findOne({ id });
    if (!existing) {
      throw new Error(`News with id ${id} not found`);
    }

    const updated = await News.findOneAndUpdate(
      { id },
      {
        ...data,
        updated_at: new Date().toISOString(),
      },
      { new: true, lean: true }
    );

    return updated;
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
}

export async function deleteNews(id) {
  try {
    const deleted = await News.findOneAndDelete({ id }, { lean: true });
    if (!deleted) {
      throw new Error(`News with id ${id} not found`);
    }
    return deleted;
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
}

export async function updateNewsStatus(id, newStatus, approverId) {
  try {
    const updated = await updateNews(id, {
      status: newStatus,
      approvedBy: newStatus === "published" ? approverId : null,
      approvedAt: newStatus === "published" ? new Date().toISOString() : null,
    });
    return updated;
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
    // Use text search if possible, fallback to regex
    const newsResults = await News.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .lean();

    if (newsResults.length > 0) {
      return newsResults;
    }

    // Fallback to regex search
    const regex = new RegExp(query, "i");
    return await News.find({
      $or: [
        { title_mn: regex },
        { title_en: regex },
        { author: regex },
        { content_mn: regex },
        { content_en: regex },
      ],
    })
      .sort({ created_at: -1 })
      .lean();
  } catch (error) {
    console.error("Error searching news:", error);
    throw error;
  }
}
