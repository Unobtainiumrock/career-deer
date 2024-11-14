export default {
  auth: {
    isAuthenticated: false,
    user: null,
    loginError: null,
    signUpError: null,
    loadUserError: null,
    logoutError: null,
    loading: true
  },
  pwReset: {
    status: false,
    error: null
  },
  pwUpdate: {
    status: false,
    error: null,
    loading: false
  },
  addJob: {
    status: false,
    error: null
  },
  updateJob: {
    status: false,
    error: null,
    job: null
  },
  searchData: {
    loading: false,
    data: [],
    saved: [],
    error: null
  },
  chartData: {
    sample: {
      title: ' (SAMPLE)'
    },
    all: {
      labels: [
        'Saved', 'Applied', 'Phone Interview', 'On-site Interview', 'Offer',
      ],
      data: [50, 30, 20, 10, 5],
      percentage: [44, 26, 17, 9, 4]
    },
    user: {
      labels: [
        'Saved', 'Applied', 'Phone Interview', 'On-site Interview', 'Offer',
      ],
      data: [50, 30, 20, 10, 5],
      percentage: [44, 26, 17, 9, 4],
      percentile: {
        saved: 50,
        savedArr: [1, 1],
        applied: 50,
        appliedArr: [1, 1],
        phone: 50,
        phoneArr: [1, 1],
        onSite: 50,
        onSiteArr: [1, 1],
        offer: 50,
        offerArr: [1, 1]
      },
    }
  },
  jobBoard: {
    loading: false,
    error: null,
    columns: {
      'column-saved': { id: 'column-saved', title: 'Saved', cardIds: [] },
      'column-applied': { id: 'column-applied', title: 'Applied', cardIds: [] },
      'column-phone': { id: 'column-phone', title: 'Phone Interview', cardIds: [] },
      'column-onsite': { id: 'column-onsite', title: 'On-site Interview', cardIds: [] },
      'column-offer': { id: 'column-offer', title: 'Offer', cardIds: [] }
    },
    columnOrder: [
      'column-saved',
      'column-applied',
      'column-phone',
      'column-onsite',
      'column-offer'
    ],
    jobs: {
      // Example
      // 'job-1': { id: 'job-1', title: 'Software Engineer', ...otherJobFields }
    }
  },
  burgerMenu: {
    isOpen: false
  }
};
