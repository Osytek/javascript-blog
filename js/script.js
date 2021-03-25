/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable indent */
const optArticleSelector = '.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles';
optArticleTagsSelector = '.post-tags .list'
optTagsListSelector = '.tags.list'
optCloudClassCount = 5
optCloudClassPrefix = 'tag-size-'
let count = 5

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;


    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }
  
    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');

  
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");

  
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');


}

function generateTitleLinks(customSelector = ''){

/* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";
  
/* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for(let article of articles){
  
  
    /* get the article id */
    const articleId = article.getAttribute("id");
  
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
  
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
  
    /* insert link into titleList */
    titleList.innerHTML += linkHTML;
    }
  
    const links = document.querySelectorAll('.titles a');
  
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
  
}
generateTitleLinks(); 

function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll('.post');
    /* START LOOP: for every article: */
    for(let article of articles){
      
      /* find tags wrapper */
        let tagWrapper = article.querySelector('.post-tags .list');
  
      /* make html variable with empty string */
        let html = ' ';
      /* get tags from data-tags attribute */
        let articleTags = article.getAttribute("data-tags");
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        let tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + html;
        /* add generated code to html variable */
        tagWrapper.insertAdjacentHTML('beforeend',tagHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
      }
      
      /* insert HTML of all the links into the tags wrapper */
  
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)
    
    /* [NEW] create variable for all links HTML code */
    
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li><a href="#tag-' +  tag + '" class="' +  calculateTagClass(allTags[tag], tagsParams) + '">' + tag +      '</a></li>';
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    allTagsHTML += tagLinkHTML;
  
}

function calculateTagsParams(tags) {
  const params = { max: '0', min: '999999' };
 
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    else if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    
  }
  return params;
} 
function calculateTagClass(){
  classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
  return optCloudClassPrefix + classNumber;
}
calculateTagClass(count, params); 
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
      activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    let tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    console.log(tagLinksHref)
    /* START LOOP: for each found tag link */
    for(let tagLinkHref of tagLinksHref){
      /* add class active */
        tagLinkHref.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  
  function addClickListenersToTags(){
    /* find all links to tags */
    const allLinksTags = document.querySelectorAll('.tags a, .post-tags a')
    /* START LOOP: for each link */
    for(let allLinksTag of allLinksTags){
      /* add tagClickHandler as event listener for that link */
      allLinksTag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();

  function generateAuthors(){
    /* find all articles */
    const articles = document.querySelectorAll('.post');
    /* START LOOP: for every article: */
    for(let article of articles){
      
      /* find tags wrapper */
        let AuthorWrapper = article.querySelector('.post-author');
  
      /* make html variable with empty string */
        let html = ' ';
      /* get tags from data-tags attribute */
        let articleTags = article.getAttribute("data-author");
      
        /* generate HTML of the link */
        let authorHTML = '<li><a href="#author-' + articleTags + '">' + articleTags + '</a></li>' + html;
        /* add generated code to html variable */
        AuthorWrapper.insertAdjacentHTML('beforeend',authorHTML);

      
      
      /* insert HTML of all the links into the tags wrapper */
  
    /* END LOOP: for every article: */
    }
  }
  generateAuthors();

  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Link was clicked')
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href)
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#author-', '');
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){
      /* remove class active */
      activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    let tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    console.log(tagLinksHref)
    /* START LOOP: for each found tag link */
    for(let tagLinkHref of tagLinksHref){
      /* add class active */
        tagLinkHref.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + tag + '"]');
  }
  function addClickListenersToAuthors(){
    /* find all links to tags */
    const allLinksTags = document.querySelectorAll('.authors a, .post-author a')
    /* START LOOP: for each link */
    for(let allLinksTag of allLinksTags){
      /* add tagClickHandler as event listener for that link */
      allLinksTag.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthors();