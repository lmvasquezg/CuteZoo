import { Component, OnInit } from '@angular/core';

import {
  AccessibilityConfig,
  Action,
  ButtonEvent,
  ButtonsConfig,
  ButtonsStrategy,
  ButtonType,
  Description,
  DescriptionStrategy,
  DotsConfig,
  GalleryService,
  Image,
  ImageModalEvent,
  KS_DEFAULT_BTN_CLOSE,
  KS_DEFAULT_BTN_DELETE,
  KS_DEFAULT_BTN_DOWNLOAD,
  KS_DEFAULT_BTN_EXTURL,
  KS_DEFAULT_BTN_FULL_SCREEN,
  PreviewConfig,
  LoadingConfig,
  LoadingType,
  CurrentImageConfig
} from '@ks89/angular-modal-gallery';

import{ CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  imageIndex = 1;
  galleryId = 1;
  isPlaying = true;

  images: Image[] = [
    new Image(
      1,
      { // modal
        img: '../../assets/pictures/1.jpg',
        extUrl: 'http://www.google.com',
        description: 'Max'
      }
    ),
    new Image(
      2,
      { // modal
        img: '../../assets/pictures/2.jpg',
        extUrl: 'http://www.google.com',
        description: 'Dog'
      }
    ),
    new Image(
      3,
      { // modal
        img:  '../../assets/pictures/3.jpg',
        description: 'Fox'
      }
    ),
    new Image(
      4,
      { // modal
        img: ' ../../assets/pictures/4.jpg',
        description: 'Bambi'
      }
    ),
    new Image(
      5,
      { // modal
        img: '../../assets/pictures/5.jpg',
        description: 'Elephant'
      }
    )
  ];

  customButtonsConfigExtUrlNewTab: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.CUSTOM,
    buttons: [
      {
        className: 'ext-url-image',
        type: ButtonType.EXTURL,
        extUrlInNewTab: true // <--- this is the important thing to understand this example
      },
      {
        className: 'close-image',
        type: ButtonType.CLOSE
      }
    ]
  };

  constructor() {
    
   }

  ngOnInit() {
  }

}
