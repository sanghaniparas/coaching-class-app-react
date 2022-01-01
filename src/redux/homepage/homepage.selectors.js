import { createSelector } from 'reselect';

const selectHomeData = (state) => state.homePage.homePageData;

export const selectHomeSeos = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_seos
);

export const selectHomesiteSettings = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.site_settings
)

export const selectHomeSliders = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.sliders
);

export const selectHomeShortInfo = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.short_informations
);

//For featured educators
export const selectFeaturedEducators = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_featured_coaching_sections
);

//For exam list All tab data
export const selectHomeExamAllTab = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_all_exam_lists
);

//For exam list other different categories tab
export const selectHomeExamSectionsTab = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_exam_sections
);

//For featured coaching section data
export const selectFeaturedCoaching = createSelector(
  [selectHomeData],
  (homePageData) =>
    Object.keys(homePageData).length > 0 &&
    homePageData.home_page_featured_coaching_sections.length
      ? homePageData.home_page_featured_coaching_sections[0]
          .home_page_featured_coaching_lists
      : ''
);

// For wide range practice  All type
export const selectAllPracticeList = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_wide_range_all_practice_lists
);

//For practice dropdown tag list
export const selectPracticeTagList = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_wide_range_all_practice_tag_lists
);

//For wide range quiz  All type
export const selectAllQuizList = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_wide_range_all_quiz_lists
);

//For quiz dropdown tag list
export const selectQuizTagList = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_wide_range_all_quiz_tag_lists
);

//For practice other types in list
export const selectPracticeSections = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_wide_range_practice_sections
);

//For Quiz other types in list
export const selectQuizSections = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_wide_range_quiz_sections
);

// For getting test package sections
export const selectTestPackageSections = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_test_package_sections
);

// For getting the testimonials
export const selectTestimonials = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_testimonial_lists
);
// For getting the testimonials
export const selectTestimonialImages = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_image_testimonial_lists
);

// For getting blogs &  news data
export const selectBlogsData = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_blog_lists
);
// For getting subfooter
export const selectSubFooter = createSelector(
  [selectHomeData],
  (homePageData) => homePageData.home_page_sub_footer_categories
);
