export const Language = [
  { id: '', label: 'All' },
  { id: '1', label: 'English' },
  { id: '2', label: 'Hindi' },
];

export const SortByCoaching = [
  { id: '1', label: 'Trending' },
  { id: '2', label: 'Popular' },
  { id: '3', label: 'Highest Rated' },
  { id: '4', label: 'Newly Added' },
];

export const SortByQuiz = [
  { id: '1', label: 'Daily Quiz' },
  { id: '2', label: 'Popularity' },
  { id: '3', label: 'Highest Rated' },
  { id: '4', label: 'Newest Arrival ' },
  { id: '5', label: 'Trending' },
  { id: '6', label: 'Most Attempted' },
];

export const SortByPractice = [
  { id: '1', label: 'Popularity' },
  { id: '2', label: 'Highest Rated' },
  { id: '3', label: 'Newest Arrival ' },
  { id: '4', label: 'Trending' },
  { id: '5', label: 'Best Selling' },
  { id: '6', label: 'Most Attempted' },
];

export const SortByPackage = [
  { id: '1', label: 'Popularity' },
  { id: '2', label: 'Highest Rated' },
  { id: '3', label: 'Newest Arrival ' },
  { id: '4', label: 'Trending' },
  { id: '5', label: 'Most Attempted' },
];

export const RatingQuizCoaching = [
  { id: 'quiz', label: 'Quiz' },
  { id: 'coaching', label: 'Coaching' }
];

export const RatingPracticeCoaching = [
  { id: 'practice', label: 'Practice' },
  { id: 'coaching', label: 'Coaching' },
];

export const RatingPackageCoaching = [
  { id: 'package', label: 'Package' },
  { id: 'coaching', label: 'Coaching' },
];

export const RatingStar = [
  { id: '4-star', imageSrc: '4star' },
  { id: '3-star', imageSrc: '3star' },
  { id: '2-star', imageSrc: '2star' },
  { id: '1-star', imageSrc: '1star' },
];

export const RATINGCHOICE = {
  COACHING: 'coaching',
  QUIZ: 'quiz',
  PRACTICE: 'practice',
  PACKAGE: 'package',
};

export const PriceRange = [
  { id: '1', label: 'Discount' },
  { id: '2', label: 'Low to High' },
  { id: '3', label: 'High to Low' },
];

export const AllTest = [
  { id: '450', label: 'All Test (450+)' },
  { id: '400', label: 'All Test (400+)' },
  { id: '350', label: 'All Test (350+)' },
  { id: '300', label: 'All Test (300+)' },
  { id: '250', label: 'All Test (250+)' },
  { id: '200', label: 'All Test (200+)' },
  { id: '150', label: 'All Test (150+)' },
  { id: '100', label: 'All Test (100+)' },
  { id: '50', label: 'All Test (50+)' },
];

export const SortByPass = [
  { id: '1', label: 'Trending' },
  { id: '2', label: 'Popular' },
  { id: '3', label: 'Highest Rated' },
  { id: '4', label: 'Newly Added' },
  { id: '5', label: 'Featured' },
];

export const SerachType = [
  { id: '1', label: 'All' },
  { id: '2', label: 'Coaching' },
  { id: '3', label: 'Test Series' },
  { id: '4', label: 'Practice' },
  { id: '5', label: 'Quiz' },
];

export const SEARCHCHOICE = {
  ALL: 'All',
  COACHING: 'Coaching',
  QUIZ: 'Quiz',
  PRACTICE: 'Practice',
  PACKAGE: 'Test Series',
};

export const PackageChoiceType = [
  { id: '1', sectionName: "Students' Choice"},
  { id: '2', sectionName: 'Recently Added' },
  { id: '3', sectionName: 'Recommended' },
];

export const FAQDUMMY = {
  coachingPageFaq: [
    {
      id: 1,
      faqTitle:
        'What are test packages?',
      faqContent:
        '<p>A test package is a collection of many tests created by particular coaching</p>',
      displayOrder: 1,
    },
    {
      id: 2,
      faqTitle:
        'How can I buy test packages?',
      faqContent:
        '<p>To buy a test package, go to the coaching page of your choice. Explore the available test packages and click on the buy now button at the bottom of each test package. Complete your test purchase by making payment and attempt the test within the test package. </p>',
      displayOrder: 2,
    },
    {
      id: 3,
      faqTitle:
        'How many times can I attempt a test?',
      faqContent:
        '<p>By default you can attempt a test package once. However, the number of attempts can change if it is allowed by the coaching. </p>',
      displayOrder: 3,
    },
    {
      id: 4,
      faqTitle:
        'Will get I my test result immediately after finishing the test?',
      faqContent:
        '<p>For most of the test you will get an auto-generated test result after you finish the test. If the test is dated the result for that particular test will be published on the particular time window as mentioned. If the test result is manual the coaching may declare the result of the test max to max within 15days of attempting the test</p>',
      displayOrder: 4,
    },
    {
      id: 5,
      faqTitle:
        'Will I get a test analysis report?',
      faqContent:
        '<p>Yes, you will get a detailed analysis of your test.</p>',
      displayOrder: 5,
    },
    {
      id: 6,
      faqTitle:
        'Can I compare my result with other aspirants to know my rank?',
      faqContent:
        '<p>You will get a rank according to your test result and you will also be able to check who are the top 10 scorers of that particular test.</p>',
      displayOrder: 6,
    },
    {
      id: 7,
      faqTitle:
        'How many tests can I attempt in one day?',
      faqContent:
        '<p>You can attempt as many tests as you want in a single day. There is no limitation on the number of tests you can attempt.</p>',
      displayOrder: 7,
    },
    {
      id: 8,
      faqTitle:
        'I currently do not have a computer or laptop. Can I still attempt the test from mobile?',
      faqContent:
        '<p>Admisure’s tests are also accessible on mobile devices. Even if you do not have a computer, you can attempt the tests from a mobile device.</p>',
      displayOrder: 8,
    },
    {
      id: 9,
      faqTitle:
        'Money is deducted from my account but the test package purchase shows unsuccessful. What do I do?',
      faqContent:
        '<p>You can contact us through the help and support email <span>support@admisure.com</span>. We will look into the matter and get back to you as soon as possible. </p>',
      displayOrder: 9,
    },
    {
      id: 10,
      faqTitle:
        'How many tests do I get in a test package?',
      faqContent:
        '<p>There is no fixed number of tests that you can get in a test package. There can be more than one to thousands of tests within a test package. It depends on the coaching institute that has created it.</p>',
      displayOrder: 10,
    },

  ],
};

export const teamplateList = {
  SSC: 'ssc',
  BANKING: 'banking',
  JEE: 'jee',
  RAILWAY: 'rrb',
  CAT: 'cat',
  GATE: 'gate',
};
