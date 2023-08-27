interface Job{
    _id:string,
    applications:[
        {
        
            _id:string,
            status:"Perfect"|"Good"| "Average"| "Bad"|"No status",
        viewed:boolean,
        shortlisted:boolean
        }
    ]
}

export default Job