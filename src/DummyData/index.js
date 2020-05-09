const employeeDetails=[
    {
        "name":"Mani Kandan E",
        "id":"Em001",
        "roll":"Plumper",
        "age":21
    },
    {
        "name":"Thiru K",
        "id":"Em002",
        "roll":"Painter",
        "age":45
    },
    {
        "name":"Aravith Kumar S",
        "id":"Em003",
        "roll":"welder",
        "age":24
    },
    {
        "name":"Mukilan s",
        "id":"Em004",
        "roll":"Plumper",
        "age":25
    },{
        "name":"Vel M",
        "id":"Em005",
        "roll":"welder",
        "age":26
    },{
        "name":"Kalai Kumar E",
        "id":"Em006",
        "roll":"Plumper",
        "age":30
    },
   
]
const jobCards=[
    {
        "name":"Painting",
        "require":3,
        "noOFDays":5,
        'jib':"j001"
        

    },
    {
        "name":"Plumping",
        "require":3,
        "noOFDays":5,
        'jib':"j002"
        

    },
    {
        "name":"welding",
        "require":3,
        "noOFDays":5,
        'jib':"j003"
        

    },
    {
        "name":"Painting",
        "require":3,
        "noOFDays":5,
        'jib':"j004"
        

    },
    {
        "name":"Painting",
        "require":3,
        "noOFDays":5,
        'jib':"j005"
        

    },
    {
        "name":"Painting",
        "require":3,
        "noOFDays":5,
        'jib':"j006"
        

    },
    
   
]
const onGoingWorks=[
    {
        
        "jname":"Painting",
        "jid":"j001",
        "completed":90,
        "members":["Mani kandan E","Thiru s","Mari K","Mari K","Thiru s","Mari K"]
        
    },
    {
        
        "jname":"Painting",
        "jid":"j002",
        "completed":30,
        "members":["Mani kandan E","Thiru s","Mari K","Thiru s","Mari K"]
        
    },
    {
        
        "jname":"welding",
        "jid":"j003",
        "completed":20,
        "members":["Mani kandan E","Thiru s","Mari K"]
        
    },
    {
        
        "jname":"Painting",
        "jid":"j003",
        "completed":70,
        "members":["Mani kandan E","Thiru s","Mari K"]
        
    },
    {
        
        "jname":"Painting",
        "jid":"j004",
        "completed":10,
        "members":["Mani kandan E","Thiru s","Mari K"]
        
    },

   
   
]
export {employeeDetails,jobCards,onGoingWorks};