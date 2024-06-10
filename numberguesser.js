document.getElementById('imgUploader').addEventListener('change', function(e) {
    var img = document.getElementById('preview');
    img.src = URL.createObjectURL(e.target.files[0]);
    img.style.display = 'block';
});
document.getElementById('imgUploader').addEventListener('change', function(e) {
    var img = document.getElementById('preview');
    var uploadLabel = document.querySelector('.upload-label');
    img.src = URL.createObjectURL(e.target.files[0]);
    img.style.display = 'block';
    uploadLabel.style.display = 'none'; 
});
document.getElementById('imgUploader').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var img = new Image();
    var uploadLabel = document.querySelector('.upload-label');
    var preview = document.getElementById('preview');

    img.onload = function() {
        if (this.width !== 24 || this.height !== 24) {
            alert('Image resolution must be exactly 24x24 pixels.');
            preview.style.display = 'none'; 
            uploadLabel.style.display = 'block'; 
        } else {
            preview.src = URL.createObjectURL(file);
            preview.style.display = 'block';
            uploadLabel.style.display = 'none'; 
        }
    };

    img.src = URL.createObjectURL(file);
});

document.getElementById('imgUploader').addEventListener('change', function() {
    // Show the image holder
    document.getElementById('preview').style.display = 'block';

    // Show the heading
    document.getElementById('heading').style.display = 'block';

    // Show the heading1 and numberOutput with fadeIn animation
    document.getElementById('heading1').style.display = 'block';
    document.getElementById('heading1').style.animation = 'fadeIn 2s';
    document.getElementById('numberOutput').style.display = 'block';
    document.getElementById('numberOutput').style.animation = 'fadeIn 2s';

    // Read the uploaded image file
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('preview').src = e.target.result;
    }
    reader.readAsDataURL(this.files[0]);
});



//KOD ZA UPLOAD ZA PYTHON NEZ JEL CE BIT POTREBAN



// document.getElementById('imgUploader').addEventListener('change', function(e) {
//     var file = e.target.files[0];
//     var formData = new FormData();
//     formData.append('image', file);

//     fetch('/upload-image', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById('numberOutput').value = data.result;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });