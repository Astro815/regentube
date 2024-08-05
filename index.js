const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e);

let data_videos = {};

function listVideos(videos) {
    let html = "";

    for (const video of videos) {
        // Rainbow thumbs
        //  style="filter: sepia(10) brightness(0.85) hue-rotate(${Math.random() * 360}deg);"
        html += `<div class="video-thumb" id="${video.id}">
        <img src="${video.thumbnail_url}">
        <h3 title="${video.title}">${video.title}</h3>
        <p><strong>${video.name_channel}</strong> - há ${video.last_hours}</p>
        </div>`;
    }

    $("main").innerHTML = html;

    for (const videoDiv of $$(".video-thumb")) {
        videoDiv.onclick = (e) => {
            window.open(`?page=video&vid=${videoDiv.id}`, "_top");
        };
    }
}

async function get_data() {
    await fetch("./data/videos.json").then(async e => {
        await e.json().then(j => {
            data_videos = j;
            return;
        })
    })
}

function page_main() {
    listVideos(data_videos.videos);
}

function page_video(id_video) {
    let html = "";
    let vd = {};

    vd = data_videos.videos.filter(x => { return x.id == id_video })[0];

    html = "<div class=\"video-content\">"

    let v_type = "";

    if (Object.keys(vd).includes("v_type")) {
        v_type = vd.v_type;
    }

    if (v_type == "yt") {
        html += `<iframe width="560" height="315" src="${vd.v_url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    } else if (v_type == "local") {
        html += `<video width="560" height="315" src="${vd.v_url}" controls="true" autoplay="true"></video>`
    } else {
        html += `<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    }

    html += "</div>";

    $("title").innerText = vd.title + " - Regentube";

    $("main").innerHTML = html;
}

function page_404() {

}

window.onload = async () => {
    // PAGE SYSTEM
    const urlParams = new URLSearchParams(window.location.search);
    const pageName = urlParams.get("page");

    $("header").onclick = e => {
        window.open(`./index.html`, "_top");
    }

    $("main").innerHTML = "";

    await get_data();

    switch (pageName) {
        case "video":
            page_video(urlParams.get("vid"));
            break;
        default:
            page_main();
            break;
    }
}