import Parser from "rss-parser"
import fs from "fs"

const parser = new Parser()

const feeds = [
 "https://news.google.com/rss/search?q=파르나스호텔&hl=ko&gl=KR&ceid=KR:ko",
 "https://news.google.com/rss/search?q=신라호텔&hl=ko&gl=KR&ceid=KR:ko",
 "https://news.google.com/rss/search?q=롯데호텔&hl=ko&gl=KR&ceid=KR:ko"
]

async function run(){

 let news=[]

 for(const url of feeds){

   const feed = await parser.parseURL(url)

   feed.items.slice(0,5).forEach(item=>{
     news.push({
       title:item.title,
       url:item.link,
       date:item.pubDate
     })
   })

 }

fs.writeFileSync(
 "news_raw.json",
 JSON.stringify({news},null,2)
)
}


run()
