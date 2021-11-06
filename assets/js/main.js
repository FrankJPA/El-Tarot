document.addEventListener('DOMContentLoaded', dispatchContent);

const 
   w = window,
   d = document;

function dispatchContent(){
   toggleNavbar('.header.animated');
   toggleNavbar('.header.sticky-1');
   toggleNavbar('.header.sticky-2');
   toggleNavbar('.header.sticky-3');
   //headerFixedInScroll();
   slideShow();
   goTo();
   openURLInPopupShare('.facebook-button-share', 'fb');
   openURLInPopupShare('.twitter-button-share', 'tw');
}

function toggleNavbar(elemClass){

   if( !d.querySelector(elemClass) ){
      return;
   }

   let 
      buttonToggleNavbar = document.querySelector(elemClass + ' .button-toggle-navbar'),
      sectionNavbar = document.querySelector(elemClass + ' .section-navbar'),
      wrapperNav = document.querySelector(elemClass + ' .wrapper-navbar'),
      wrapperSearch = document.querySelector(elemClass + ' .wrapper-search'),
      wrapperSearchClone = wrapperSearch.cloneNode(true),
      _click = true;

   buttonToggleNavbar.addEventListener('click', function(){
      if(_click){
         // alert('Open');
         // console.log('Open');
         wrapperNav.appendChild(wrapperSearchClone);
         sectionNavbar.classList.add('convert', 'fadeInDown');
         _click = false;
      }else{
         // alert('close');
         // console.log('Close');
         sectionNavbar.classList.remove('convert', 'fadeInDown');
         _click = true;
      }
   })
}

function headerFixedInScroll(){
   // console.log('hola')
   let
      scrollPositionY = 0,
      ticking;

   w.addEventListener('scroll', function(e){
      // console.log(this.outerHeight);
      scrollPositionY = this.scrollY;

      if(ticking){
         this.clearTimeout(ticking);
      }

      ticking = this.setTimeout(function(){
         injectFunction(scrollPositionY);
      }, 100);

   });

   function injectFunction(pos){
      let 
         wh = w.innerHeight,
         headerId = d.querySelector('.header');

      if(pos > wh / 1.75){
         headerId.classList.add('convert-in-scroll', 'backInDown');
      }else{
         headerId.classList.remove('convert-in-scroll', 'backInDown');
      }
   }
}

function slideShow(){
   let 
      nameSlider = d.getElementById('slider-1'),
      slides = nameSlider ? nameSlider.querySelectorAll('.slide') : false;

   if( !nameSlider || !slides ){
      return;
   }

   let numSlides = slides.length,
      controlador = 0,
      timeInterval = 5500;


   function removeClassSlider(){
      slides.forEach(function(item, index){
         item.classList.remove('active');
      })
   }

   if( numSlides > 1 ){
      for(let i = 0; i < numSlides; i++){
         return setInterval(function(){
            controlador++;
            if(controlador >= numSlides){
               controlador = 0;
            }
            removeClassSlider();
            slides[controlador].classList.add('active');
         }, timeInterval);
      }
   }
}

function goTo(){
   let 
      dispatch = d.querySelector('.go-down'),
      destiny = d.getElementById('section-article');
   
   if( !dispatch || !destiny ){
      return;
   }

   let destinyPosY = destiny.getBoundingClientRect().top + document.documentElement.scrollTop,
      currentScroll = d.documentElement.scrollTop || document.body.scrollTop;
      //console.log(destinyPosY, currentScroll, d.body.offsetHeight, w.scrollY);
      // console.log(w.scrollY)
   
   dispatch.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();

      w.scrollTo({
         top: destinyPosY - 110,
         left: 0,
         behavior: 'smooth'
      });
   });
}

function openURLInPopupShare(elemTrigger, name) {

   if(!elemTrigger){
      return;
   }

   let
      currentUrl = w.location.href, 
      trigger = d.querySelector(elemTrigger),
      rdName = name == 'fb' ? 'https://www.facebook.com/sharer/sharer.php?u=' : 'https://twitter.com/home?status=',
      floatShare = d.querySelector('.float-share'),
      modalWidth = 500,
      modalHeight = 500,
      currentPosScrollY = 0,
      ticking;

      if(!floatShare){
         return;
      }

      w.addEventListener('scroll', function(){
         currentPosScrollY = this.scrollY;
         // console.log(currentPosScrollY, w.innerHeight)

         if(ticking){
            this.clearTimeout(ticking);
         }
   
         ticking = this.setTimeout(function(){
            if( currentPosScrollY >=  w.innerHeight){
               floatShare.classList.add('active');
            }else{
               floatShare.classList.remove('active');
            }
         }, 100);

      });

      trigger.addEventListener('click', function(e){
         e.preventDefault();
         e.stopPropagation();

         w.open(rdName+currentUrl, modalWidth, modalHeight, 'menubar=0,location=0,toolbar=0,status=0,scrollbars=1');
      });
}