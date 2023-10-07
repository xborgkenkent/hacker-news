"use strict";

let newsList = []
let page = 1

const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
//const comment = document.querySelector("#comments-size")

async function fetchapi() {
    const url = `https://node-hnapi.herokuapp.com/newest?page=${page}`
    const response = await fetch(url)
    const news = await response.json()

    newsList = []
    newsList.push(...news)
    displayNews()
}

function displayNews() {
    const section = document.querySelector(".news-items")
    section.innerHTML = ""
    console.log(newsList.length)
    for(let i = 0 ; i < newsList.length ; i++) {
        const news = newsList[i]
        const article = document.createElement("article")
        article.setAttribute("id", news.id)

        const publishedBy = document.createElement("p")
        publishedBy.setAttribute("id", "published-by")
        publishedBy.textContent = `Published by ${news.user} ${news.time_ago}`

        const storyTitle = document.createElement("h2")
        storyTitle.setAttribute("id", "story-title")
        storyTitle.textContent = `${news.title}`

        const link = document.createElement("a")
        link.setAttribute("href", "comments.html")
        link.setAttribute("id", "comments-size")
        link.addEventListener("click", () => {
            localStorage.setItem("id", news.id)
        })

        const commentSize = document.createElement("p")
        commentSize.innerHTML = `Comments: ${news.comments_count}`

        article.appendChild(publishedBy)
        article.appendChild(storyTitle)
        article.appendChild(link)
        link.appendChild(commentSize)
        section.appendChild(article)
    }
}

function previousPage() {
    page--;
    fetchapi()
}

function nextPage() {
    page++;
    fetchapi()
}

// function comments() {
//     console.log(this)
// }

// comment.addEventListener("click", comments)
prev.addEventListener("click", previousPage)
next.addEventListener("click", nextPage)


fetchapi()