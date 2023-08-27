interface Job {
    _id?: string;
    role: string;
    desc: string;
    experience: number[];
    skills: string[];
    companyType: 'Startup' | 'MNC' | 'Service-based' | 'Product-based' | 'Non-profit' | 'E-commerce' | 'Financial Institution' | 'Technology Company' | 'Consulting Firm' | 'Manufacturing Company';
    education:string
    salary:number[]
    workmode:'Remote'| 'Hybrid' | 'On-Site'
    location:string
}

export default Job
