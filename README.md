# foodnotfood
machine learning application to detect food or not food

# Notes 
1. start virtual environment with conda activate /Users/ericsun/Desktop/foodnotfood/env

# Steps:
1. collect data - images of food and not food
    a. for images of not food: download from ImageNet
    b. for images of food: download from Food101
2. 

# Log:
1. Trying to get nonfood images: downloaded imagenet class list from Github (https://gist.github.com/yrevar/942d3a0ac09ec9e5eb3a)
2. Downloaded and installed NLTK (to get list of words associated with food): https://www.nltk.org/install.html
3. Got a list of foods -> filter the imagenet dataset classes and remove any food-related class
4. Filtered imagenet dataset to have no food item classes
5. Now, figure out how to download non-food and food images from ImageNet (random samples)
    - also create a food image dataset from Food101 (random samples of images from differen classes)
6. Turns out downloading images from ImageNet requires class keys, so we need to map class keys to classes we want.             -https://github.com/mf1024/ImageNet-Datasets-Downloader
7. Look at csv file of ImageNet classes (https://raw.githubusercontent.com/mf1024/ImageNet-Datasets-Downloader/master/classes_in_imagenet.csv)
8. Got a non_food df by filtering out food items from the list of classes
9. Got a food df by filtering using flat_food_list from previous from list of classes
    - made it even better by manualling sorting out non_foods from food df
10. Now have ImageNet Keys with the class_names in a dictionary
11. downloaded test images 
    - turns out the previous github didn't work for me (got a freeze()/fork() error)
    - used this github repo instead (https://github.com/skaldek/ImageNet-Datasets-Downloader)
    - had to download images twice (first time, just downloaded empty folders for some reason)
12. turned dict of non_food_class_ids to giant strings to pass into command line using $
    - turns out the string was too big (can't pass it all into command line easily)
13. started downloading 50 random images of 1000 classes from imagenet random classes
14. resorted to filtering the non_food images from backend
15. now moving the images from /data/downlaoded_images folder to /data/model_test_images/split/(*test/train) using python/os pathing
16. Got test and train data ready for 2 classes in folders
17. Going to do a small-scale Binary Classification model to test dataset
17. preprocessing.image_dataset_from_directory -> got train and test data
18. Using tf.keras for pretrained-imagenet model
19. using weights and biases to help visualize extra stuff + plot model
20. failed to figure out wandb - will learn in future (https://colab.research.google.com/drive/10tdFd6iOF64O5d4IwLehVvMWz1TIowQD)
21. anyways after 25 epochs, the pretrained-model has 100% accuracy on test images
22. will now move on to making a larger model
23. Using tf.keras.applications.EfficientNetV2B0 for big model 
    - note V2 is reuqired for newer versions of python/tensorflow to save model for later (https://github.com/keras-team/keras/issues/17199)
24. Steps for tf model:
    -Input(shape)
    -layers.globalaveragepool2d
    -layers.dense(sigmoid)
    -model(input_layer, output_layer)
    -compile(optimizer.Adam, losses.BinaryCrossEntropy, metrics="accuracy")
    -callbacks.early_stopping(patience=5, monitor=val_loss)
    -model.fit(train_data, epochs, validation_data, callbacks, class_weight=class_weight) 
        -class weight info (https://www.tensorflow.org/tutorials/structured_data/imbalanced_data)
25. train for a long time with my sad mac cpu 
    -evaluate when done to get accuracy (aiming for ~90%)
26. model.save (https://www.tensorflow.org/tutorials/keras/save_and_load)
27. convert to tflite model (https://www.tensorflow.org/lite/models/convert)
28. wget https://storage.googleapis.com/food-vision-model-playground/food_not_food_model_v3.tflite
