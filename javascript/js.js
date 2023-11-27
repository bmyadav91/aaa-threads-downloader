// mobile nav hide show 
const humburg_icon = document.querySelector(".humburg_container i");
const mobile_nav_container = document.querySelector(".mobile_nav_links");
humburg_icon.addEventListener("click", function () {
    mobile_nav_container.classList.toggle("show");
});

// how to download threads video content hide and show 
const how_tow_dnd_header = document.querySelector(".documention_for_download_parent .header");
const how_to_dnd_content = document.querySelector(".documention_for_download_parent .content");
const show_hide_icon = document.querySelector(".documention_for_download_parent .hide_show .navigation_span_container i");
how_tow_dnd_header.addEventListener("click", function () {
    how_to_dnd_content.classList.toggle("show");
    show_hide_icon.classList.toggle("bi-chevron-up");
});

// media type selection and fill in input val 
const media_type_selection = document.querySelectorAll('.media_type .media_type_inp_cls');
media_type_selection.forEach(function (radio) {
    radio.addEventListener('change', function () {
        if (radio.checked) {
            const media_type_val = radio.value;
            const input_threads_url_val = document.querySelector('.input_field_cls');
            switch (media_type_val) {
                case 'postvideo':
                    input_threads_url_val.placeholder = "Paste Video Link";
                    break;
                case 'profiledp':
                    input_threads_url_val.placeholder = "Enter User Name or Profile Link";
                    break;
                case 'postphoto':
                    input_threads_url_val.placeholder = "Paste Post/Photo Link";
                    break;
                default:
                    input_threads_url_val.placeholder = "Paste Link Here";
                    break;
            }
        }
    });
});




// pass error here - in global varibale error_one
var error_one = document.querySelector('.error_class_container');
var neer_input_error = document.querySelector('.input_near_error');
var fetch_container = document.querySelector('.fetched_media_container');
var dnd_submit_btn = document.querySelector('.dnd_button');

// dnd button disabled function 
function disblae_dnd_btn(){
    dnd_submit_btn.disabled = true;
    dnd_submit_btn.innerText = "Fetching";
}
function enable_dnd_btn(){
    dnd_submit_btn.disabled = false;
    dnd_submit_btn.innerText = "Download";
}

// on change blank error input 
const input_field = document.querySelector('.input_field_cls');
input_field.addEventListener('input', function () {
    neer_input_error.innerText = '';
});


// url patern allow 
var threadurlpattern = /^https:\/\/www\.threads\.net\/[-0-9A-Za-z_./@]+$/;

document.querySelector("#download_threads_media_frm").addEventListener("submit", async function (event) {
    event.preventDefault();
    disblae_dnd_btn();
    fetch_container.innerHTML = '';
    const selectedmediatype = document.querySelector('input[name="media_type_inp_nm"]:checked').value;
    const inputfieldvalue = document.querySelector(".input_field_cls").value;

    switch (selectedmediatype) {
        case 'postvideo':
            if (threadurlpattern.test(inputfieldvalue)) {
                try {
                    const response = await fetch('/fetchvideo', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ threads_input_url: inputfieldvalue }),

                    });

                    const data = await response.json();

                    if (data.videoSrc) {
                        fetch_container.innerHTML = `<div class="error_class_container need_padding" id="push_one">Your Video is Here</div>
                        <div class="fetched_video_outdoor">
                            <div class="fetched_media_parent">
                                <div class="fetched_media_child fetched_child_one">
                                    <div class="img_container">
                                        <a href="${data.videoSrc}" target="_blank"><img class="img_cls" src="./images/threads_downloader_preview.jpg" /></a>
                                    </div>
                                </div>
                                <div class="fetched_media_child fetched_child_two">
                                    <div class="download_link_btn need_padding" id="push_here">
                                        <a href="${data.videoSrc}" class="watch_and_download a" target="_blank">Watch
                                            and Download</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    } else {
                        fetch_container.innerHTML = `<div class="error_class_container need_padding">${data.error}</div>`;
                    }
                } catch (error) {
                    fetch_container.innerHTML = `<div class="error_class_container need_padding">${data.error}</div>`;
                } finally{
                    enable_dnd_btn();
                }
                neer_input_error.innerText = '';
            } else {
                neer_input_error.innerText = 'Invalid Link For Video';
                enable_dnd_btn();
            }
            break;
            case 'profiledp':
                if (threadurlpattern.test(inputfieldvalue)) {
                    try {
                        const response = await fetch('/fetchprofile', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ threads_input_url: inputfieldvalue }),
    
                        });
    
                        const data = await response.json();
    
                        if (data.profilesrc) {
                            fetch_container.innerHTML = `<div class="error_class_container need_padding" id="push_one">Profile is Here</div>
                            <div class="fetched_video_outdoor">
                                <div class="fetched_media_parent">
                                    <div class="fetched_media_child fetched_child_one">
                                        <div class="img_container">
                                            <a href="${data.profilesrc}" target="_blank"><img class="img_cls" src="./images/threads_profile.jpg" /></a>
                                        </div>
                                    </div>
                                    <div class="fetched_media_child fetched_child_two">
                                        <div class="download_link_btn need_padding" id="push_here">
                                            <a href="${data.profilesrc}" class="watch_and_download a" target="_blank">View and Download</a>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            fetch_container.innerHTML = `<div class="error_class_container need_padding">${data.error}</div>`;
                        }
                    } catch (error) {
                        fetch_container.innerHTML = `<div class="error_class_container need_padding">${data.error}</div>`;
                    } finally{
                        enable_dnd_btn();
                    }
                    neer_input_error.innerText = '';
                } else {
                    neer_input_error.innerText = 'Invalid Link For Video';
                    enable_dnd_btn();
                }
            break;

            case 'postphoto':
                if (threadurlpattern.test(inputfieldvalue)) {
                    try {
                        const response = await fetch('/fetchpostphoto', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ threads_input_url: inputfieldvalue }),
    
                        });
    
                        const data = await response.json();
    
                        if (data.postphotosrc) {
                            fetch_container.innerHTML = `<div class="error_class_container need_padding" id="push_one">Post Photo is Here</div>
                            <div class="fetched_video_outdoor">
                                <div class="fetched_media_parent">
                                    <div class="fetched_media_child fetched_child_one">
                                        <div class="img_container">
                                            <a href="${data.postphotosrc}" target="_blank"><img class="img_cls" src="./images/threads-post.jpg" /></a>
                                        </div>
                                    </div>
                                    <div class="fetched_media_child fetched_child_two">
                                        <div class="download_link_btn need_padding" id="push_here">
                                            <a href="${data.postphotosrc}" class="watch_and_download a" target="_blank">View and Download</a>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            fetch_container.innerHTML = `<div class="error_class_container need_padding">${data.error}</div>`;
                        }
                    } catch (error) {
                        fetch_container.innerHTML = `<div class="error_class_container need_padding">${data.error}</div>`;
                    } finally{
                        enable_dnd_btn();
                    }
                    neer_input_error.innerText = '';
                } else {
                    neer_input_error.innerText = 'Invalid Link For Video';
                    enable_dnd_btn();
                }
            break;

        default:
            break;
    }

});

  
