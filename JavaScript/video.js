// console.log("add this js");
const cardDemon = {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
      {
        "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
        "profile_name": "Olivia Mitchell",
        "verified": ""
      }
    ],
    "others": {
      "views": "100K",
      "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
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
    .catch(error => console.error(error))
};

// create display

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  console.log(videos);
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure>
        <img src=${video.thumbnail} />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
        `;
    videoContainer.append(card);
  });
};


const displayCategories = (categories) => {
  const buttonContainer = document.getElementById("buttonCategory");
  // console.log(categories);
  categories.forEach((items) => {
    // console.log(items);
    // create button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = items.category;

    buttonContainer.append(button);
  });
};



loadCategories();
loadvideos();
