export interface Company {
  name: string;
}

export interface Designation {
  _id: string;
  company: Company;
  designation: string;
  salaryPackage: number;
}

export interface User {
  _id: string;
  fullName: string;
  enrollment: string;
  email: string;
  role: string;
  isPlaced: boolean;
  avatar: string;
  branch: string;
  college_cgpa: number;
  result_10: number;
  result_12: number;
  designation: Designation;
  mobile: number;
  address: string;
}

export interface ApiResponse {
  statusCode: number;
  data: User;
  message: string;
  success: boolean;
}
