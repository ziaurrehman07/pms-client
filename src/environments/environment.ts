export const environment = {
    production: false,
    authApiUrl: 'http://localhost:8000/api/v1/users/login',
    logoutApiUrl: 'http://localhost:8000/api/v1/users/log-out-user',
    userApiUrl: 'http://localhost:8000/api/v1/users/get-user',
    userUpdateUrl: 'http://localhost:8000/api/v1/users/update-student-account-details',
    userAvatarUrl: '',
    companyURLs: {
      jobListUrl: 'http://localhost:8000/api/v3/companies/job/get-all-jobs',
      jobDetailsById: 'http://localhost:8000/api/v3/companies/job/get-job-details',
      applyJobs: 'http://localhost:8000/api/v3/companies/job/apply-for-job'
    }
    // userApiUrl: '/assets/mock/user.json'
  };
  