
onload = function () {
    const editor = document.getElementById("editor");
    const context = editor.getContext("2d");
    const imageEditor = document.getElementById("imageEditor");
    const toolbar = document.getElementById("toolbar");

    var blob;

    // const shareFB = document.getElementById("shareFB").addEventListener("click",function () {
    //     const image = editor.toDataURL();
    //     const img = new Image();
    //     img.src = image;
    //     console.log(img.src);
    //     //image.src = '/image.png';
    //     //co
    //     const link = document.createElement('a');
    //     //const image64 = Base64Binary.decode(image);
    //    // const img = new Image();
    //    // img.src = `${image64}`;
    //     //link.download = 'image.png';
    //     //img.src = image;
    //     // const source = img.src;
    //     //console.log(img.src);
    //     //link.href = `https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(${img.src})`;
    //     link.href = `https://www.facebook.com/sharer/sharer.php?u=${img.src}`;
    //     link.target='_blank';
    //     link.click();
    //     //u=img.src;
    //     //console.log(u);
    //     // t=document.title;
    //     // t=img.getAttribute('alt');
    //     // window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;
    // });


    const tools = {
        "upload" : function () {
            const upload = document.createElement('input');
            upload.type = "file";
            upload.click();
            upload.onchange = function() {
                const img = new Image();
                img.onload = () => {
                    editor.width = img.width;
                    editor.height = img.height;
                    imageEditor.style.width = img.width;
                    imageEditor.style.height = img.height;
                    context.drawImage(img, 0,0);
                };
                img.onerror = () => {
                    console.error("The provided file couldn't be loaded as an Image media");
                };
                img.src = URL.createObjectURL(this.files[0]);
                // const image = editor.toDataURL();
                // const link = document.createElement('a');
                // //link.download = 'image.png';
                // link.href = image;
                // link.click();
                // img.src = 'image.png';
                // console.log(img.src);
            };
        },
        "save" : function(){
            // const image = editor.toDataURL();
            // const link = document.createElement('a');
            // link.download = 'image.png';
            // link.href = image;
            // link.click();
        },
        "flipHor" : function(){
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols);

            for(let i=0;i<Math.floor(rows/2);i++){
                for(let j=0;j<cols;j++){
                    let tmp = image[i][j];
                    image[i][j] = image[rows-1-i][j];
                    image[rows-1-i][j] = tmp;
                }
            }
            setImageData(image, rows, cols);
        },
        "flipVert" : function(){
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols);

            for(let i=0;i<rows;i++){
                for(let j=0;j<Math.floor(cols/2);j++){
                    let tmp = image[i][j];
                    image[i][j] = image[i][cols-1-j];
                    image[i][cols-1-j] = tmp;
                }
            }
            setImageData(image, rows, cols);
        },
        "rotateL" : function () {
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols);

            let limage = [];
            for(let i=cols-1;i>=0;i--){
                let row = [];
                for(let j=0;j<rows;j++){
                    row.push(image[j][i]);
                }
                limage.push(row);
            }
            setImageData(limage, cols, rows);
        },
        "rotateR" : function () {
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols);

            let rimage = [];
            for(let i=0;i<cols;i++){
                let row = [];
                for(let j=rows-1;j>=0;j--){
                    row.push(image[j][i]);
                }
                rimage.push(row);
            }
            setImageData(rimage, cols, rows);
        },
        "resize" : function(){
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols);

            // let inp = prompt('Current Width : '+cols + '\n' + 'Current Height : '+rows + '\n' + 'Give the new width and height in a space separated manner');
            // let inp1 = prompt('Current Width : '+cols + '\n' + 'Current Height : '+rows + '\n' + 'Give the new width and height in a space separated manner');//.split(' ');
            let inp1 = prompt('Current Width : '+cols + '\n'+ 'Enter New Width of the Image in Pixels');
            let inp2 = prompt('Current Height : '+rows + '\n'+ 'Enter New Height of the Image in Pixels');
            // if(inp.length!==2){
            //     alert('Incorrect dimensions in input');
            //     return;
            // }
            // let ncols = parseInt(inp[0]);
            // let nrows = parseInt(inp[1]);
            let ncols = parseInt(inp1);
            let nrows = parseInt(inp2);
            if(isNaN(ncols) || isNaN(nrows)){
                alert('Input is not a proper number');
                return;
            }

            let hratio = rows/nrows;
            let wratio = cols/ncols;

            let nimage = [];
            for(let i=0;i<nrows;i++){
                let row = [];
                for(let j=0;j<ncols;j++){
                    row.push(image[Math.floor(i*hratio)][Math.floor(j*wratio)]);
                }
                nimage.push(row);
            }
            setImageData(nimage, nrows, ncols);
        },
        "greyscale" : function(){
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols);

            for(let i=0;i<rows;i++){
                for(let j=0;j<cols;j++){
                    let pixel = image[i][j];
                    let shade = Math.floor(0.3*pixel[0]+0.59*pixel[1]+0.11*pixel[2]);
                    image[i][j][0] = image[i][j][1] = image[i][j][2] = shade;
                }
            }
            setImageData(image, rows, cols);
        }
    };

    for(let button of toolbar.children){
        if(button.nodeName==="BUTTON") {
            button.onclick = function (event) {
                event.preventDefault();
                tools[this.id].call(this);
            }
        }
    }

    function setImageData(data, rows, cols) {
        const Image = Array.from({ length: rows*cols*4 });
        for(let i = 0;i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                for (let k = 0; k < 4; k++) {
                    Image[( i*cols + j ) * 4 + k ] = data[i][j][k];
                }
            }
        }
        const idata = context.createImageData(cols, rows);
        idata.data.set(Image);
        editor.width = cols;
        editor.height = rows;
        context.putImageData(idata, 0, 0);
    }

    function getRGBArray(rows, cols) {
        let data = context.getImageData(0, 0, cols, rows).data;
        const RGBImage = [];
        for(let i=0;i<rows;i++){
            let row = [];
            for(let j=0;j<cols;j++){
                let pixel = [];
                for(let k=0;k<4;k++){
                    pixel.push( data[ ( i*cols + j ) * 4 + k ] );
                }
                row.push(pixel);
            }
            RGBImage.push(row);
        }
        return RGBImage;
    }

    // $('#shareFB').click(function () {
    //     var data = $('#editor')[0].toDataURL("image/png");
    //     try {
    //         blob = dataURItoBlob(data);
    //     } catch (e) {
    //         console.log(e);
    //     }
    //     FB.getLoginStatus(function (response) {
    //         console.log(response);
    //         if (response.status === "connected") {
    //             postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, "http://bit.ly/1QK0Qbsz");
    //         } else if (response.status === "not_authorized") {
    //             FB.login(function (response) {
    //                 postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, "http://bit.ly/1QK0Qbsz");
    //             }, {scope: "publish_actions"});
    //         } else {
    //             FB.login(function (response) {
    //                 postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, "http://bit.ly/1QK0Qbsz");
    //             }, {scope: "publish_actions"});
    //         }
    //     });
    // });

    // function postImageToFacebook(token, filename, mimeType, imageData, message) {
    //     var fd = new FormData();
    //     fd.append("access_token", token);
    //     fd.append("source", imageData);
    //     fd.append("no_story", true);
    //     // Upload image to facebook without story(post to feed)
    //     $.ajax({
    //         url: "https://graph.facebook.com/me/photos?access_token=" + token,
    //         type: "POST",
    //         data: fd,
    //         processData: false,
    //         contentType: false,
    //         cache: false,
    //         success: function (data) {
    //             console.log("success: ", data);
    //             // Get image source url
    //             FB.api(
    //                 "/" + data.id + "?fields=images",
    //                 function (response) {
    //                     if (response && !response.error) {
    //                         //console.log(response.images[0].source);
    //                         // Create facebook post using image
    //                         FB.api( "/me/feed", "POST",
    //                             {
    //                                 "message": "",
    //                                 "picture": response.images[0].source, // 90-Day Deprecation - https://developers.facebook.com/docs/apps/changelog
    //                                 // "object_attachment": response.images[0].source, // 90-Day Deprecation - https://developers.facebook.com/docs/apps/changelog
    //                                 "link": window.location.href,
    //                                 "name": 'Look at the cute panda!',
    //                                 "description": message,
    //                                 "privacy": {
    //                                     value: 'SELF'
    //                                 }
    //                             },
    //                             function (response) {
    //                                 if (response && !response.error) {
    //                                     /* handle the result */
    //                                     alert("Posted story to facebook successfully");
    //                                     console.log("Posted story to facebook");
    //                                     console.log(response);
    //                                 } else {
    //                                     console.log("Failed to post story");
    //                                     console.log(response);
    //                                 }
    //                             }
    //                         );
    //                     }
    //                 }
    //             );
    //         },
    //         error: function (shr, status, data) {
    //             console.log("error " + data + " Status " + shr.status);
    //         },
    //         complete: function (data) {
    //             //console.log('Post to facebook Complete');
    //         }
    //     });
    // }


    // function dataURItoBlob(dataURI) {
    //     var byteString = atob(dataURI.split(',')[1]);
    //     var ab = new ArrayBuffer(byteString.length);
    //     var ia = new Uint8Array(ab);
    //     for (var i = 0; i < byteString.length; i++) {
    //         ia[i] = byteString.charCodeAt(i);
    //     }
    //     return new Blob([ab], {type: 'image/png'});
    // }
};