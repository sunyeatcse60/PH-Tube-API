// console.log("add this js");
function getTime(time) {
  const hours = parseInt(time / 3600);
  let remainingSeconds = parseInt(time % 3600);
  const minutes = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return `${hours} hour ${minutes} minute ${remainingSeconds} second ago`;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

const cardDemon = {
  category_id: "1001",
  video_id: "aaaa",
  thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
  title: "Shape of You",
  authors: [
    {
      profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
      profile_name: "Olivia Mitchell",
      verified: "",
    },
  ],
  others: {
    views: "100K",
    posted_date: "16278",
  },
  description:
    "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey.",
};

// create load
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.error(error));
};

// creat load videos
const loadvideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.error(error));
};

const loadCategoriesVideos = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      // console.log(activeBtn);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.error(error));
};




const loadDetails = async (videoId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
  const data = await res.json;
  console.log(data);
};



const displayDetails = (video) => {
  const detailsContainer = document.getElementById('modal-containt');

  document.getElementById('show-modal').click();
};

// create display




const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
    <img src="./Assets/Icon.png"
    <h2 class=" text-center text-lg font-bold"> No content hare in this category </h2>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  //   console.log(videos);
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class ="h-[200px] relative">
        <img class ="h-full w-full object-cover" src=${video.thumbnail} />
        ${
          video.others.posted_date?.length == 0
            ? ""
            : `
            <span class="absolute right-2 bottom-2 bg-black text-white rounded text-small p-1">
            ${getTime(video.others.posted_date)}</span>`
        }
        
      </figure>

      <div class="px-0 py-2 flex gap-2">
      <div>
      <img class="w-10 h-10 rounded-full object-cover" src=${
        video.authors[0].profile_picture
      }/>
      </div>

      <div>
      <h2 class="font-bold">${video.title}</h2>
      <div class="flex item-center gap-2" >
      <p class=""text-gray-400>${video.authors[0].profile_name}</p>

      ${
        video.authors[0].verified === true
          ? ` <img class="w-5" src= "https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"`
          : " "
      }
      </div>
      <p> 
      <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button>
      </p>

      </div>

      </div>
        `;
    videoContainer.append(card);
  });
};

const displayCategories = (categories) => {
  const catagoryContainer = document.getElementById("buttonCategory");
  // console.log(categories);
  categories.forEach((items) => {
    // console.log(items);

    // create button
    // const button = document.createElement("button");
    // button.classList = "btn";
    // button.innerText = items.category;

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${items.category_id}" onclick="loadCategoriesVideos(${items.category_id})" class ="btn category-btn">
    ${items.category}
    </button>
    `;

    catagoryContainer.append(buttonContainer);
  });
};

loadCategories();
loadvideos();
