const $ = e => document.querySelector(e);

function listVideos(videos) {
    let html = "";

    for (const video of videos) {
        html += `<div style="filter: sepia(10) brightness(0.85) hue-rotate(${Math.random() * 360}deg);">
        <img src="${video.thumbnail_url}">
        <h3 title="${video.title}">${video.title}</h3>
        <p><strong>${video.name_channel}</strong> - há ${video.last_hours}</p>
        </div>`;
    }

    $("main").innerHTML = html;
}

function page_main(){
    fetch("./data/videos.json").then(e => {
        e.json().then(j => {
            listVideos(j.videos);
        })
    })
}

function page_video(id_video) {
    
}

function page_404() {
    
}

window.onload = () => {
    // PAGE SYSTEM
    const urlParams = new URLSearchParams(window.location.search);
    const pageName = urlParams.get("page");

    $("main").innerHTML = "";

    switch(pageName){
        case "video":
            page_video(urlParams.get(""));
            break;
        default:
            page_main();
            break;
    }
}