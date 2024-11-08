export default {
  auth: {
    isAuthenticated: false,
    user: null,
    loginError: null,
    signUpError: null,
    loadUserError: null,
    logoutError: null,
    loading: false
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
    loading: true,
    error: null,
    boards: {
      saved: [],
      applied: [],
      phone: [],
      'on-site': [],
      offer: []
    }
  },
  burgerMenu: {
    isOpen: true
  }
};
