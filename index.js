//DOM  
let search=document.querySelector("button.search");
let username=document.querySelector("input.username");
let basic_info=document.querySelector("div.basic-information");

let t=gsap.timeline()

t.to("h1.head1",{
    text:"Instagram Information Scraper",
    duration:1.8
})

t.from("div.main-parent",{
    opacity:0
})

t.from("input.username,button.search",{
    opacity:0,
    stagger:0.3,
    y:-10
})

t.from("div.basic-information",{
    opacity:0,
    y:-10
})

let createBasicData=(userid,src,fullname,summary,description,follower,following,account_type,verified,posts)=>{

  basic_info.innerHTML=`
            
    <div class="user_info1">
        <div class="userid">User Id</div>
        <div class="user_name">${userid}</div>
    </div>

    <div class="user_info2">
        <div class="userid">Profile</div>
        <img src="${src}" class="user_photo">
    </div>

    <div class="user_info6">
        <div class="user_insta">Full Name</div>
        <div class="user_insta_name">${fullname}</div>
    </div>

    <div class="user_info3">
        <div class="user_biography">Biography</div>
        <details>
            <summary class="user_biography_description_Parent">${summary}</summary>
            <p class="user_biography_description">${description}</p>
        </details>
    </div>

    <div class="user_info9">
        <div class="user_post">Total Posts</div>
        <div class="user_total_post">${[posts]}</div>
    </div>

    <div class="user_info4">
        <div class="user_follower">Follower</div>
        <div class="user_follower_count">${follower}</div>
    </div>

    <div class="user_info5">
        <div class="user_following">Following</div>
        <div class="user_following_count">${following}</div>
    </div>

    <div class="user_info7">
        <div class="user_private">Private Account</div>
        <div class="user_private_account">${account_type}</div>
    </div>

    <div class="user_info8">
        <div class="user_verified">Verified</div>
        <div class="is_user_verified">${verified}</div>
    </div>

`
    t.from("div.user_info1,div.user_info2,div.user_info3,div.user_info4,div.user_info5,div.user_info6,div.user_info7,div.user_info8,div.user_info9",{
        opacity:0,
        stagger:0.2,
        x:-10
    })
}

createBasicData("NULL","user.png","NULL","NULL","","NULL","NULL","NULL","NULL","NULL");

search.addEventListener("click",()=>{

    let user=username.value;

    const url2 = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?response_type=full&ig=${user}&corsEnabled=true`;
    const options2 = {
            method: 'GET',
        headers: {
            'x-rapidapi-key': 'c0e897e06bmshf1b07b02427bc79p1edb79jsn0132d0db5ef9',
            'x-rapidapi-host': 'instagram-bulk-profile-scrapper.p.rapidapi.com'
        }
    };

    // Getting Basic Information
    async function getInfo(){
        const response2 = await fetch(url2, options2);
        const result2 = await response2.json();
        try{
            if(response2.status==200){
                let private=result2[0]["is_private"]?"Yes":"No";
                let verified=result2[0]["is_verified"]?"Yes":"No";
                createBasicData(result2 [0]["username"],result2[0]["hd_profile_pic_url_info"]["url"],result2[0]["full_name"],"Click Here",result2[0]["biography"],result2[0]["follower_count"],result2[0]["following_count"],private,verified,result2[0]["media_count"]);
            }
        }
        catch{
            alert("Invalid Username!")
        }       
    } 
    
    getInfo();
})