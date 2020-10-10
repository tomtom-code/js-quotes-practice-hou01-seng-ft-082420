const url = 'http://localhost:3000/quotes?_embed=likes'

document.addEventListener("DOMContentLoaded", () =>{

    const quoteList = document.querySelector('#quote-list')
    const addQuoteForm = document.querySelector('#new-quote-form')

    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(quotes){
       //console.log(quotes)
       quotes.forEach(function(quote){
           renderQuotes(quote)
       })
    })

    
    function renderQuotes(quote){
        
        const quoteCard = document.createElement('li')
        quoteCard.className = 'quote-card'

        const quoteBlock = document.createElement('blockquote')
        quoteBlock.className = 'blockquote'

        const wordsP = document.createElement('p')
        wordsP.className = 'mb-0'
        wordsP.innerText = quote.quote
        

        const quoteFooter = document.createElement('footer')
        quoteFooter.className = 'blockquoter-footer'
        quoteFooter.innerText = quote.author
        

        const br = document.createElement('br')


        const likeBtn = document.createElement('button')
        likeBtn.className = 'btn-success'
        likeBtn.innerText = 'Likes:'

        const span = document.createElement('span')
        span.innerText = quote.likes.length


        const deleBtn = document.createElement('button')
        deleBtn.className = 'btn-danger'
        deleBtn.innerText = 'Delete'

        quoteCard.append(quoteBlock, wordsP, quoteFooter, br, likeBtn, span, deleBtn)
        quoteList.append(quoteCard)
        console.log(quoteList)




    }

    addQuoteForm.addEventListener('submit', function(e){
        e.preventDefault()

        //date we make ourselve 
        let quote = {}
        quote.text = e.target.quote.value
        quote.author = e.target.author.value 
        //console.log


    })

    function postQuote(quote){
        let quoteOption = {
            method: "POST",
            headers: 
            {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
                "quote": quote.text,
                "author": quote.author,
                "likes": 0
              })
            }


        }
        fetch(url, quoteOption)
        .then(renderQuots(quote))

    }

    




})