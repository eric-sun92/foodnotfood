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
12. turned dict of non_food_class_ids to giant strings to pass into command line using $
    - turns out the string was too big (can't pass it all into command line easily)
13. started downloading 50 random images of 1000 classes from imagenet random classes
14. resorted to filtering the non_food images from backend