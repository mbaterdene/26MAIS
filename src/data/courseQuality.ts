/**
 * Course Quality and PDQ data
 * Structured information about course quality assurance, development, and standards
 */

import type { CoursePDQData } from "../lib/api";

// ─── Course Quality PDQ Page ──────────────────────────────────────────────────
export const coursePDQData: CoursePDQData = {
  pdq_page: {
    title_mn: "Хичээлийн чанар",
    title_en: "Course Quality",
    subtitle_mn: "Стандартчилалт ба байнгын сайжруулалт",
    subtitle_en: "Standardization and Continuous Improvement",
    overview_title_mn: "Хичээлийн чанарыг сайжруулах",
    overview_title_en: "Improving Course Quality",
    overview_body_mn:
      "Хичээлийн чанарыг хэмжих, үнэлэх, сайжруулах систем. Сургалтын зорилго, агуулга, үнэлгээний нэгтгэл.",
    overview_body_en:
      "A comprehensive system for measuring, assessing, and improving course quality through curriculum alignment and continuous evaluation.",
    indicators_title_mn: "Гол үзүүлэлтүүд",
    indicators_title_en: "Key Indicators",
    cycle_title_mn: "Хичээлийн хөгжлийн мөчлөг",
    cycle_title_en: "Course Development Cycle",
  },
  teacher_dev: {
    pdq_participation_rate: 78,
    pdq_center_established: "2023-10-01",
    description_mn:
      "Хичээлийн чанар ба арга зүйнээс хамаарч сайжруулалт явуулна.",
    description_en:
      "Course quality improvement through collaborative curriculum review and enhancement.",
  },
  modules: [
    {
      id: 1,
      slug: "curriculum-design",
      title_mn: "Сургалтын төлөвлөлт",
      title_en: "Curriculum Design",
      summary_mn: "Сургалтын зорилго, хүрээ, дарааллаар төлөвлөлт",
      summary_en: "Goal setting, scope definition, and sequencing",
    },
    {
      id: 2,
      slug: "content-development",
      title_mn: "Агуулга хөгжүүлэлт",
      title_en: "Content Development",
      summary_mn: "Сургалтын материал, ресурс, дилгэлцээ",
      summary_en: "Learning materials, resources, and engagement strategies",
    },
    {
      id: 3,
      slug: "assessment-design",
      title_mn: "Үнэлгээний цэвэрлэлт",
      title_en: "Assessment Design",
      summary_mn: "Үнэлгээний арга, норм, цэвэрлэлт",
      summary_en: "Assessment methods, standards, and alignment",
    },
    {
      id: 4,
      slug: "learning-outcomes",
      title_mn: "Суралцалтын үр дүнгийн хүрэх",
      title_en: "Learning Outcomes",
      summary_mn: "Суралцагчийн ахиц хэмжих, өмнөх мэдээлэл авах",
      summary_en: "Measuring student progress and gathering feedback",
    },
  ],
  cycle_steps: [
    {
      id: 1,
      step_number: 1,
      title_mn: "Үнэлэлт",
      title_en: "Review",
      description_mn: "Одоогийн хичээлийн чанар, үр дүнг үнэлэх",
      description_en: "Assess current course quality and student outcomes",
    },
    {
      id: 2,
      step_number: 2,
      title_mn: "Төлөвлөлт",
      title_en: "Plan",
      description_mn: "Сайжруулалтын цэцэг, зорилгыг тодорхойлох",
      description_en: "Identify improvement areas and set goals",
    },
    {
      id: 3,
      step_number: 3,
      title_mn: "Хөгжүүлэлт",
      title_en: "Develop",
      description_mn: "Сургалтын материал, үнэлгээ сайжруулах",
      description_en: "Enhance curriculum, materials, and assessments",
    },
    {
      id: 4,
      step_number: 4,
      title_mn: "Хэрэгжүүлэлт",
      title_en: "Implement",
      description_mn: "Сайжруулалтыг сургалтанд орхуулах",
      description_en: "Roll out improvements in actual courses",
    },
    {
      id: 5,
      step_number: 5,
      title_mn: "Эргүүлэлт",
      title_en: "Iterate",
      description_mn: "Сурагчдын санал, ахиц дээр үндэслэн сайжруулалт",
      description_en: "Refine based on student feedback and outcomes",
    },
  ],
};
