pragma solidity ^0.4.18;

contract Colleges{
   struct Student{
        string id;
        string name;
        string branch;
        string email;
        address account;
        uint[] requestids;
    } 

   struct College{
        string Name;
        string email;
        address account;
        uint x;
        mapping(address => Student)  Studentlist;
        address[]  Student_accts;
        uint[] requestids;
    }

    struct Admin{
        string name;
        address account;
        uint x;
    }

    uint public rid;
    struct Request{
        address student;
        string collegeId;
        address college;
        string ipfshash;
    }

    mapping(uint=>Request) public RequestList;
    uint[] public RequestId;

    event RequestAddedEvent(uint id);

    event RequestCompleted(uint id);


    mapping(address => College)  public Collegelist;
    address[] public College_accts;

    mapping(address=> Admin) public Adminlist;
    address[] public Admin_accts;

    constructor() public {
       // setCollege(0x3F18ae60B8cCd7a4A1087ae635a869944357D00f,"IIT-B","iitb@gmail.com");
        // setCollege(0x7467A9383cEF730A2A95Fda45f6d93ec2CED7831,"VJTI","vjti@gmail.com");
        setAdmin(0x3F18ae60B8cCd7a4A1087ae635a869944357D00f,"Chethan Kille");
    }

    event AdminAddedEvent(address ad,string name);

    event StudentAddedEvent(string name, string id); 

    function setAdmin(address _address,string name) public
    {
        if((Adminlist[_address]).x==0){
        var newAdmin = Adminlist[_address];
        newAdmin.name = name;
        newAdmin.account=_address;
        newAdmin.x=1;
        Admin_accts.push(_address) -1;
        emit AdminAddedEvent(_address,name);
        }
        else
        {

        }

    }

    function getAdmin(address ins) view public returns (string, address) {
        return (Adminlist[ins].name,Adminlist[ins].account);
    }


    event CollegeAddedEvent(address ad,string name, string email);

    function setCollege(address _address, string name, string email) public {
        if((Collegelist[_address]).x==0){
        var newCollege = Collegelist[_address];

        newCollege.Name = name;
        newCollege.email=email;
        newCollege.account=_address;
        newCollege.x=1;
        College_accts.push(_address) -1;
        emit CollegeAddedEvent(_address,name,email);
        }
        else
        {

        }
    }


    function getStudents(address collegeadd) view public returns (address[]){
        return (Collegelist[collegeadd]).Student_accts;
    }

    function getStudentData(address collegeadd,address studentadd) view public returns(string,string,string,string,address)
    {
        return (Collegelist[collegeadd].Studentlist[studentadd].id,Collegelist[collegeadd].Studentlist[studentadd].name,Collegelist[collegeadd].Studentlist[studentadd].branch,Collegelist[collegeadd].Studentlist[studentadd].email,studentadd);        
    }
    
    function addStudent(address coll_add,string id,string name,string branch,string email,address account) public
    {
        //check if college address is valid 
        if((Collegelist[coll_add]).x!=0)
        {
            //add student as college exists
            //emit event
            if((Collegelist[coll_add].Studentlist[account]).account==0){
            var newStudent=(Collegelist[coll_add]).Studentlist[account];
            newStudent.name=name;
            newStudent.id=id;
            newStudent.branch=branch;
            newStudent.email=email;
            newStudent.account=account;
            (Collegelist[coll_add]).Student_accts.push(account)-1;
             emit StudentAddedEvent(name,id);
            }
        }
        else{

        }
    }


    /*function getStudent(address ins) view public returns (string, string, address) {
        return (Studentlist[ins].Name,Studentlist[ins].ID,Studentlist[ins].College);
    }*/
    

    function  getColleges() view public returns (address[]) {
        return College_accts;
    }
    
    function getCollege(address ins) view public returns (string, string) {
        return (Collegelist[ins].Name, Collegelist[ins].email);
    }
    
    function countColleges() view public returns (uint) {
        return College_accts.length;
    }
    
    /*function getReqId() public returns (uint) {
        return rid++;
    }   */ 

    //////////////////////
    ///////for students only
    function postRequest(address college, string collId) public{
        //check if student is enrolled with college
       if((Collegelist[college].Studentlist[msg.sender]).account!=0) 
         { var newreq= RequestList[rid];
          rid++;       
          var d=rid-1;  
          newreq.student=msg.sender;
          newreq.college=college;
          newreq.collegeId=collId;
          Collegelist[college].requestids.push(d) -1;
          ((Collegelist[college].Studentlist[msg.sender]).requestids).push(d) -1;
          RequestId.push(d) -1;
            emit RequestAddedEvent(d);
        }
    }
    
    function getPendingRequestIds(address coll)  view public returns(uint[] memory){
        //limited to 10 for now
        
        //t=[];
        uint i=0;uint c=0;
        for(i;i<Collegelist[coll].Studentlist[msg.sender].requestids.length;i++){
            if( bytes(RequestList[Collegelist[coll].Studentlist[msg.sender].requestids[i]].ipfshash).length == 0){
                c++;
                //t.push(Collegelist[coll].Studentlist[msg.sender].requestids[i])-1;
            }
        }
        uint[] memory t=new uint[](c); uint y=0;
        for(i=0;i<Collegelist[coll].Studentlist[msg.sender].requestids.length;i++){
            if( bytes(RequestList[Collegelist[coll].Studentlist[msg.sender].requestids[i]].ipfshash).length == 0){            
              //  t.push(Collegelist[coll].Studentlist[msg.sender].requestids[i])-1;
                t[y++]=Collegelist[coll].Studentlist[msg.sender].requestids[i];
            }
        }
        return t;
    }

   function getCompletedRequestIds(address coll) view public returns(uint[] memory){
    //limited to 10 for now
     //var t=uint[](10);
        uint i=0;uint c=0;
        for(i;i<Collegelist[coll].Studentlist[msg.sender].requestids.length;i++){
            if(bytes(RequestList[Collegelist[coll].Studentlist[msg.sender].requestids[i]].ipfshash).length!=0){
               // t.push(Collegelist[coll].Studentlist[msg.sender].requestids[i])-1;
               c++;
            }
        }
        uint[] memory t=new uint[](c);uint y=0;
        for(i=0;i<Collegelist[coll].Studentlist[msg.sender].requestids.length;i++){
            if(bytes(RequestList[Collegelist[coll].Studentlist[msg.sender].requestids[i]].ipfshash).length!=0){
              // t.push(Collegelist[coll].Studentlist[msg.sender].requestids[i])-1;
              t[y++]=Collegelist[coll].Studentlist[msg.sender].requestids[i];
            }
        }
        return t;
   } 

    function getPendingRequestData(uint reqid) view public returns (address,string){
        var coladd=RequestList[reqid].college;
        return (coladd,Collegelist[coladd].Name);
    } 

    function getCompletedRequestData(uint reqid) view public returns (uint,string,string){
        var coladd=RequestList[reqid].college;
        return (reqid,Collegelist[coladd].Name, RequestList[reqid].ipfshash);
    }
  



    ////for college only
    function addIpfsHash(uint requestid, string hash){
        RequestList[requestid].ipfshash=hash;
        emit RequestCompleted(requestid);
    }
     
    function getPendingRequestIdsCollege() view public returns(uint[] memory){
       // var t=uint[](10);
        uint i=0; uint c=0;
        for(i;i<Collegelist[msg.sender].requestids.length;i++){
            if(bytes(RequestList[Collegelist[msg.sender].requestids[i]].ipfshash).length==0){
                //t.push(Collegelist[msg.sender].requestids[i])-1;
                c++;
            }
        }
        uint[] memory t=new uint[](c); uint y=0;
        for(i=0;i<Collegelist[msg.sender].requestids.length;i++){
            if(bytes(RequestList[Collegelist[msg.sender].requestids[i]].ipfshash).length==0){
                //t.push(Collegelist[msg.sender].requestids[i])-1;
                t[y++]=Collegelist[msg.sender].requestids[i];
            }
        }
        return t;   
    }

    function getPendingRequestsDataCollege(uint reqid) view public returns (address,string,uint){
        return (RequestList[reqid].student,RequestList[reqid].collegeId,reqid);
    }

}