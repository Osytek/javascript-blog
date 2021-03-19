/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable indent */
const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }
  
    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    console.log('clickedElement:', clickedElement);
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");
    console.log(articleSelector); 

  
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');


}


const optArticleSelector = '.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles';
optArticleTagsSelector = '.post-tags .list'


function generateTitleLinks(){
    
/* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    

/* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
        
    
    /* get the article id */
    const articleId = article.getAttribute("id");
    
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
    
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend',linkHTML);
    }

    const links = document.querySelectorAll('.titles a');
        console.log(links);

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }

}
generateTitleLinks(); 

function generateTags(){
    /* find all articles */
    let articles = document.querySelectorAll('.post');
    /* START LOOP: for every article: */
    for(let article of articles){
      
      /* find tags wrapper */
        let tagWrapper = article.querySelector('.post-tags .list');
  
      /* make html variable with empty string */
        let html = ' ';
      /* get tags from data-tags attribute */
        let articleTags = article.getAttribute("data-tags");
      console.log(articleTags); 
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray)
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
          console.log(tag)
        /* generate HTML of the link */
        let tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + html;
        console.log(tagHTML)
        /* add generated code to html variable */
        tagWrapper.insertAdjacentHTML('beforeend',tagHTML);

      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
  
    /* END LOOP: for every article: */
    }
  }
  generateTags();
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Link was clicked')
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href)
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){
      /* remove class active */
      activeTagLink.classList.remove('.active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    console.log(tagLinksHref)
    /* START LOOP: for each found tag link */
    for(let tagLinkHref of tagLinkHrefs){
      /* add class active */
        tagLinkHref.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  
  function addClickListenersToTags(){
    /* find all links to tags */
    const allLinksTags = document.querySelectorAll('.tags')
    /* START LOOP: for each link */
    for(let allLinksTag of allLinksTags){
      /* add tagClickHandler as event listener for that link */
      allLinksTag.addEventListener('click', titleClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();
