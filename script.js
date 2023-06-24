const classes = {
    0: "food",
    1: "not_food"
  }

  const status = document.getElementById("status")
  
  if(status) {
    status.innerText = "Loaded TensorFlow.js - version:" + tf.version.tfjs
  }
  
  let model
  
  const loadModel = async () => {
    try {
      const tfliteModel = await tflite.loadTFLiteModel(
        "/food_not_food_model_v4.tflite"
      )
      model = tfliteModel
  
      if(tfliteModel) {
        model_status.innerText = "Model loaded"
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  
  loadModel()
  
  function classifyImage(model, image) {
    image = tf.image.resizeBilinear(image, [224, 224])
    image = tf.expandDims(image)
  
    image = tf.cast(image, "int32")
  
    const output = model.predict(image)

    const output_values = tf.sigmoid(output.arraySync()[0])

    const predicted_class = document.getElementById("predicted_class")
    const predicted_prob = document.getElementById("predicted_probability")

    predicted_class.textContent = classes[output_values.argMax().arraySync()]
    predicted_prob.textContent = Math.round(Math.max(...output.arraySync()[0]) / 256 * 100) + "%"
  
  }
  
  const fileInput = document.getElementById("file-input")
  const image = document.getElementById("image")
  
  function getImage() {
    if (!fileInput.files[0]) throw new Error("Image not found");
    const file = fileInput.files[0];
  
    // Get the data url from the image
    const reader = new FileReader();
  
    // When reader is ready display image
    reader.onload = function (event) {
      // Get data URL
      const dataUrl = event.target.result;
  
      // Create image object
      const imageElement = new Image();
      imageElement.src = dataUrl;
  
      // When image object loaded
      imageElement.onload = function () {
        // Display image
        image.setAttribute("src", this.src);
  
        // Log image parameters
        const currImage = tf.browser.fromPixels(imageElement);
  
        // Classify image
        classifyImage(model, currImage);
      };
  
      document.body.classList.add("image-loaded");
    };
  
    // Get data url
    reader.readAsDataURL(file);
  }
  
  // Add listener to see if someone uploads an image
  fileInput.addEventListener("change", getImage);