const $ = e => document.querySelector(e);

function listVideos(videos) {
    let html = "";

    for (const video of videos) {
        html += `<div>
        <img src="${video.thumbnail_url}">
        <h3 title="${video.title}">${video.title}</h3>
        <p><strong>${video.name_channel}</strong> - ${video.last_hour}</p>
        </div>`;
    }

    $("main").innerHTML = html;
}

window.onload = () => {
    fetch("./data/videos.json").then(e => {
        e.json().then(j => {
            listVideos(j.videos);
        })
    })
}