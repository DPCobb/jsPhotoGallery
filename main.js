/*
Black Label Web Design
javaScript Photo Gallery Tutorial
10/2017
 */

class Gallery
{
    /**
     * Set up variables and interval to auto change image
     */
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
    // removes active image class
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
    //right arrow function
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
    //left arrow function
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
    // set event listeners
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
}
//instantiate
let gallery = new Gallery();
// launch gallery
gallery.launch();
