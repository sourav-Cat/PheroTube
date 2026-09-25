console.log('videos script added')
//create load catagory
const loadCatagories=()=>{
    console.log('load catagoris')
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=>res.json())
    .then((data)=>displayCatagories(data.categories))
    .catch((error)=>console.log(error))


};

const loadVideos=(searchText="")=>{
    console.log('load catagoris')
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res)=>res.json())
    .then((data)=>displayVideos(data.videos))
    .catch((error)=>console.log(error))


};
const cardDemo={
    "category_id": "1001",
    "video_id": "aaab",
    "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
    "title": "Midnight Serenade",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
            "profile_name": "Noah Walker",
            "verified": false
        }
    ],
    "others": {
        "views": "543K",
        "posted_date": ""
    },
    "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
}
function getTimeString(time){
    const hour =parseInt(time/3600);
    let remainSeconds=parseInt(time%3600)
    const Minit=parseInt(remainSeconds/60);
    const Seconds=parseInt(remainSeconds%60);
    return `${hour} hours ${Minit} minites and ${Seconds} Seconds Ago`;      
}


const displayVideos=(videos)=>{
    console.log(videos)
    const videoContainer=document.getElementById('videos')
    videoContainer.innerHTML='';
    videoContainer.classList.remove('grid');
    if(videos.length===0){
        videoContainer.innerHTML=
        `
        <div class="min-h-screen flex gap-5 flex-col justify-center items-center">
            <img src="assests/icon.png">
           <h1 class="font-bold text-xl text-center">  NO videos is here </h1>

        </div>
        `;
        return;
    }
    else{
         videoContainer.classList.add('grid');
    }


    videos.forEach(video=>{
        console.log(video)
        const card=document.createElement("div");
        card.classList="card bg-base-100 "
        card.innerHTML=` <figure class="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      ${
        video.others.posted_date?.length===0?"":`<span class="absolute right-2 bottom-2 bg-black text-white  text-xs">${getTimeString(video.others.posted_date)} </span>`
      }
  </figure>
  <div class="px-0 py-0 flex gap-2">
    <div> 
        <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}>
    </div>
    <div> 
        <h2 class="font-bold " >${video.title} </h2>
      <div class="flex items-center gap-2">
        <p class="text-gray-500 font-bold" > ${video.authors[0].profile_name}   </p>
        ${video.authors[0].verified===true?`<img class="w-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000"/>` :""}
      </div>
        <p> <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error" > Details </button> </p>    
    </div>
 
  
  </div>`
  videoContainer.append(card)
    })

}
const removeActiveClass=()=>{
    const buttons=document.getElementsByClassName('category-btn');
    console.log(buttons)
    for(let btn of buttons){
        btn.classList.remove('active')
    }
}
const loadCatagoriesVideos=(id)=>{
    // alert(id)
    // fetch
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${(id)}`)
    .then((res)=>res.json())
    .then((data)=>{
        // active button color
         removeActiveClass()

        const activeBtn=document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active')
        
        displayVideos(data.category)
    })

}
const loadDetails= async (videoId)=>{
    console.log(videoId)
    const uri=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res=await fetch(uri);
    const data=await res.json();
    displayDetails(data.video)
}
const displayDetails=(video) =>{
    console.log(video)
    const detailsContainer=document.getElementById('modal-content');
    detailsContainer.innerHTML=`
    <img src=${video.thumbnail}/>
    <p> ${video.description}</p>
    `
    
    // way one to show Modal
    // document.getElementById('showModalData').click();
    // way two to show modal  
    document.getElementById('customModal').showModal();
}
//create display catagory 
const displayCatagories=(categories)=>{
    console.log(categories)
    const categoryContainer=document.getElementById("categories")
    categories.forEach((item) => {
        console.log(item)
    const button=document.createElement("button")
    button.classList='btn';
    button.innerText=item.category;
    const buttonContainer=document.createElement('div');
        buttonContainer.innerHTML=
        `
        <button onclick="loadCatagoriesVideos(${item.category_id})" id="btn-${item.category_id}" class="btn category-btn">
            ${item.category}
        </button>
        `
    categoryContainer.append(buttonContainer);
    })
 

};
document.getElementById('search-input').addEventListener('keyup',(e)=>{
    loadVideos(e.target.value)
});


loadCatagories()
loadVideos()