import styled from 'styled-components'

export const Container = styled.div`
  padding-bottom: 80px;
  font-size: 20px;
  font-family: ff-good-headline-web-pro-nar,Arial,sans-serif;
  font-weight: 500;

  .h1,.page-banner__title,.page__content h1,.h2,.page__content h2,.h4,.page__content h4{
      font-family:ff-good-headline-web-pro-ext,Arial,sans-serif;
      font-weight:800
  }
  .h1,.page-banner__title,.page__content h1{
      line-height:1.0434782609;
      text-transform:uppercase;
      font-size: 46px;
  }
  @media (max-width: 980px){
      .h1,.page-banner__title,.page__content h1{
          font-size:2.4rem
      }
  }
  .page-banner{
      position:relative;
      z-index:2
  }
  @media (min-width: 1381px){
      .page-banner{
          display:flex
      }
  }
  @media (min-width: 1381px){
      .page-banner__image{
          width:44.44444444%
      }
  }
  .page-banner__image-wrap{
      position:relative;
      aspect-ratio:800/400;
      width:100%;
      height:calc(100% + 40px);
      vertical-align:middle;
      overflow:hidden
  }
  .page-banner__image-wrap::before{
      display:block;
      content:'';
      width:100%;
      padding-top:50%
  }
  @media (min-width: 661px) and (max-width: 1380px){
      .page-banner__image-wrap{
          position:relative;
          aspect-ratio:800/300
      }
      .page-banner__image-wrap::before{
          display:block;
          content:'';
          width:100%;
          padding-top:37.5%
      }
  }
  @media (max-width: 1380px){
      .page-banner__image-wrap{
          height:auto
      }
  }
  .page-banner__image-asset{
      position:absolute;
      top:0;
      right:0;
      width:100%;
      height:100%;
      background:transparent no-repeat center / cover;
      transform:translateY(-100%)
  }
  .viewed .page-banner__image-asset{
      transform:none;
      transition:transform .3s;
      transition-delay:.3s
  }
  .page-banner__wrap{
      display:flex;
      flex-direction:column;
      flex-grow:1;
      overflow:hidden
  }
  .page-banner__container{
      display:flex;
      background-color:rgba(84,88,89,0.6);
      align-items:center;
      flex-direction:column;
      flex-grow:1;
      justify-content:center
  }
  .page-banner__content{
      position:relative;
      transform:translateX(200%)
  }
  @media (min-width: 1381px){
      .has-image .page-banner__content{
          max-width:calc(100% - 100px);
          width:760px;
          padding:50px 0
      }
  }
  @media (max-width: 1380px){
      .has-image .page-banner__content{
          margin-left:auto;
          margin-right:auto;
          width:calc(100% - 100px);
          max-width:1300px;
          padding:80px 0
      }
  }
  @media (max-width: 1380px) and (max-width: 360px){
      .has-image .page-banner__content{
          width:calc(100% - 60px)
      }
  }
  @media (max-width: 1380px) and (max-width: 808px){
      .has-image .page-banner__content{
          padding:50px 0
      }
  }
  .no-image .page-banner__content{
      margin-left:auto;
      margin-right:auto;
      width:calc(100% - 100px);
      max-width:1500px;
      padding:80px 0
  }
  @media (max-width: 360px){
      .no-image .page-banner__content{
          width:calc(100% - 60px)
      }
  }
  @media (max-width: 808px){
      .no-image .page-banner__content{
          padding:50px 0
      }
  }
  .page-banner__content.viewed{
      transform:none;
      transition:transform .3s;
  }
  .page-banner__text{
    margin-top:20px;
  }
`
