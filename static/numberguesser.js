document.getElementById('imgUploader').addEventListener('change', function() {
    const file = this.files[0];
    const preview = document.getElementById('preview');
    const uploadLabel = document.querySelector('.upload-label');

    const img = new Image();
    img.onload = function() {
        if (this.width !== 28 || this.height !== 28) {
            setTimeout(function() {
                alert('Image resolution must be exactly 28x28 pixels.');
            }, 100);
        } else {
            preview.src = URL.createObjectURL(file);
            preview.style.display = 'block';
            uploadLabel.style.display = 'none';

            processNumber(file);
        }
    };
    img.src = URL.createObjectURL(file);

    const reader = new FileReader();
    reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
    }
    reader.readAsDataURL(file);

    // Show elements with animations
    document.getElementById('heading').style.display = 'block';
    document.getElementById('heading1').style.display = 'block';
    document.getElementById('heading1').style.animation = 'fadeIn 2s';
    document.getElementById('numberOutput').style.display = 'block';
    document.getElementById('numberOutput').style.animation = 'fadeIn 0.5s';
});

async function processNumber(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/process_image', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('numberOutput').value = data.result;

    } catch (error) {
        console.error('Error processing image:', error);
        document.getElementById('numberOutput').value = 'Error processing image';
    }
}
