# Vanilla javaScript Photo Gallery

This project is a companion tutorial to the Black Label Web Design blog post ["Build It Yourself."](http://www.blacklabelwebdesign.com/blog/posts/build-it-yourself) The purpose of the post is to walk readers through developing their problem solving skills while creating new features instead of jumping straight for the plugins. The post uses an image gallery as an example, this is a provided code example.

[View The Demo Here](https://blwd.github.io/jsPhotoGal/)

- [Overview](#overview)
- [Functionality](#functionality)
- [Code Walk Through](#code-walk-through)
- [Usage](#usage)

## Overview
The following code is an open source, free to use without attribution example of a vanilla javaScript photo gallery class. The class can easily be included into web projects with the minified project file, photogal.min.js.

The example includes a basic HTML file, CSS File, and the minified and unminified JS files. The HTML could be modified to show/hide entire `<div>` elements if needed, for example, to show and hide images with captions.

## Functionality
The photo gallery offers the following basic functionality:

- Auto play on load
- Next button event
- Previous button event
- Auto play is cancelled upon user interaction with Next/Previous button

The functionality could be easily expanded with the addition of functions to the Gallery class. A pause/start function could be added.

## Code Walk Through

In this section we will briefly explain the photo gallery class.

### The Constructor function

    constructor()
    {
        // set current index
        this.currentImage = 0;
        // find all the gallery images
        this.imageSet = document.getElementsByClassName('gallery-image');
        // get a count of all the gallery images
        this.totalSet = this.imageSet.length;
        // get next/previous buttons
        this.left = document.getElementById('previous');
        this.right = document.getElementById('next');
        // set up the auto play, this is in a variable so we can clear it later
        this.gallery = setInterval(()=>{
            // if the current image is the last image in the set
            if(this.currentImage === this.totalSet - 1){
                // set index to 0 and change the image
                let n = 0;
                this.change(n);
            }
            // if the image is greater or equal to 0 and less than the total image count
            else if (this.currentImage >= 0 && this.currentImage < this.totalSet - 1) {
                // index is current + 1
                let n = this.currentImage + 1;
                // change the image
                this.change(n);
            }
        }, 7000);
    }

The constructor function sets the variables we need to run the photo gallery, locates the next and previous arrows, and sets the auto play interval to a function. Setting the interval function to a variable will allow us to easily clear the interval later on.

### Remove and Add the Active Image Class

In order for the gallery to work a class of "active-image" is added to the element you want to be displayed. In our example this is a simple `<img/>` element. If you were building a web site you would want this gallery to be a list item in an unordered list. Alternatively, you could use this class on an entire `<div>` element to hide and show a image with a caption, featured articles, etc.

    removeClass()
    {
        // find the image with the active class
        this.current = document.getElementsByClassName('active-image')[0];
        // remove the active class
        this.current.classList.remove('active-image');
    }
    // adds active image class and updates currentImage
    addClass(n)
    {
        // find the next image in the gallery and add active class
        this.imageSet[n].classList.add('active-image');
        //update index
        this.currentImage = n;
    }
    // calls add and remove functions
    change(n)
    {
        // remove and add class calls
        this.removeClass();
        this.addClass(n);
    }

The change function is called when the active-image class is removed and added to an element.

### Next and Previous Functionality

The gallery supports the use of next and previous arrows for a user to interact with the gallery on their own.

    forward()
    {
        // clear the auto play
        clearInterval(this.gallery);
        // if this is the last image
        if(this.currentImage === this.totalSet - 1){
            let n = 0;
            this.change(n);
        }
        // if the image is greater than or equal to 0 but less than total image count
        else if (this.currentImage >= 0 && this.currentImage < this.totalSet - 1) {
            let n = this.currentImage + 1;
            this.change(n);
        }
    }

The forward function changes to the next image. It checks if this is the last image in the list and changes the index to 0 if it is. If not the index is changed to the current index plus 1.

    backward()
    {
        // clear the auto play
        clearInterval(this.gallery);
        // if this is the first image
        if(this.currentImage === 0){
            // set index to the last image
            let n = this.totalSet - 1;
            // change the image
            this.change(n);
        }
        // if the image is greater than 0
        else if (this.currentImage > 0) {
            // set the index to current - 1
            let n = this.currentImage - 1;
            // change the image
            this.change(n);
        }
    }

The backward function changes to the previous image. It checks if the image is the first image and, if it is, changes the index to the last image. If the image is not the first image it sets the index to the current image minus 1.

    launch()
    {
        // add the event listener for the previous arrow
        this.left.addEventListener('click', ()=>{
            this.backward();
        });
        // add the event listener for the next arrow
        this.right.addEventListener('click', ()=>{
            this.forward();
        });
    }

Lastly, the launch feature adds the event listeners for the next and previous arrows.

### Launching the Gallery

To launch the gallery you need to instantiate the Gallery class and call the launch function.

    //instantiate
    let gallery = new Gallery();
    // launch gallery
    gallery.launch();

## Usage

To use this gallery you will need to have a group of elements that you wish to cycle through with the class of "gallery-image"

    <div class="photo-gallery">
        <img src="images/1.jpg" alt="image" class="gallery-image active-image"/>
        <img src="images/2.jpeg" alt="image" class="gallery-image"/>
        <img src="images/3.jpeg" alt="image" class="gallery-image"/>
        <img src="images/4.jpg" alt="image" class="gallery-image"/>
    </div>

You will also need the first item to have the class active-image.

Next add the controls with the ID's next and previous.

    <div class="controls">
        <span id="previous" class="control"><</span><span id="next" class="control">></span>
    </div>

Finally, include and instantiate the Gallery class.
